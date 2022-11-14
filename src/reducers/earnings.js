// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_MONTHLY_EARNINGS_LIST,
  GET_ALL_PAY_SLIPS,
  USER_SIGNOUT,
  GET_PDF_OF_INVOICE,
} from '../actions/ActionTypes';

const initialState = Immutable({
  payDay: '',
  totalEarning: '',
  invoice: [],
  overdue: [],
  payslips: [],
  earlyPaymentRequested: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case GET_MONTHLY_EARNINGS_LIST.SUCCESS: {
      const {thisMonthsEarings, overdue, earlyPaymentRequest} = action.data;
      const {payDay, totalEarning, payslips} = thisMonthsEarings;
      return Immutable.merge(state, {
        payDay: payDay,
        totalEarning: totalEarning,
        invoice: payslips,
        overdue: overdue,
        earlyPaymentRequested: earlyPaymentRequest,
      });
    }
    case GET_ALL_PAY_SLIPS.SUCCESS: {
      return Immutable.merge(state, {
        payslips: action.data,
      });
    }
    case GET_PDF_OF_INVOICE.SUCCESS: {
      let allInvoices = _.cloneDeep(state.payslips);

      let invoiceId = action.data.id;
      let pdf = action.data.pdf;

      let index = _.findIndex(allInvoices, {id: invoiceId});
      if (index < 0) return;

      allInvoices[index]['pdf'] = pdf;
      return Immutable.merge(state, {
        invoice: allInvoices,
      });
    }
    default:
      return state;
  }
};
