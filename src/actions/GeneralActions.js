// @flow

import {
  SET_SELECTED_TAB,
  UPDATE_DEVICE_ID,
  GET_ROLES,
  UPLOAD_IMAGE,
} from './ActionTypes';

export function setSelectedTab(data) {
  return {
    data,
    type: SET_SELECTED_TAB,
  };
}

export function updateDeviceTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_DEVICE_ID.REQUEST,
  };
}
export function updateDeviceTokenSuccess(data) {
  return {
    data,
    type: UPDATE_DEVICE_ID.SUCCESS,
  };
}
export function getRolesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ROLES.REQUEST,
  };
}
export function uploadSingleImage(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPLOAD_IMAGE.REQUEST,
  };
}
