import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_SHIFTS,
  GET_ALL_SHIFTS,
  GET_SHIFT_DETAILS,
  APPLY_ON_SHIFT,
  RESPOND_TO_OFFER,
  WITHDRAW_OFFER,
  CANCEL_SHIFT,
  MARK_ATTENDANCE,
  CHANGES_ACCEPTED,
} from '../actions/ActionTypes';
import _ from 'lodash';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  getShiftsSuccess,
  getShiftDetailsSuccess,
  applyOnShiftSuccess,
  respondToOfferSuccess,
  withdrawOfferSuccess,
  cancelShiftSuccess,
  markAttendanceSuccess,
  changesAcceptedSuccess,
} from '../actions/ShiftsActions';
import {
  GET_SHIFTS as GET_SHIFTS_URL,
  GET_ALL_SHIFTS as GET_ALL_SHIFTS_URL,
  callRequest,
  GET_SHIFT_DETAILS as GET_SHIFT_DETAILS_URL,
  APPLY_ON_SHIFT as APPLY_ON_SHIFT_URL,
  RESPOND_TO_OFFER as RESPOND_TO_OFFER_URL,
  WITHDRAW_OFFER as WITHDRAW_OFFER_URL,
  CANCEL_SHIFT as CANCEL_SHIFT_URL,
  MARK_ATTENDANCE as MARK_ATTENDANCE_URL,
  CHANGES_ACCEPTED as CHANGES_ACCEPTED_URL,
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

function* getShifts() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SHIFTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SHIFTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getShiftsSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
    }
  }
}

function* getShiftDetails() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SHIFT_DETAILS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SHIFT_DETAILS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getShiftDetailsSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        alert(response);
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* applyOnShift() {
  while (true) {
    const {payload, responseCallback} = yield take(APPLY_ON_SHIFT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        APPLY_ON_SHIFT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(applyOnShiftSuccess(response.data));
        if (responseCallback) responseCallback(response.status);
      } else {
        alert(response);
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* respondToOffer() {
  while (true) {
    const {payload, responseCallback} = yield take(RESPOND_TO_OFFER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESPOND_TO_OFFER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(respondToOfferSuccess(response.data));
      }

      responseCallback && responseCallback(response.status, response.message);
    } catch (err) {
      let status = undefined;
      let message = _.has(err, 'message')
        ? err.message
        : ERROR_SOMETHING_WENT_WRONG;
      if (responseCallback) responseCallback(status, message);
      // alert(err);
    }
  }
}

function* withdrawOffer() {
  while (true) {
    const {payload, responseCallback} = yield take(WITHDRAW_OFFER.REQUEST);
    try {
      const response = yield call(
        callRequest,
        WITHDRAW_OFFER_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(withdrawOfferSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        alert(response);
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* cancelShift() {
  while (true) {
    const {payload, responseCallback} = yield take(CANCEL_SHIFT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CANCEL_SHIFT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(cancelShiftSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        alert(response);
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* markAttendance() {
  while (true) {
    const {payload, responseCallback} = yield take(MARK_ATTENDANCE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        MARK_ATTENDANCE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(markAttendanceSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        alert(response);
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* acceptChanges() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGES_ACCEPTED.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGES_ACCEPTED_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(changesAcceptedSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        alert(response);
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

export default function* root() {
  yield fork(getShifts);
  yield fork(getShiftDetails);
  yield fork(applyOnShift);
  yield fork(respondToOffer);
  yield fork(withdrawOffer);
  yield fork(cancelShift);
  yield fork(markAttendance);
  yield fork(acceptChanges);
}
