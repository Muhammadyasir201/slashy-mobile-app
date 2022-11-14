import {take, put, call, fork} from 'redux-saga/effects';
import _ from 'lodash';
import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  USER_FORGOT_PASSWORD,
  USER_CONFIRM_OTP_FGPASS,
  USER_UPDATE_PASSWORD,
  CONTACT_ADMIN,
  GET_PROFILE_SECTIONS,
  POST_PROFILE_DATA,
  DELETE_PROFILE_SUBSECTION_DATA,
  USER_RESET_PASSWORD,
  VERIFY_OTP,
  USER_PROFILE,
  CHANGE_PASSWORD,
  REQUEST_OTP,
  GET_USER_DATA,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  userSignupSuccess,
  userSigninSuccess,
  userSignOutSuccess,
  updateUserProfileSuccess,
  getProfileSectionsSuccess,
  forgotPasswordSuccess,
  resetPasswordSuccess,
  verifyOTPSuccess,
  getUserProfileSuccess,
  getUSerDataSuccess,
} from '../actions/UserActions';
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  GET_USER_DATA as GET_USER_DATA_URL,
  UPDATE_USER_PROFILE as UPDATE_USER_PROFILE_URL,
  VERIFY_OTP as VERIFY_OTP_URL,
  REQUEST_OTP as REQUEST_OTP_URL,
  USER_FORGOT_PASSWORD as USER_FORGOT_PASSWORD_URL,
  USER_RESET_PASSWORD as USER_RESET_PASSWORD_URL,
  USER_CONFIRM_OTP_FGPASS as USER_CONFIRM_OTP_FGPASS_URL,
  USER_UPDATE_PASSWORD as USER_UPDATE_PASSWORD_URL,
  CONTACT_ADMIN as CONTACT_ADMIN_URL,
  GET_PROFILE_SECTIONS as GET_PROFILE_SECTIONS_URL,
  POST_PROFILE_DATA as POST_PROFILE_DATA_URL,
  DELETE_PROFILE_SUBSECTION_DATA as DELETE_PROFILE_SUBSECTION_DATA_URL,
  USER_PROFILE as USER_PROFILE_URL,
  CHANGE_PASSWORD as CHANGE_PASSWORD_URL,
  callRequest,
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

function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSignupSuccess(response.data));
        if (responseCallback) responseCallback(true, response.data);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSigninSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
      } else {
        alert(response);
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* signout() {
  while (true) {
    const {responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSignOutSuccess());
        if (responseCallback) responseCallback(true, null);
      } else {
        yield put(userSignOutSuccess());
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      yield put(userSignOutSuccess());
      alert(err);
    }
  }
}

function* getUserProfile() {
  while (true) {
    const {responseCallback} = yield take(USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_PROFILE_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getUserProfileSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}
function* getUSerData() {
  while (true) {
    const {responseCallback} = yield take(GET_USER_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_USER_DATA_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getUSerDataSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* updateUserProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_USER_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.data) {
        yield put(
          updateUserProfileSuccess({
            first_name: payload.first_name,
            phone: payload.phone,
          }),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* forgotPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_FORGOT_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(forgotPasswordSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* verifyOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(VERIFY_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VERIFY_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(verifyOTPSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}
function* requestOTP() {
  while (true) {
    const {payload, responseCallback} = yield take(REQUEST_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REQUEST_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(true, response.data);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err);
    }
  }
}

function* resetPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_RESET_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_RESET_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(resetPasswordSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
        alert(response);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* confirmOTP_FGPASS() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_CONFIRM_OTP_FGPASS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_CONFIRM_OTP_FGPASS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.data) {
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* updatePassword() {
  while (true) {
    const {payload, responseCallback} = yield take(
      USER_UPDATE_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        USER_UPDATE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.data) {
        if (responseCallback) responseCallback(response.data, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* contactAdmin() {
  while (true) {
    const {payload, responseCallback} = yield take(CONTACT_ADMIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONTACT_ADMIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(response.message, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* getProfileSections() {
  while (true) {
    const {responseCallback} = yield take(GET_PROFILE_SECTIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROFILE_SECTIONS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
        yield put(getProfileSectionsSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* postProfileData() {
  while (true) {
    const {payload, responseCallback} = yield take(POST_PROFILE_DATA.REQUEST);
    try {
      const response = yield call(
        callRequest,
        POST_PROFILE_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* deleteProfileSubSectionDataRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DELETE_PROFILE_SUBSECTION_DATA.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_PROFILE_SUBSECTION_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

function* changeUserPassword() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (_.has(response, 'status') && response.status) {
        if (responseCallback) responseCallback(true, null);
        alert(response);
      } else {
        if (responseCallback) responseCallback(null, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err);
    }
  }
}

export default function* root() {
  yield fork(signup);
  yield fork(signout);
  yield fork(signin);
  yield fork(updateUserProfile);
  yield fork(getUserProfile);
  yield fork(forgotPassword);
  yield fork(resetPassword);
  yield fork(verifyOTP);
  yield fork(confirmOTP_FGPASS);
  yield fork(updatePassword);
  yield fork(contactAdmin);
  yield fork(getProfileSections);
  yield fork(postProfileData);
  yield fork(deleteProfileSubSectionDataRequest);
  yield fork(changeUserPassword);
  yield fork(requestOTP);
  yield fork(getUSerData);
}
