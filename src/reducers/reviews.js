// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {USER_SIGNOUT, REVIEWS_LIST} from '../actions/ActionTypes';

const initialState = Immutable({
  reviews: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case REVIEWS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        reviews: action.data,
      });
    }

    default:
      return state;
  }
};
