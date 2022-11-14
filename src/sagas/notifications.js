import {take, put, call, fork} from 'redux-saga/effects';
import _ from 'lodash';
import {
  GET_NOTIFICATIONS_LIST,
  MARK_READ_NOTIFICATION,
  UNREAD_NOTIFICATIONS_COUNT,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  getNotificationsListSuccess,
  markReadNotificationSuccess,
  unReadNotificationCountSuccess,
} from '../actions/NotificationActions';
import {
  callRequest,
  NOTIFICATION_LISTING as NOTIFICATION_LISTING_URL,
  MARK_NOTIFICATION_AS_READ_ON_API as MARK_NOTIFICATION_AS_READ_URL,
  UNREAD_NOTIFICATIONS_COUNT as UNREAD_NOTIFICATIONS_COUNT_URL,
  ERROR_SOMETHING_WENT_WRONG,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(err, type = 'error') {
  let msg = _.has(err, 'message')
    ? err.message
    : ERROR_SOMETHING_WENT_WRONG.message;

  setTimeout(() => {
    Util.topAlert(msg, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getNotificationsList() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_NOTIFICATIONS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        NOTIFICATION_LISTING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getNotificationsListSuccess(response.data));
        // Util.topAlert(response.message);
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* markNotificationAsReadOnApi() {
  while (true) {
    const {payload, responseCallback} = yield take(
      MARK_READ_NOTIFICATION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        MARK_NOTIFICATION_AS_READ_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(markReadNotificationSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* unReadNotificationCount() {
  while (true) {
    const {payload, responseCallback} = yield take(
      UNREAD_NOTIFICATIONS_COUNT.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        UNREAD_NOTIFICATIONS_COUNT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (_.has(response, 'status') && response.status) {
        yield put(unReadNotificationCountSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      // alert(err);
    }
  }
}

export default function* root() {
  yield fork(getNotificationsList);
  yield fork(markNotificationAsReadOnApi);
  yield fork(unReadNotificationCount);
}
