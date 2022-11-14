// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_NOTIFICATIONS_LIST,
  MARK_NOTIFICATION_AS_READ,
  USER_SIGNOUT,
  MARK_READ_NOTIFICATION,
  UNREAD_NOTIFICATIONS_COUNT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  notification: [],
  un_read_notification_count: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case GET_NOTIFICATIONS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        notification: action.data,
      });
    }
    case MARK_NOTIFICATION_AS_READ.SUCCESS: {
      let temp = _.cloneDeep(state.notification);

      let index = _.findIndex(temp, {id: action.data.notificationId});

      temp[index]['is_read'] = true;
      return Immutable.merge(state, {
        notification: temp,
      });
    }
    case GET_NOTIFICATIONS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        notification: action.data,
      });
    }
    case UNREAD_NOTIFICATIONS_COUNT.SUCCESS: {
      return Immutable.merge(state, {
        un_read_notification_count: action.data,
      });
    }
    default:
      return state;
  }
};
