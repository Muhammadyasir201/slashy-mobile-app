import {fork} from 'redux-saga/effects';
import user from './user';
import init from './init';
import shift from './shift';
import notifications from './notifications';
import earnings from './earnings';
import reviews from './reviews';
import general from './general';

export default function* root() {
  yield fork(user);
  yield fork(init);
  yield fork(shift);
  yield fork(notifications);
  yield fork(earnings);
  yield fork(reviews);
  yield fork(general);
}
