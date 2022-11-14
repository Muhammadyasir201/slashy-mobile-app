import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {setSelectedTab} from '../../actions/GeneralActions';
import SearchTabListView from './SearchTabListView';
import {
  getShiftsByStatus,
  emptyShiftsArray,
  shouldCallOnEnterSuccess,
} from '../../actions/ShiftsActions';
import {Images} from '../../theme';
import {strings, SHIFT} from '../../constants';
import {shiftListTabs} from '../../components/Tabbar';
import {
  getShifts,
  getOnGoingShift,
  getShiftsByRoleId,
  navigateActionsOnNotificationTap,
} from '../../services/generalHelper';
import util from '../../util';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
} from '../../constants';
import {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  clearBadgeNumber,
} from '../../services/firebaseHelper';
import {unReadNotificationCountRequest} from '../../actions/NotificationActions';
import {Notifications} from 'react-native-notifications';

class SearchTabListController extends React.Component {
  constructor(props) {
    super(props);
    this._fcmInit();
    this.state = {
      activeTabKey: SHIFT.status.BROWSE,
      tabs: shiftListTabs.search.tabs,
      shiftsListItems: [],
      loading: true,
      selectedRoleId: null,
    };
    SearchTabListController.instance = this;
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
    tabs: PropTypes.array,
    activeTabKey: PropTypes.string,
    shouldReloadTab: PropTypes.object,
    roles: PropTypes.array,
  };
  static defaultProps = {
    tabs: shiftListTabs.search.tabs,
    activeTabKey: SHIFT.status.BROWSE,
    shouldReloadTab: {},
    roles: [],
  };

  static onEnter() {
    if (SearchTabListController.instance) {
      SearchTabListController.instance._onEnter();
    }
  }

  _onEnter() {
    this.props.setSelectedTab(2);
    if (this.props.shouldCallOnEnter) {
      this.handleGetShiftsRequest(true);
      this.props.shouldCallOnEnterSuccess();
    }
  }

  static onExit() {
    if (SearchTabListController.instance) {
      SearchTabListController.instance._onExit();
    }
  }

  _onExit() {}

  componentDidUpdate(prevProps, prevState) {
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
    } else if (!_.isEqual(this.state.activeTabKey, prevState.activeTabKey)) {
      this.handleGetShiftsRequest();
    } else if (
      !_.isEqual(this.props.selectedIndex, prevProps.selectedIndex) &&
      !this.props.shouldCallOnEnter &&
      _.isEqual(this.props.selectedIndex, 2)
    ) {
      switch (this.state.activeTabKey) {
        case SHIFT.status.OFFERED:
        case SHIFT.status.BROWSE:
        case SHIFT.status.APPLIED: {
          this.handleGetShiftsRequest(true);
          break;
        }
      }
    }
  }

  componentDidMount() {
    this.handleGetShiftsRequest();
    this.notificationPolling = setInterval(() => {
      _.isNil(this.props.user.access_token)
        ? clearInterval(this.notificationPolling)
        : this.props.unReadNotificationCountRequest({}, () => {});
    }, 5000);
    clearBadgeNumber();
  }

  componentWillUnmount() {
    this.notificationPolling && clearInterval(this.notificationPolling);
    this.registerRemoteNotifications &&
      this.registerRemoteNotifications.remove();
    this.registerRemoteNotificationsRegistered &&
      this.registerRemoteNotificationsRegistered.remove();
    this.registerRemoteNotificationsRegistrationFailed &&
      this.registerRemoteNotificationsRegistrationFailed.remove();
    this.registerNotificationReceivedForeground &&
      this.registerNotificationReceivedForeground.remove();
    this.registerNotificationOpened && this.registerNotificationOpened.remove();
    this.registerNotificationReceivedBackground &&
      this.registerNotificationReceivedBackground.remove();
  }

  _fcmInit = async () => {
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    this.registerRemoteNotifications = Notifications.registerRemoteNotifications();

    Notifications.getInitialNotification()
      .then((notification) => {
        if (notification && notification.payload)
          console.log(
            'Initial notification was:',
            notification ? notification.payload : 'N/A',
          );

        navigateActionsOnNotificationTap(notification.payload);
      })
      .catch((err) => console.error('getInitialNotifiation() failed', err));

    this.registerRemoteNotificationsRegistered = Notifications.events().registerRemoteNotificationsRegistered(
      (event) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      },
    );
    this.registerRemoteNotificationsRegistrationFailed = Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event) => {
        console.error(event);
      },
    );

    this.registerNotificationReceivedForeground = Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification);

        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          showLocalNotification(notification.payload);
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    this.registerNotificationOpened = Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification.payload);

        navigateActionsOnNotificationTap(
          notification.payload.data
            ? notification.payload.data
            : notification.payload,
        );

        completion();
      },
    );

    this.registerNotificationReceivedBackground = Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
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

  setValue = (obj) => {
    this.setState(obj);
  };

  handleGetShiftsRequest = (shouldReload = false) => {
    const {activeTabKey, selectedRoleId} = this.state;

    this.setState({
      loading: true,
    });

    const payload = {
      status: [activeTabKey],
    };

    let alreadyLoadedShifts = [];

    if (activeTabKey === SHIFT.status.BROWSE) {
      payload['status'].push(SHIFT.status.ONGOING);
      if (!_.isNil(selectedRoleId))
        alreadyLoadedShifts = getShifts(this.props.shifts, {
          status: activeTabKey,
          roleId: selectedRoleId,
        });
    } else {
      alreadyLoadedShifts = getShifts(this.props.shifts, {
        status: activeTabKey,
      });
    }

    if (!_.isEmpty(alreadyLoadedShifts) && !shouldReload) {
      this.setState({
        loading: false,
        shiftsListItems: alreadyLoadedShifts,
      });
    } else {
      this.props.getShiftsByStatus(payload, (response) => {
        if (response) {
          let temp = getShifts(this.props.shifts, {
            status: activeTabKey,
          });

          if (!_.isNil(selectedRoleId) && activeTabKey === SHIFT.status.BROWSE)
            temp = getShiftsByRoleId(temp, selectedRoleId);

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

  onRefresh = () => {
    this.props.emptyShiftsArray();
    this.handleGetShiftsRequest(true);
  };

  getAllBrowseTabShifts = () => {
    return getShifts(this.props.shifts, {status: SHIFT.status.BROWSE});
  };

  filterShiftsByRole = (role_id) => {
    let temp = getShifts(this.props.shifts, {status: this.state.activeTabKey});
    if (role_id === this.state.selectedRoleId) {
      this.setState({
        shiftsListItems: temp,
        selectedRoleId: null,
      });
    } else {
      let filteredJobs = getShiftsByRoleId(temp, role_id);
      this.setState({
        shiftsListItems: filteredJobs,
        selectedRoleId: role_id,
      });
    }
  };

  render() {
    const {
      activeTabKey,
      tabs,
      shiftsListItems,
      loading,
      selectedRoleId,
    } = this.state;
    const {ongoingEvent, roles} = this.props;

    return (
      <SearchTabListView
        {...this.props}
        activeTabKey={activeTabKey}
        tabbar={tabs}
        shiftsListItems={shiftsListItems}
        loading={loading}
        ongoingEvent={ongoingEvent}
        roles={roles}
        selectedRoleId={selectedRoleId}
        emptyStates={this.emptyStates}
        setValue={this.setValue}
        onRefresh={this.onRefresh}
        allBrowseTabShifts={this.getAllBrowseTabShifts()}
        filterShiftsByRole={this.filterShiftsByRole}
      />
    );
  }
}

const mapStateToProps = ({shifts, general, notification, user}, ownProps) => {
  let allOnGoingShifts = _.filter(shifts.shifts, {
    status: SHIFT.status.ONGOING,
  });

  return {
    user: user.data,
    shifts: shifts.shifts,
    roles: shifts.roles,
    ongoingEvent: getOnGoingShift(allOnGoingShifts),
    shouldCallOnEnter: shifts.shouldCallOnEnter,
    selectedIndex: general.selectedIndex,
    unReadNotiCount: notification.un_read_notification_count,
  };
};

const actions = {
  setSelectedTab,
  getShiftsByStatus,
  emptyShiftsArray,
  shouldCallOnEnterSuccess,
  unReadNotificationCountRequest,
};

export default connect(mapStateToProps, actions)(SearchTabListController);
