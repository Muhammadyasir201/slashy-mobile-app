import {take, put, call, fork} from 'redux-saga/effects';
import _ from 'lodash';
import {
  UPDATE_DEVICE_ID,
  GET_ROLES,
  UPLOAD_IMAGE,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {updateDeviceTokenSuccess} from '../actions/GeneralActions';
import {
  callRequest,
  GET_ROLES as GET_ROLES_URL,
  UPDATE_DEVICE_ID as UPDATE_DEVICE_ID_URL,
  CLOUDINARY_URL,
  UPLOAD_IMAGE as UPLOAD_IMAGE_URL,
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

function* updateDeviceToken() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_DEVICE_ID.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_DEVICE_ID_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (_.has(response, 'status') && response.status) {
        yield put(updateDeviceTokenSuccess(response.data));
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
function* getAllRoles() {
  while (true) {
    const {responseCallback} = yield take(GET_ROLES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ROLES_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (_.has(response, 'status') && response.status) {
        if (responseCallback) responseCallback(true, response.data);
      } else {
        if (responseCallback) responseCallback(false, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err);
    }
  }
}

function* uploadImage() {
  while (true) {
    const {payload, responseCallback} = yield take(UPLOAD_IMAGE.REQUEST);

    try {
      const response = yield call(
        callRequest,
        UPLOAD_IMAGE_URL,
        payload,
        '',
        {
          Accept: 'multipart/form-data',
        },
        ApiSauce,
        CLOUDINARY_URL,
      );

      console.log({response})

      if (response.secure_url) {
        if (responseCallback) responseCallback(true, response);
      } else {
        if (responseCallback) responseCallback(false, {});
        alert(ERROR_SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      console.log({err})
      if (responseCallback) responseCallback(false, err);
      // alert(err.data ? err.data.message : ERROR_SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(updateDeviceToken);
  yield fork(getAllRoles);
  yield fork(uploadImage);
}
