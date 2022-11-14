// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  USER_SIGNIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  GET_PROFILE_SECTIONS,
  USER_FORGOT_PASSWORD,
  USER_PROFILE,
  GET_USER_DATA,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  otpValue: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case USER_SIGNUP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case GET_USER_DATA.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case USER_SIGNUP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case USER_PROFILE.SUCCESS: {
      let temp = _.cloneDeep(state.data);
      let obj = Object.assign({}, temp, action.data);
      return Immutable.merge(state, {
        data: obj,
      });
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case USER_FORGOT_PASSWORD.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }

    case GET_PROFILE_SECTIONS.SUCCESS: {
      return Immutable.merge(state, {
        profileSections: action.data,
      });
    }

    // case GET_MONTHLY_EARNINGS_LIST.SUCCESS: {
    //   const tempData = _.cloneDeep(state.data);

    //   const {thisMonthsEarings} = action.data;
    //   const {totalEarning} = thisMonthsEarings;

    //   tempData.month_total = totalEarning;

    //   return Immutable.merge(state, {
    //     data: tempData,
    //   });
    // }

    default:
      return state;
  }
};
