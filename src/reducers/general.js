// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {SET_SELECTED_TAB, USER_SIGNOUT} from '../actions/ActionTypes';

const initialState = Immutable({
  selectedIndex: 2,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TAB: {
      return Immutable.merge(state, {
        selectedIndex: action.data,
      });
    }

    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    default:
      return state;
  }
};
