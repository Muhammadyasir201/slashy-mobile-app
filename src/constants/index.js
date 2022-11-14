import LocalizedStrings from 'react-native-localization';
import _ from 'lodash';

export const appVersion = 'Version: 0.30.0';

export const strings = new LocalizedStrings({
  en: {
    PASSWORD_LENGTH: 'Password length should be greater than 5',
    ENTER_VALID_EMAIL: 'Please Enter Valid Email',
    NEED_MONEY_NOW:
      'Need money now? Our team will be in touch with you within 48 hours to get you paid faster!',
    STAY_LOGGED_IN: 'Stay logged in',
    FORGOT_PASSWORD: 'Forgot password',
    NO_SHOW: 'No Show',
    FORGOT_YOUR_PASSWORD: 'Forgot your password?',
    DONT_HAVE_AN_ACCOUNT: 'Dont have an account?',
    REGISTER: 'Register',
    SIGNUP: 'Submit',
    SIGNIN: 'Login',
    SUBMIT: 'Submit',
    DID_SOMEONE_FORGET_THEIR_PASSWORD: 'Did someone forget their password?',
    THATS_OK: "That's ok...",
    DESCRIPTION:
      "Just enter the email address you've used to register with us and we'll send you a reset link",
    Next_Pay_Day: 'Next Pay Day',
    This_Month: 'This Month',
    AED: 'AED',
    HR: 'hr',
    TODAY: 'Today',
    Roles: 'Roles',
    Upcoming_Shifts: 'Upcoming Shifts',
    Past_Shifts: 'Past Shifts',
    UPCOMING: 'Bookings',
    PAST: 'Past',
    CONTINUE: 'Continue',
    OLD_PASS_ERROR: `Old Password is required`,
    NEW_PASS_ERROR: `New Password is required`,
    RE_TYPE_NEW_PASS_ERROR: `Re type Password is required`,
    PASS_NOT_EQUAL_ERROR: `New password and re-type password should be same`,
    Offers: 'Offers',
    MONTHLY_EARNINGS: 'Monthly Earnings',
    PAY_SLIPS: 'Payslips',
    Browse: 'Browse',
    Applied: 'Applied',
    Shift_Description: 'Shift Details',
    SHIFT_DETAILS: 'Shift Details',
    Get_Directions: 'Get Directions',
    EMAIL_ID: 'Email ID',
    VALID_EMAIL_ERROR: 'Please enter a valid email address',
    PLEASE_PROVIDE_NEW_PASSWORD:
      'Your new password cannot be same as old password',
    MY_SHIFTS: 'My Shifts',
    ONGOING_SHIFTS: 'Ongoing Shift',
    WALLET: 'Wallet',
    SEARCH: 'Search',
    NOTIFICATIONS: 'Notifications',
    PROFILE: 'Profile',
    RATE_APP: 'Rate App',
    SHARE_APP: 'Share App',
    PRIVACY_POLICY: 'Privacy Policy',
    TERMS_OF_USE: 'Terms of Use',
    CHANGE_PASSWORD: 'Change my password',
    LOGOUT: 'Logout',
    NEW_USER_MESSAGE:
      'Seems like you are new here. You haven’t completed your first job. Browse through job section to land your first job.',
    YOU_DONT_HAVE_ANY_UPCOMING:
      'You don’t have any upcoming jobs. Browse through job section to land your next job.',
    YOU_DONT_HAVE_OFFER:
      'You don’t have any offers from Employer. Browse through job section to apply.',
    DONT_APPLIED_FOR_JOB:
      'You haven’t applied for job. Please browse through job section to apply.',
    BROWSE_JOBS: 'Browse Jobs',
    UNIFORM: 'Uniform',
    VENUE: 'Venue',
    ADDRESS: 'Address',
    JOB_DESCRIPTION: 'Job Description',
    REJECT: 'Reject',
    ACCEPT: 'Accept',
    NO_UPCOMING_SHIFT: 'No upcoming shifts',
    NO_PAST_SHIFT: 'No past shifts',
    NO_SHIFT_FOUND: 'No shifts found',
    NO_EARNINGS_FOUND: 'No earnings found',
    NO_REVIEWS_FOUND: 'No Reviews Found',
    REVIEW: 'Review',
    MULTIPLE_TIME_SLOTS: 'Multiple Time Slots',
    NO_MONTHLY_EARNINGS: 'You have not completed any shift in this month.',
    NO_PAY_SLIPS: 'You have not completed any shift in previous months',
    YOU_HAVE_CANCELLED_THIS_SHIFT: 'You have cancelled this shift',
    SHIFT_SUCCESSFULLY_COMPLETED: 'Shift was successfully completed',
    YOU_HAVE: 'You have',
    MARKED_AS_NO_SHOW: 'No Show',
    THIS_SHIFT: 'this shift',
    EMAIL_ID: 'Email ID',
    VALID_EMAIL_ERROR: 'Please enter a valid email address',
    MY_PAY: 'My Pay',
    REQUEST_EARLY_PAYMENT: 'Request Early Payment',
    OVERDUE: 'Overdue',
    DURATION: 'Duration',
    notificationDescription:
      'Your Application for waiter @ Kitchen Joys has been accepted.',
    notificationTime: '14 hours ago',
    RECENT: 'Recent',
    EARLIER: 'Earlier',
    CHAT: 'Chat',
    WAITERSTAFF_JOBS: 'Waitstaff Jobs',
    BARTENDER_JOBS: 'Bartender Jobs',
    COOKING_JOBS: 'Cooking Jobs',
    CANCEL: 'Cancel',
    OK: 'OK',
    YES: 'Yes',
    NO: 'No',
    CONFIRM: 'Confirm',
    TIME_SCHEDULE: 'Time Schedule',
    PASSWORD_LENGTH_ERROR: `Length should not be less than 6 characters`,
    ALL_FIELDS_NEEDS_TO_SELECT: 'Please select all options to continue.',
    PASSWORD_MATCH_ERROR: `Passwords don't match.`,
    REQUEST_EARLY_PAYMENT: 'Request Early Payment',
    REQUEST_SENT: 'Request Sent',
    PASSWORD_RECOVERY: 'Password Recovery',
    NEW_PASSWORD: 'New Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    RESET: 'Reset',
    VARIFICATION_CODE: 'Verification Code',
    CODE: 'Code',
    SHIFT: 'Shift',
    OTP_Text: 'Enter four digit OTP send on your registered mail',
    enterCode: 'Enter 4 digits code',
    PDF_UNABLE_TO_OPEN: 'Unable to open this pdf file',
    NO_OVERDUE_EARNINGS_FOUND: `You don't have any overdue earnings.`,
    INTERNET_IS_NOT_AVAILABLE: `Please connect to the working internet`,
    ZERO: `0.00`,
    PASSWORD_SHOULD_CONTAIN_ONE_CAPITAL_LETTER:
      'Password should contain one capital letter ',
    INCORRECT_OLD_PASSWORD: 'Old password is incorrect',
    androidAppLink: 'https://play.google.com/store/apps/details?id=com.slashy',
    iosAppLink: 'https://apps.apple.com/app/slashy-be-the-shift/id1554992061',
    shift_not_available: 'Shift no longer exists.',
  },
});

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;

// date time formats
export const DATE_FORMAT1 = 'MMMM Do, YYYY';
export const DATE_FORMAT2 = 'ddd DD MMM';
export const DATE_FORMAT3 = 'YYYY-MM-DD';
export const DATE_FORMAT7 = 'ddd D MMM';
export const DATE_FORMAT5 = 'ddd MMM YYYY';
export const DATE_FORMAT6 = 'MMM DD, YYYY';
export const TIME_FORMAT1 = 'h:mm A';
export const TIME_FORMAT2 = 'h:mm a';
export const TIME_FORMAT3 = 'HH : mm : ss';
//check in available time in minutes
export const CHECK_IN_VISIBILITY_TIME = 20;

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

export const NOTIFICATION_CHANNEL = {
  id: 'slashy-channel',
  name: 'Slashy Notifications',
};

export const NOTIFICATION_PERMISSION_DENIED_ERROR =
  'Please allow notifications and get notified timely';

export const USER_NOTIFICATION_TYPES = {
  SHIFT_INVITATION: 'shift_invitation',
  SHIFT_ACCEPTED: 'shift_accepted',
  SHIFT_REJECTED: 'shift_rejected',
  SHIFT_NOT_RESPONDED: 'shift_not_responded',
  USER_REVIEWED: 'user_reviewed',
  SHIFT_UPDATED: 'shift_updated',
  PAYMENT_READY: 'payment_ready',
  SHIFT_CANCELLED: 'shift_cancelled',
  CHANNEL_NEW_MESSAGE: 'CHANNEL_NEW_MESSAGE',
  TIMEOUT_REMINDER: 'timeout_reminder',
  MARKED_AS_BOOKED: 'marked_as_booked',
  CHANGES_ACCEPTED: 'changes_accepted',
  RECONFIRMATION: 'reconfirmation',
  REQUEST_ACCEPTED: 'request_accepted',
  REQUEST_REJECTED: 'request_rejected',
};

export const WALLET = {
  INVOICE: 'invoice',
  PAY_SLIPS: 'payslips',
};

export const SHIFT = {
  state: {
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  },
  status: {
    APPLIED: 'applied',
    OFFERED: 'offered',
    UPCOMMING: 'upcoming',
    ONGOING: 'ongoing',
    PAST: 'past',
    BROWSE: 'browse',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled',
    WITHDRAW: 'withdraw',
    NO_SHOW: 'no_show',
    REVIEW_PENDING: 'review_pending',
  },
  buttons: {
    ACCEPT: 'Accept',
    REJECT: 'Reject',
    APPLY: 'Apply',
    WITHDRAW: 'Withdraw',
    CANCEL_SHIFT: 'Cancel Shift',
  },
  shiftAttendanceStatus: {
    TIME_IN: 'Time In',
    TIME_OUT: 'Time Out',
    SHIFT_COMPLETED: 'Shift Completed',
    SLOT_COMPLETED: 'Slot Completed',
  },
  checkedInStatus: {
    CLOCK_IN: 'Clocked In',
    FINISH_TIME: 'Shift Finish at',
    CLOCK_OUT: 'Clocked Out',
  },
};

export const ShiftCheckLists = (data, gender) => {
  return [
    {
      heading: strings.TIME_SCHEDULE,
      description: ``,
      isClicked: false,
      isSlotDescription: true,
      slots: data.slots,
    },
    {
      heading: strings.UNIFORM,
      description:
        !_.isNil(data.shift_uniform) && !_.isNil(gender)
          ? data.shift_uniform[0][gender]
          : '-',

      isClicked: false,
    },
    {
      heading: strings.JOB_DESCRIPTION,
      description: _.has(data, 'description') ? data.description : '-',
      isClicked: false,
    },
    {
      heading: strings.VENUE,
      description:
        _.has(data, 'venue_id') &&
        _.has(data.venue_id, 'name') &&
        data.venue_id.name,
      isClicked: false,
    },
  ];
};

export const IMAGE_MAX_WIDTH = 300;
export const IMAGE_MAX_HEIGHT = 300;
export const imagesTypes = ['jpg', 'jpeg', 'png'];
