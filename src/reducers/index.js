import {combineReducers} from 'redux';

import general from './general';
import navigator from './navigator';
import user from './user';
import shifts from './shifts';
import earnings from './earnings';
import notification from './notification';
import reviews from './reviews';

export default combineReducers({
  general,
  route: navigator,
  user,
  shifts,
  earnings,
  notification,
  reviews,
});
