import {REVIEWS_LIST} from './ActionTypes';

export function getReviewsByRoleIdRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REVIEWS_LIST.REQUEST,
  };
}

export function getReviewsByRoleIdSuccess(data) {
  return {
    data,
    type: REVIEWS_LIST.SUCCESS,
  };
}
