// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';

export const NETWORK_INFO = 'NETWORK_INFO';
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const UPDATE_USER_PROFILE = createRequestTypes('UPDATE_USER_PROFILE');
export const GET_USER_DATA = createRequestTypes('GET_USER_DATA');
export const USER_PROFILE = createRequestTypes('USER_PROFILE');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');
export const USER_RESET_PASSWORD = createRequestTypes('USER_RESET_PASSWORD');
export const VERIFY_OTP = createRequestTypes('VERIFY_OTP');
export const REQUEST_OTP = createRequestTypes('REQUEST_OTP');
export const USER_CONFIRM_OTP_FGPASS = createRequestTypes(
  'USER_CONFIRM_OTP_FGPASS',
);

export const SHOULD_CALL_ON_ENTER = createRequestTypes('SHOULD_CALL_ON_ENTER');
export const GET_SHIFTS = createRequestTypes('GET_SHIFTS');
export const GET_ALL_SHIFTS = createRequestTypes('GET_ALL_SHIFTS');
export const GET_SHIFT_DETAILS = createRequestTypes('GET_SHIFT_DETAILS');
export const APPLY_ON_SHIFT = createRequestTypes('APPLY_ON_SHIFT');
export const RESPOND_TO_OFFER = createRequestTypes('RESPOND_TO_OFFER');
export const WITHDRAW_OFFER = createRequestTypes('WITHDRAW_OFFER');
export const CANCEL_SHIFT = createRequestTypes('CANCEL_SHIFT');
export const CHANGE_SHIFT_STATUS = createRequestTypes('CHANGE_SHIFT_STATUS');
export const GET_NOTIFICATIONS_LIST = createRequestTypes(
  'GET_NOTIFICATIONS_LIST',
);
export const MARK_NOTIFICATION_AS_READ = createRequestTypes(
  'MARK_NOTIFICATION_AS_READ',
);

export const MARK_READ_NOTIFICATION = createRequestTypes(
  'MARK_READ_NOTIFICATION',
);

export const GET_MONTHLY_EARNINGS_LIST = createRequestTypes(
  'MONTHLY_EARNINGS_LIST',
);

export const REQUEST_EARLY_PAYMENT = createRequestTypes(
  'REQUEST_EARLY_PAYMENT',
);

export const REVIEWS_LIST = createRequestTypes('REVIEWS_LIST');

export const MARK_ATTENDANCE = createRequestTypes('MARK_ATTENDANCE');
export const USER_UPDATE_PASSWORD = createRequestTypes('USER_UPDATE_PASSWORD');
export const CONTACT_ADMIN = createRequestTypes('CONTACT_ADMIN');
export const GET_SERVICE_TYPES = createRequestTypes('GET_SERVICE_TYPES');
export const GET_NEARBY_SERVICE_PROVIDERS = createRequestTypes(
  'GET_NEARBY_SERVICE_PROVIDERS',
);
export const CLEAR_SERVICE_PROVIDERS_DATA = 'CLEAR_SERVICE_PROVIDERS_DATA';
export const GET_NEWS = createRequestTypes('GET_NEWS');
export const GET_EVENTS = createRequestTypes('GET_EVENTS');
export const GET_MONTLY_EVENTS = createRequestTypes('GET_MONTLY_EVENTS');
export const GET_SEARCH_EVENTS = createRequestTypes('GET_SEARCH_EVENTS');
export const GET_ORGANIZATIONS = createRequestTypes('GET_ORGANIZATIONS');
export const GET_REVIEWS = createRequestTypes('GET_REVIEWS');
export const GET_PROFILE_SECTIONS = createRequestTypes('GET_PROFILE_SECTIONS');
export const POST_PROFILE_DATA = createRequestTypes('POST_PROFILE_DATA');
export const DELETE_PROFILE_SUBSECTION_DATA = createRequestTypes(
  'DELETE_PROFILE_SUBSECTION_DATA',
);
export const GET_ALL_PAY_SLIPS = createRequestTypes('GET_ALL_PAY_SLIPS');

export const EMPTY_SHIFTS_ARRAY = 'EMPTY_SHIFTS_ARRAY';

export const GET_BRAIN_TREE_TOKEN = createRequestTypes('GET_BRAIN_TREE_TOKEN');
export const BRAIN_TREE_PAYMENT = createRequestTypes('BRAIN_TREE_PAYMENT');
export const LOGOUT = 'LOGOUT';

export const EMPTY = createRequestTypes('EMPTY');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const UPDATE_DEVICE_ID = createRequestTypes('UPDATE_DEVICE_ID');
export const CHANGES_ACCEPTED = createRequestTypes('CHANGES_ACCEPTED');
export const GET_PDF_OF_INVOICE = createRequestTypes('GET_PDF_OF_INVOICE');
export const UNREAD_NOTIFICATIONS_COUNT = createRequestTypes(
  'UNREAD_NOTIFICATIONS_COUNT',
);
export const GET_ROLES = createRequestTypes('GET_ROLES');
export const UPLOAD_IMAGE = createRequestTypes('UPLOAD_IMAGE');
