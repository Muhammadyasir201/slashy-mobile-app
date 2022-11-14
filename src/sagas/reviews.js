import {take, put, call, fork} from 'redux-saga/effects';
import {REVIEWS_LIST} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {getReviewsByRoleIdSuccess} from '../actions/ReviewActions';
import {REVIEWS as REVIEWS_URL, callRequest} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getReviews() {
  while (true) {
    const {payload, responseCallback} = yield take(REVIEWS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REVIEWS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (!response.status) {
        yield put(getReviewsByRoleIdSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(Util.getErrorText(response.message));
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(Util.getErrorText(err.message));
    }
  }
}

export default function* root() {
  yield fork(getReviews);
}
