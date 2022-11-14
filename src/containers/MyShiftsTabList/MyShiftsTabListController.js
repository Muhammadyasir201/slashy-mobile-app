import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import {setSelectedTab} from '../../actions/GeneralActions';
import MyShiftsTabListView from './MyShiftsTabListView';
import {shiftListTabs} from '../../components/Tabbar';
import {SHIFT, strings} from '../../constants';
import {Images} from '../../theme';
import {
  getShiftsByStatus,
  shouldCallOnEnterSuccess,
  emptyShiftsArray,
} from '../../actions/ShiftsActions';
import {getShifts} from '../../services/generalHelper';
import {Actions} from 'react-native-router-flux';

class MyShiftsTabListController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTabKey: SHIFT.status.UPCOMMING,
      tabs: shiftListTabs.myShifts.tabs,
      shiftsListItems: [],
      loading: true,
      clickedTabsKeys: [],
    };
    MyShiftsTabListController.instance = this;
  }

  static propTypes = {
    tabs: PropTypes.array,
    activeTabKey: PropTypes.string,
    shouldReloadTab: PropTypes.object,
  };
  static defaultProps = {
    tabs: shiftListTabs.search.tabs,
    activeTabKey: SHIFT.status.BROWSE,
    shouldReloadTab: {},
  };

  componentDidMount() {
    this.handleGetShiftsRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(this.props.tabs, prevProps.tabs) ||
      !_.isEqual(this.props.activeTabKey, prevProps.activeTabKey)
    ) {
      this.setState({
        tabs: this.props.tabs,
        activeTabKey: this.props.activeTabKey,
      });
      this.handleGetShiftsRequest();
    }
    if (!_.isEqual(this.state.activeTabKey, prevState.activeTabKey)) {
      this.handleGetShiftsRequest();
    }
    if (!_.isEqual(this.props.shouldReloadTab, prevProps.shouldReloadTab)) {
      this.setState(
        {
          tabs: this.props.tabs,
          activeTabKey: this.props.activeTabKey,
        },
        () => {
          this.handleGetShiftsRequest(true);
        },
      );
    }
  }

  static onEnter() {
    if (MyShiftsTabListController.instance) {
      MyShiftsTabListController.instance._onEnter();
    }
  }

  _onEnter() {
    this.props.setSelectedTab(0);

    if (
      this.props.shouldCallOnEnter &&
      this.props.activeTabKey == SHIFT.status.PAST
    ) {
      this.handleGetShiftsRequest(true);
      this.props.shouldCallOnEnterSuccess();
    }
    if (_.isEqual(this.state.activeTabKey, SHIFT.status.UPCOMMING)) {
      this.handleGetShiftsRequest(true);
    }
  }

  static onExit() {
    if (MyShiftsTabListController.instance) {
      MyShiftsTabListController.instance._onExit();
    }
  }

  _onExit() {}

  setValue = (obj) => {
    this.setState(obj);
  };

  onRefresh = () => {
    this.props.emptyShiftsArray();
    this.handleGetShiftsRequest(true);
  };

  handleGetShiftsRequest = (shouldReload = false) => {
    const {activeTabKey} = this.state;
    this.setState({
      loading: true,
    });

    const payload = {
      status: [activeTabKey],
    };

    // past tab will consists of past shifts and no show shifts
    let alreadyLoadedShifts;

    if (activeTabKey === SHIFT.status.PAST) {
      payload['status'].push(SHIFT.status.NO_SHOW, SHIFT.status.REVIEW_PENDING);

      alreadyLoadedShifts = getShifts(this.props.shifts, {
        status: [
          activeTabKey,
          SHIFT.status.NO_SHOW,
          SHIFT.status.REVIEW_PENDING,
        ],
      });
    } else {
      alreadyLoadedShifts = getShifts(this.props.shifts, {
        status: activeTabKey,
      });
    }

    if (
      !_.isEmpty(alreadyLoadedShifts) &&
      alreadyLoadedShifts.length > 2 &&
      !shouldReload
    ) {
      this.setState({
        loading: false,
        shiftsListItems: alreadyLoadedShifts,
      });
    } else {
      this.props.getShiftsByStatus(payload, (response) => {
        if (response) {
          let temp;

          if (_.isEqual(activeTabKey, SHIFT.status.PAST)) {
            temp = getShifts(this.props.shifts, {
              status: [
                activeTabKey,
                SHIFT.status.NO_SHOW,
                SHIFT.status.REVIEW_PENDING,
              ],
            });

            console.log({hussain: temp});
          } else {
            temp = getShifts(this.props.shifts, {
              status: activeTabKey,
            });
          }

          this.setState({
            loading: false,
            shiftsListItems: temp,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    }
  };

  emptyStates = {
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
    default: {
      image: null,
      text: strings.NO_SHIFT_FOUND,
      button_text: '',
      button_action: () => {},
    },
  };

  handleNavigateBrowse = () => {
    Actions.jump('search', {
      tabs: shiftListTabs.search.tabs,
      activeTabKey: SHIFT.status.BROWSE,
      shouldReloadTab: new Date(),
    });
  };

  onTabPressHandler = (key) => {
    const {clickedTabsKeys} = this.state;
    this.setValue(
      {
        activeTabKey: key,
      },
      () => {
        if (!_.includes(clickedTabsKeys, key)) {
          clickedTabsKeys.push(key);
          this.handleGetShiftsRequest(true);
        }
      },
    );
  };

  render() {
    const {activeTabKey, tabs, shiftsListItems, loading} = this.state;
    return (
      <MyShiftsTabListView
        {...this.props}
        activeTabKey={activeTabKey}
        tabbar={tabs}
        shiftsListItems={shiftsListItems}
        loading={loading}
        setValue={this.setValue}
        onRefresh={this.onRefresh}
        onTabPressHandler={this.onTabPressHandler}
        emptyStates={this.emptyStates}
      />
    );
  }
}

const mapStateToProps = ({shifts, general}, ownProps) => {
  return {
    shouldCallOnEnter: shifts.shouldCallOnEnter,
    shifts: shifts.shifts,
  };
};

const actions = {
  setSelectedTab,
  getShiftsByStatus,
  emptyShiftsArray,
  shouldCallOnEnterSuccess,
};

export default connect(mapStateToProps, actions)(MyShiftsTabListController);
