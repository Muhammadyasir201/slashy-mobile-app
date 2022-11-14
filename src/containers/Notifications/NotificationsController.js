import React from 'react';
import PropTypes from 'prop-types';
import NotificationsView from './NotificationsView';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment, {duration} from 'moment';
import {
  getNotificationsList,
  markNotificationAsReadSuccess,
  markReadNotificationRequest,
  unReadNotificationCountRequest,
} from '../../actions/NotificationActions';
import {respondToOfferSuccess} from '../../actions/ShiftsActions';
import util from '../../util';
import {DATE_FORMAT3} from '../../constants';
import {navigateActionsOnNotificationTap} from '../../services/generalHelper';
import {setSelectedTab} from '../../actions/GeneralActions';

class NotificationsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notificationsList: [],
      limit: 2000,
      offset: 0,
    };

    NotificationsController.instance = this;
  }

  static propTypes = {};
  static defaultProps = {};

  static onEnter() {
    if (NotificationsController.instance) {
      NotificationsController.instance._onEnter();
    }
  }

  _onEnter() {
    this.props.setSelectedTab(3);
    this.handleInititalRequest();
  }

  static onExit() {
    if (NotificationsController.instance) {
      NotificationsController.instance._onExit();
    }
  }

  _onExit() {}

  componentDidMount() {
    this.handleInititalRequest();
  }

  setStateFunc = () => {
    this.setState({
      notificationsList: this.props.notifications,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notifications !== this.props.notifications) {
      if (!_.isEmpty(this.props.notifications)) {
        let data = this.manipulateDataForSectionList(this.props.notifications);
        this.setState({
          notificationsList: data,
        });
      }
      this.props.unReadNotificationCountRequest({}, () => {});
    }
  }

  handleInititalRequest() {
    const {limit, offset} = this.state;

    this.setState({
      loading: true,
    });

    const payload = {
      limit: limit,
      offset: offset,
    };

    this.props.getNotificationsList(payload, (response) => {
      if (response) {
        const {notifications} = this.props;

        if (!_.isEmpty(notifications)) {
          let data = this.manipulateDataForSectionList(notifications);
          this.setState({
            notificationsList: data,
          });
        }
      }
      this.setState({
        loading: false,
      });
    });
  }

  manipulateDataForSectionList = (mArray) => {
    const arrivalFormat = {
      RECENT: 'Recent',
      EARLIER: 'Earlier',
    };

    let notificationData = [];
    let recentNotifications = [];
    let earlierNotifications = [];

    mArray.map((item) => {
      let isTodaysNotification = moment().isSame(item.createdAt, 'day');
      if (isTodaysNotification) {
        recentNotifications.push(item);
      } else {
        earlierNotifications.push(item);
      }
    });

    if (recentNotifications.length) {
      notificationData.push({
        title: arrivalFormat.RECENT,
        data: recentNotifications,
      });
    }

    if (earlierNotifications.length) {
      notificationData.push({
        title: arrivalFormat.EARLIER,
        data: earlierNotifications,
      });
    }

    return notificationData;
  };

  onRefresh = () => {
    this.handleInititalRequest();
  };

  markNotificationAsRead = (itemObj) => {
    const data = {
      notificationId: itemObj.id,
      id: itemObj.id,
    };

    this.props.markReadNotificationRequest(data, (response) => {
      if (response) {
        this.props.markNotificationAsReadSuccess(data);
        this.props.unReadNotificationCountRequest({}, () => {});
      }
    });
    navigateActionsOnNotificationTap(itemObj);
  };

  onFlatListScrollHandler = () => {
    const {limit, offset} = this.state;

    this.setState(
      {
        offset: offset + limit,
      },
      () => {
        this.handleInititalRequest();
      },
    );
  };

  render() {
    const {loading, notificationsList} = this.state;
    return (
      <NotificationsView
        {...this.props}
        notifications={notificationsList}
        loading={loading}
        onRefresh={this.onRefresh}
        markNotificationAsRead={this.markNotificationAsRead}
        onFlatListScrollHandler={this.onFlatListScrollHandler}
      />
    );
  }
}

const mapStateToProps = ({notification}) => ({
  notifications: notification.notification,
});

const actions = {
  getNotificationsList,
  setSelectedTab,
  markNotificationAsReadSuccess,
  markReadNotificationRequest,
  unReadNotificationCountRequest,
};

export default connect(mapStateToProps, actions)(NotificationsController);
