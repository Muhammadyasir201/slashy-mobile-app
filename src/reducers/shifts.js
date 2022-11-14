// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_SHIFTS,
  GET_SHIFT_DETAILS,
  CHANGE_SHIFT_STATUS,
  USER_SIGNOUT,
  SHOULD_CALL_ON_ENTER,
  EMPTY_SHIFTS_ARRAY,
  CHANGES_ACCEPTED,
} from '../actions/ActionTypes';

const initialState = Immutable({
  shifts: [],
  shouldCallOnEnter: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPTY_SHIFTS_ARRAY: {
      return Immutable.merge(state, {
        shifts: [],
      });
    }
    case GET_SHIFTS.SUCCESS: {
      let temp = _.cloneDeep(state.shifts);
      temp = _.unionBy(action.data.shifts, temp, 'id');
      return Immutable.merge(state, {
        shifts: temp,
        roles: action.data.roles,
      });
    }
    case GET_SHIFT_DETAILS.SUCCESS: {
      let temp = _.cloneDeep(state.shifts);
      let index = _.findIndex(temp, {id: action.data.id});
      if (index < 0) {
        temp.push(action.data);
      } else {
        temp[index] = _.merge(temp[index], action.data);
      }
      return Immutable.merge(state, {
        shifts: temp,
      });
    }
    case CHANGE_SHIFT_STATUS.SUCCESS: {
      let temp = _.cloneDeep(state.shifts);
      let index = _.findIndex(temp, {id: action.data.shiftId});

      temp[index]['status'] = action.data.status;
      return Immutable.merge(state, {
        shifts: temp,
      });
    }
    case CHANGES_ACCEPTED.SUCCESS: {
      let temp = _.cloneDeep(state.shifts);
      let index = _.findIndex(temp, {id: action.data.shiftId});
      temp[index]['changes_accepted'] = action.data.changes_accepted;
      return Immutable.merge(state, {
        shifts: temp,
      });
    }

    case SHOULD_CALL_ON_ENTER.SUCCESS: {
      return Immutable.merge(state, {
        shouldCallOnEnter: !state.shouldCallOnEnter,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
