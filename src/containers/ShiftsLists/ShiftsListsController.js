import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BackHandler} from 'react-native';
import ShiftsListsView from './ShiftsListsView';
import {Images} from '../../theme';
import {SHIFT, strings} from '../../constants';
import {
  getShifts,
  getShiftsByRoleId,
  getOnGoingShift,
} from '../../services/generalHelper';
import _, {isEqual} from 'lodash';
import {
  getShiftsByStatus,
  shouldCallOnEnterSuccess,
  emptyShiftsArray,
} from '../../actions/ShiftsActions';
import {Actions} from 'react-native-router-flux';
import {setSelectedTab} from '../../actions/GeneralActions';

import {shiftListTabs} from '../../components/Tabbar';

class ShiftsListsController extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    ShiftsListsController.instance = this;

    this.state = {
      activeTabKey: props.tabs.activeTabKey,
      selectedRoleId: null,
      loading: true,
      shiftItems: [],
      shouldCallApiOnEnter: true,
      clickedTabsKeys: [],
    };
  }

  static propTypes = {
    shiftItems: PropTypes.array,
    roles: PropTypes.array,
    tabs: PropTypes.object.isRequired,
    isComingFromSearchTab: PropTypes.bool,
  };

  static defaultProps = {
    roles: [],
    shiftItems: [],
    tabs: {
      activeTabKey: SHIFT.status.OFFERED,
      tabs: [
        {
          id: 0,
          title: strings.Offers,
          key: SHIFT.status.OFFERED,
        },
        {
          id: 1,
          title: strings.Browse,
          key: SHIFT.status.BROWSE,
        },
        {
          id: 2,
          title: strings.Applied,
          key: SHIFT.status.APPLIED,
        },
      ],
    },
    isComingFromSearchTab: true,
  };

  static onEnter() {
    if (ShiftsListsController.instance) {
      ShiftsListsController.instance._onEnter();
    }
  }

  _onEnter() {
    if (this.props.shouldCallOnEnter) {
      this.handleInitialRequest(this.props.tabs.activeTabKey);
      this.props.shouldCallOnEnterSuccess();
    }
  }

  static onExit() {
    if (ShiftsListsController.instance) {
      ShiftsListsController.instance._onExit();
    }
  }

  _onExit() {}

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.setSelectedTab(2);
    // return true;
  }

  componentDidMount() {
    this.handleInitialRequest(this.state.activeTabKey);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.tabs, this.props.tabs)) {
      this.handleTabNavigation();
    }

    if (prevState.activeTabKey !== this.state.activeTabKey) {
      let selectedTabShifts = getShifts(this.props.shifts, {
        status: this.state.activeTabKey,
      });
      if (_.isEmpty(selectedTabShifts)) {
        this.handleInitialRequest(this.state.activeTabKey);
      }
      this.setState({
        shiftItems:
          isEqual(this.state.activeTabKey, SHIFT.status.BROWSE) &&
          !_.isNil(this.state.selectedRoleId)
            ? getShiftsByRoleId(selectedTabShifts, this.state.selectedRoleId)
            : selectedTabShifts,
      });
    }

    if (!_.isEqual(prevProps.shifts, this.props.shifts)) {
      let temp = getShifts(this.props.shifts, {
        status: this.state.activeTabKey,
      });
      this.setState({
        shiftItems:
          isEqual(this.state.activeTabKey, SHIFT.status.BROWSE) &&
          !_.isNil(this.state.selectedRoleId)
            ? getShiftsByRoleId(temp, this.state.selectedRoleId)
            : getShifts(this.props.shifts, {
                status: this.state.activeTabKey,
              }),
      });
    }

    if (
      !_.isEqual(this.props.selectedIndex, prevProps.selectedIndex) &&
      !this.props.shouldCallOnEnter &&
      _.isEqual(this.props.selectedIndex, 2)
    ) {
      switch (this.state.activeTabKey) {
        case SHIFT.status.OFFERED:
        case SHIFT.status.BROWSE:
        case SHIFT.status.APPLIED: {
          this.handleInitialRequest(this.state.activeTabKey);
          break;
        }
      }
    }
  }

  setValue = (obj) => {
    this.setState(obj);
  };

  emptyStates = {
    offered: {
      image: Images.EmptyState2,
      text: strings.YOU_DONT_HAVE_OFFER,
      button_text: strings.BROWSE_JOBS,
      button_action: () => {
        this.setValue({activeTabKey: SHIFT.status.BROWSE});
      },
    },
    applied: {
      image: Images.EmptyState3,
      text: strings.DONT_APPLIED_FOR_JOB,
      button_text: strings.BROWSE_JOBS,
      button_action: () => {
        this.setValue({activeTabKey: SHIFT.status.BROWSE});
      },
    },
    upcoming: {
      image: Images.EmptyState1,
      text: strings.YOU_DONT_HAVE_ANY_UPCOMING,
      button_text: strings.BROWSE_JOBS,
      button_action: () => {
        return this.handleNavigateBrowse();
      },
    },
    past: {
      image: Images.EmptyState1,
      text: strings.NEW_USER_MESSAGE,
      button_text: strings.BROWSE_JOBS,
      button_action: () => {
        return this.handleNavigateBrowse();
      },
    },
    browse: {
      image: Images.EmptyState3,
      text: strings.NO_SHIFT_FOUND,
    },
    default: {
      image: null,
      text: strings.NO_SHIFT_FOUND,
      button_text: '',
      button_action: () => {},
    },
  };

  handleNavigateBrowse = () => {
    let selectedTabs = shiftListTabs.search;
    selectedTabs.activeTabKey = SHIFT.status.BROWSE;
    this.setValue({activeTabKey: SHIFT.status.BROWSE, tabs: selectedTabs});
    this.props.setSelectedTab(2);
    this.handleInitialRequest(SHIFT.status.BROWSE);

    Actions.jump('my_shifts', {
      tabs: selectedTabs,
      updateAllShifts: true,
    });
  };

  handleTabNavigation = () => {
    this.setState({
      tabs: this.props.tabs,
      activeTabKey: this.props.tabs.activeTabKey,
    });
  };

  handleInitialRequest = (activeTabKey) => {
    this.setState({
      loading: true,
    });

    const payload = {
      status: [activeTabKey],
    };

    if (activeTabKey === SHIFT.status.BROWSE) {
      payload['status'].push(SHIFT.status.ONGOING);
    }

    if (activeTabKey === SHIFT.status.PAST) {
      payload['status'].push(SHIFT.status.REVIEW_PENDING);
    }

    this.props.getShiftsByStatus(payload, (response) => {
      if (response) {
        let temp = getShifts(this.props.shifts, {
          status: activeTabKey,
        });
        let dataAsPerRole =
          _.isEqual(activeTabKey, SHIFT.status.BROWSE) &&
          !_.isNil(this.state.selectedRoleId)
            ? getShiftsByRoleId(temp, this.state.selectedRoleId)
            : temp;

        this.setState({
          loading: false,
          shouldCallApiOnEnter: false,
          tabs: this.props.tabs,
          activeTabKey: activeTabKey,
          shiftItems: dataAsPerRole,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  filterShiftsByRole = (role_id) => {
    let temp = getShifts(this.props.shifts, {status: this.state.activeTabKey});
    if (role_id === this.state.selectedRoleId) {
      this.setState({
        shiftItems: temp,
        selectedRoleId: null,
      });
    } else {
      let filteredJobs = getShiftsByRoleId(temp, role_id);
      this.setState({
        shiftItems: filteredJobs,
        selectedRoleId: role_id,
      });
    }
  };

  onRefresh = () => {
    this.props.emptyShiftsArray();
    this.handleInitialRequest(this.state.activeTabKey);
  };

  scrollToTop = () => {
    this.flatListRef.scrollToIndex({animated: true, index: 0});
  };

  getAllBrowseTabShifts = () => {
    return getShifts(this.props.shifts, {status: SHIFT.status.BROWSE});
  };

  onTabPressHandler = (key) => {
    const {clickedTabsKeys} = this.state;
    if (!_.includes(clickedTabsKeys, key)) {
      clickedTabsKeys.push(key);
      this.handleInitialRequest(key);
    }
  };

  render() {
    const {
      roles,
      tabs,
      showNavBarCenterImage,
      ongoingEvent,
      selectedIndex,
    } = this.props;

    const {
      loading,
      shiftItems,
      selectedRoleId,
      activeTabKey,
      shouldRender,
    } = this.state;
    return (
      <ShiftsListsView
        {...this.props}
        selectedRoleId={selectedRoleId}
        shiftListing={shiftItems}
        shouldRender={shouldRender}
        selectedIndex={selectedIndex}
        ongoingEvent={ongoingEvent}
        tabbar={tabs.tabs}
        activeTabKey={activeTabKey}
        roles={roles}
        loading={loading}
        showNavBarCenterImage={showNavBarCenterImage}
        setValue={this.setValue}
        filterShiftsByRole={this.filterShiftsByRole}
        onRefresh={this.onRefresh}
        allBrowseTabShifts={this.getAllBrowseTabShifts()}
        onTabPressHandler={this.onTabPressHandler}
        emptyStates={this.emptyStates}
        flatListRef={(ref) => {
          this.flatListRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({shifts, general}, ownProps) => {
  let allOnGoingShifts = _.filter(shifts.shifts, {
    status: SHIFT.status.ONGOING,
  });

  return {
    shifts: shifts.shifts,
    shouldCallOnEnter: shifts.shouldCallOnEnter,
    roles: shifts.roles,
    selectedIndex: general.selectedIndex,
    ongoingEvent: getOnGoingShift(allOnGoingShifts),
    // ongoingEvent: _.find(shifts.shifts, {status: SHIFT.status.ONGOING}),
  };
};

const actions = {
  setSelectedTab,
  getShiftsByStatus,
  shouldCallOnEnterSuccess,
  emptyShiftsArray,
};

export default connect(mapStateToProps, actions)(ShiftsListsController);
