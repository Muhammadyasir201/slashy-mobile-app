import {
  GET_MONTHLY_EARNINGS_LIST,
  REQUEST_EARLY_PAYMENT,
  GET_ALL_PAY_SLIPS,
  GET_PDF_OF_INVOICE,
} from './ActionTypes';

export function getMonthlyEarningsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_MONTHLY_EARNINGS_LIST.REQUEST,
  };
}

export function getMonthlyEarningsSuccess(data) {
  return {
    data,
    type: GET_MONTHLY_EARNINGS_LIST.SUCCESS,
  };
}

export function requestEarlyPayment(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REQUEST_EARLY_PAYMENT.REQUEST,
  };
}

export function requestEarlyPaymentSuccess(data) {
  return {
    data,
    type: REQUEST_EARLY_PAYMENT.SUCCESS,
  };
}

export function getAllPaySlipsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_ALL_PAY_SLIPS.REQUEST,
  };
}

export function getAllPaySlipsSuccess(data) {
  return {
    data,
    type: GET_ALL_PAY_SLIPS.SUCCESS,
  };
}
export function getInvoicePdfRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PDF_OF_INVOICE.REQUEST,
  };
}
export function getInvoicePdfSuccess(data) {
  return {
    data,
    type: GET_PDF_OF_INVOICE.SUCCESS,
  };
}
