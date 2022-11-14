import {
  GET_SHIFTS,
  GET_SHIFT_DETAILS,
  APPLY_ON_SHIFT,
  RESPOND_TO_OFFER,
  WITHDRAW_OFFER,
  CANCEL_SHIFT,
  CHANGE_SHIFT_STATUS,
  MARK_ATTENDANCE,
  SHOULD_CALL_ON_ENTER,
  EMPTY_SHIFTS_ARRAY,
  CHANGES_ACCEPTED,
} from './ActionTypes';

export function getShiftsByStatus(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SHIFTS.REQUEST,
  };
}

export function getShiftsSuccess(data) {
  return {
    data,
    type: GET_SHIFTS.SUCCESS,
  };
}
export function shouldCallOnEnterSuccess() {
  return {
    type: SHOULD_CALL_ON_ENTER.SUCCESS,
  };
}

export function getShiftDetails(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SHIFT_DETAILS.REQUEST,
  };
}

export function getShiftDetailsSuccess(data) {
  return {
    data,
    type: GET_SHIFT_DETAILS.SUCCESS,
  };
}

export function applyOnShift(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: APPLY_ON_SHIFT.REQUEST,
  };
}

export function applyOnShiftSuccess(data) {
  return {
    data,
    type: APPLY_ON_SHIFT.SUCCESS,
  };
}

export function respondToOffer(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: RESPOND_TO_OFFER.REQUEST,
  };
}

export function respondToOfferSuccess(data) {
  return {
    data,
    type: RESPOND_TO_OFFER.SUCCESS,
  };
}

export function withdrawOffer(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: WITHDRAW_OFFER.REQUEST,
  };
}

export function withdrawOfferSuccess(data) {
  return {
    data,
    type: WITHDRAW_OFFER.SUCCESS,
  };
}

export function cancelShift(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CANCEL_SHIFT.REQUEST,
  };
}

export function cancelShiftSuccess(data) {
  return {
    data,
    type: CANCEL_SHIFT.SUCCESS,
  };
}

export function changeShiftStatusSuccess(data) {
  return {
    data,
    type: CHANGE_SHIFT_STATUS.SUCCESS,
  };
}

export function markAttendanceRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MARK_ATTENDANCE.REQUEST,
  };
}

export function markAttendanceSuccess(data) {
  return {
    data,
    type: MARK_ATTENDANCE.SUCCESS,
  };
}

export function changesAcceptedRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGES_ACCEPTED.REQUEST,
  };
}

export function changesAcceptedSuccess(data) {
  return {
    data,
    type: CHANGES_ACCEPTED.SUCCESS,
  };
}

export function emptyShiftsArray(data) {
  return {
    data,
    type: EMPTY_SHIFTS_ARRAY,
  };
}
