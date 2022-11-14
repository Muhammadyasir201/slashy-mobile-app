import {
  GET_NOTIFICATIONS_LIST,
  MARK_NOTIFICATION_AS_READ,
  MARK_READ_NOTIFICATION,
  UNREAD_NOTIFICATIONS_COUNT,
} from './ActionTypes';

export function getNotificationsList(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_NOTIFICATIONS_LIST.REQUEST,
  };
}

export function getNotificationsListSuccess(data) {
  return {
    data,
    type: GET_NOTIFICATIONS_LIST.SUCCESS,
  };
}

export function unReadNotificationCountRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UNREAD_NOTIFICATIONS_COUNT.REQUEST,
  };
}

export function unReadNotificationCountSuccess(data) {
  return {
    data,
    type: UNREAD_NOTIFICATIONS_COUNT.SUCCESS,
  };
}

export function markNotificationAsReadSuccess(data) {
  return {
    data,
    type: MARK_NOTIFICATION_AS_READ.SUCCESS,
  };
}

export function markReadNotificationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MARK_READ_NOTIFICATION.REQUEST,
  };
}

export function markReadNotificationSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: MARK_READ_NOTIFICATION.SUCCESS,
  };
}
