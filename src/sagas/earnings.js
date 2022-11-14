import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_MONTHLY_EARNINGS_LIST,
  REQUEST_EARLY_PAYMENT,
  GET_ALL_PAY_SLIPS,
  GET_PDF_OF_INVOICE,
} from '../actions/ActionTypes';
import _ from 'lodash';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  getMonthlyEarningsSuccess,
  requestEarlyPaymentSuccess,
  getAllPaySlipsSuccess,
  getInvoicePdfSuccess,
  updateThisMonthEarningValue,
} from '../actions/EarningsActions';

import {
  callRequest,
  MONTHLY_EARNINGS_LIST as MONTHLY_EARNINGS_LIST_URL,
  REQUEST_EARLY_PAYMENT as REQUEST_EARLY_PAYMENT_URL,
  GET_ALL_PAY_SLIPS as GET_ALL_PAY_SLIPS_URL,
  GET_PDF_OF_INVOICE as GET_PDF_OF_INVOICE_URL,
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

function* getMonthlyEarningsList() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_MONTHLY_EARNINGS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        MONTHLY_EARNINGS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getMonthlyEarningsSuccess(response.data));
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

function* requestEarlyPayment() {
  while (true) {
    const {payload, responseCallback} = yield take(
      REQUEST_EARLY_PAYMENT.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        REQUEST_EARLY_PAYMENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(requestEarlyPaymentSuccess(response.data));
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

function* getAllPaySlips() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_ALL_PAY_SLIPS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ALL_PAY_SLIPS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getAllPaySlipsSuccess(response.data));
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

function* getInvoicePdf() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PDF_OF_INVOICE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PDF_OF_INVOICE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (_.has(response, 'status') && response.status) {
        yield put(getInvoicePdfSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, true);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

export default function* root() {
  yield fork(getMonthlyEarningsList);
  yield fork(requestEarlyPayment);
  yield fork(getAllPaySlips);
  yield fork(getInvoicePdf);
}
