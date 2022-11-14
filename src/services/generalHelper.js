import _ from 'lodash';
import moment, {duration} from 'moment';
import {Actions} from 'react-native-router-flux';
import {walletTabs} from '../components/Tabbar';
import {LOGOUT} from '../actions/ActionTypes';
import {
  TIME_FORMAT2,
  DATE_FORMAT2,
  DATE_TIME,
  TIME_FORMAT1,
  USER_NOTIFICATION_TYPES,
  WALLET,
  DATE_FORMAT7,
  SHIFT,
} from '../constants';

/**
 *
 * @param {String} DateTime ISO String to be converted
 * @param {String} format Expected Format
 */
const ISOToFormat = (DateTime, format) => {
  if (moment(DateTime).format(format) === 'Invalid date') {
    console.warn('Invalid Date');
    return null;
  } else {
    return moment(DateTime).format(format);
  }
};

/**
 *
 * @param {String} DateTime Formatted time
 * @param {String} format Format of given time
 */
const toISOString = (DateTime, format) => {
  return moment(DateTime, format).toISOString();
};

// setTime = (value) => {
//   let time = ISOToFormat(value, TIME_FORMAT1);
//   let date = ISOToFormat(this.state.dateTime, DATE_FORMAT2);

//   let dateTime = `${date} ${time}`;

//   toISOString(dateTime, 'YYYY:MM:DD HH:MM:AA');
// };

const setDateTime = (time, date) => {
  let finalTime = ISOToFormat(time, TIME_FORMAT1);
  let finalDate = ISOToFormat(date, DATE_FORMAT2);
  let finalDateTime = `${finalDate} ${finalTime}`;
  return toISOString(finalDateTime, DATE_TIME);
};

const TimeFromNow = (data) => {
  return moment(data).fromNow();
};

const GetCurrentTimeInISO = () => {
  return moment().toISOString();
};

const getTimeDifference = (from, to = moment()) => {
  from = moment(from);
  return from.diff(to, 'minutes');
};

/**
 *
 * @param {Array} shifts Array of shifts
 * @param {Object} Filters Filters to be applied { state, status, id }
 */
const getShifts = (shifts, {state, status, id, roleId}) => {
  let filteredShifts = _.cloneDeep(shifts);

  if (!_.isUndefined(id)) {
    return _.find(filteredShifts, {id: id});
  }

  if (!_.isNil(state)) {
    filteredShifts = _.filter(filteredShifts, {state: state});
  }

  if (!_.isUndefined(status)) {
    if (_.isArray(status)) {
      filteredShifts = _.filter(filteredShifts, (item) =>
        status.includes(item.status),
      );
    } else {
      filteredShifts = _.filter(filteredShifts, {status: status});
      if (
        status === SHIFT.status.BROWSE ||
        status === SHIFT.status.OFFERED ||
        status === SHIFT.status.APPLIED
      ) {
        filteredShifts = _.filter(filteredShifts, (item) => {
          return moment(item.slot_time).isAfter(moment().add(2, 'hours'));
        });
      }
    }
  }

  if (!_.isUndefined(roleId)) {
    filteredShifts = _.filter(filteredShifts, (item) => {
      return item.role_id.id === roleId;
    });
  }

  return filteredShifts;
};

const getShiftsByRoleId = (shifts, role_id) => {
  let filteredJobs = _.cloneDeep(shifts);

  filteredJobs = _.filter(filteredJobs, (item) => {
    return item.role_id.id === role_id;
  });

  return filteredJobs;
};

const getNumberOfShifts = (slots) => {
  let length = 0;
  !_.isNil(slots) &&
    slots.map((item) => {
      length += item.times.length;
    });

  return length;
};

const upcomingShiftRemainingTime = (slots) => {
  let todaysShift = getShiftByDay(slots, moment());

  let tomorrowsShift = getShiftByDay(slots, moment().add(1, 'day'));
  let bothDaysShifts = todaysShift.concat(tomorrowsShift);
  let recentSlot = bothDaysShifts && getMostRecentSlot(bothDaysShifts);

  return recentSlot;
};

/**
 *
 * @param {Array} shifts Array of shits
 * @param {Object} day A moment object of the day to get shifts of that day
 */
const getShiftByDay = (shifts, day) => {
  let shiftByDay = [];
  shiftByDay = _.filter(shifts, (shift) =>
    moment(day).isSame(shift.day, 'day'),
  );

  return shiftByDay;
};

const getMostRecentSlot = (shifts) => {
  let mostRecentSlot;

  for (let i = 0, j = shifts.length; i < j; i++) {
    let shift = shifts[i];

    for (let index = 0; index < shift.times.length; index++) {
      if (
        moment().isSameOrAfter(shift.times[index].from) &&
        moment().isSameOrBefore(shift.times[index].to)
      ) {
        return null;
      }
    }

    mostRecentSlot = _.find(shift.times, (slot) => {
      let diff = moment(slot.from).diff(moment(), 'minutes');
      if (diff > 0 && diff <= 24 * 60) {
        return diff;
      }
    });

    if (mostRecentSlot) break;
  }

  return mostRecentSlot;
};

const getUpcomingRecentSlot = (shifts) => {
  let mostRecentSlot;
  for (let i = 0, j = shifts.slots.length; i < j; i++) {
    let shift = shifts.slots[i];
    mostRecentSlot = _.find(shift.times, (slot) => {
      let diff = moment(slot.to).diff(moment(), 'minutes');
      if (diff > 0) {
        return diff;
      }
    });

    if (mostRecentSlot) break;
  }

  return mostRecentSlot;
};

/**
 *
 * @param {Array} earnings Array of earnings
 * @param {Object} Filters Filters to be applied { isPaid }
 */
const getEarnings = (earnings, {isCurrentMonth, isPaid}) => {
  let filteredEarnings = _.cloneDeep(earnings);

  if (!_.isNil(isCurrentMonth)) {
    if (isCurrentMonth === true) {
      filteredEarnings = _.filter(
        filteredEarnings,
        (earning) => moment(earning.day).month() === moment().month(),
      );
    } else {
      filteredEarnings = _.filter(filteredEarnings, (earning) => {
        return moment(earning.day).isBefore(moment(), 'month');
      });
    }
  }

  if (!_.isNil(isPaid)) {
    filteredEarnings = _.filter(filteredEarnings, {is_paid: isPaid});
  }

  return filteredEarnings;
};

const navigateActionsOnNotificationTap = (
  data,
  isFreshLaunch = false,
  shouldNavigate = true,
) => {
  let mData = {};
  try {
    //extra data would be coming in case of push notifications while data.data is coming in case of getting notification list from our server
    //this is done because on our server its complicated and time consuming to change the key name from 'data' to 'extra_data' in each item of notification listing
    mData = JSON.parse(_.has(data, 'extraData') ? data.extraData : data.data);
  } catch (e) {
    console.log({notificationException: e});
  }

  switch (data.type) {
    case USER_NOTIFICATION_TYPES.TIMEOUT_REMINDER:
      _.has(mData, 'shift') &&
        _.has(mData, 'slot') &&
        Actions.shiftsDescription({
          shiftID: mData.shift.id,
          slotId: mData.slot.id,
        });
      // Actions.shiftsDescription({shiftID: 5533, slotId: 7903});
      break;
    case USER_NOTIFICATION_TYPES.SHIFT_INVITATION:
      _.has(mData, 'shift') &&
        Actions.shiftsDescription({shiftID: mData.shift.id});
      break;
    case USER_NOTIFICATION_TYPES.CHANGES_ACCEPTED:
      _.has(mData, 'shift') &&
        Actions.shiftsDescription({shiftID: mData.shift.id});
      break;
    case USER_NOTIFICATION_TYPES.SHIFT_ACCEPTED:
      if (_.has(mData, 'shift')) {
        Actions.reset('drawerMenu');
        Actions.shiftsDescription({shiftID: mData.shift.id});
      }
      break;
    case USER_NOTIFICATION_TYPES.SHIFT_REJECTED:
      Actions.jump('notification_tab');
      break;
    case USER_NOTIFICATION_TYPES.SHIFT_NOT_RESPONDED:
      _.has(mData, 'shift') &&
        Actions.shiftsDescription({shiftID: mData.shift.id});
      break;
    case USER_NOTIFICATION_TYPES.USER_REVIEWED:
      _.has(mData, 'role') && Actions.reviewScreen({roleId: mData.role.id});
      break;
    case USER_NOTIFICATION_TYPES.SHIFT_UPDATED:
      _.has(mData, 'shift') &&
        Actions.shiftsDescription({shiftID: mData.shift.id});
      break;
    case USER_NOTIFICATION_TYPES.MARKED_AS_BOOKED:
      _.has(mData, 'shift') &&
        Actions.shiftsDescription({shiftID: mData.shift.id});
      break;
    case USER_NOTIFICATION_TYPES.PAYMENT_READY:
      let selectedTabs = walletTabs;
      selectedTabs.activeTabKey = WALLET.PAY_SLIPS;
      Actions.jump('wallet', {tabs: selectedTabs, dateToReRender: new Date()});
      break;
    case USER_NOTIFICATION_TYPES.SHIFT_CANCELLED:
      //  _.has(mData, 'shift') &&
      Actions.jump('notification_tab');
      break;
    case USER_NOTIFICATION_TYPES.RECONFIRMATION:
      _.has(mData, 'shift') &&
        Actions.shiftsDescription({shiftID: mData.shift.id});
      break;

    case USER_NOTIFICATION_TYPES.CHANNEL_NEW_MESSAGE:
      let shiftId = mData.name.split('_')[0];
      shiftId = shiftId.substring(1);
      const rc_username = mData.name.split('_')[1];
      Actions.rocketChatContainer({
        rc_username,
        shiftId,
      });
      break;

    case USER_NOTIFICATION_TYPES.REQUEST_REJECTED:
      Actions.jump('applicationStatus');
      break;

    case USER_NOTIFICATION_TYPES.REQUEST_ACCEPTED:
      Actions.jump('notification_tab');
      break;

    default: {
      Actions.jump('notification_tab');
    }
  }
};

/**
 *
 * @param {Array} shifts , @param {string} roleId Array of object of shifts & role id
 * @description find if this role id shift exists or not
 * @returns {Boolean}
 */
const isCurrentRoleShiftExist = (shifts = [], roleId) => {
  let filteredShifts = _.cloneDeep(shifts);
  const isExist = filteredShifts.find((obj) => {
    return _.isEqual(obj['role_id'].id, roleId);
  });

  return isExist;
};

/**
 *
 * @param {Array} slots Array of object of shifts with times array in every object
 * @description Takes slots as inout and returns a string of data range or single date
 * @returns {String}
 */
const getShiftDates = (slots) => {
  if (_.isNil(slots) || _.isEmpty(slots)) return;

  let dates = '';

  const startDate = moment(slots[0].day).format(DATE_FORMAT7);
  const endDate = moment(slots[slots.length - 1].day).format(DATE_FORMAT7);
  const totalShifts = slots.length;

  if (totalShifts > 1) {
    dates = `${startDate} - ${endDate} (${totalShifts} Shifts)`;
  } else {
    dates = `${startDate}`;
  }

  return dates;
};

/**
 *
 * @param {Array} slots Array of object of shifts with times array in every object
 * @description Takes slots as inout and returns a string of time range or multiple slots
 * @returns {String}
 */
const getShiftTimeSlots = (slots) => {
  if (_.isNil(slots) || _.isEmpty(slots)) return;
  let time = 'Multiple Time Slots';

  const groups = slots.reduce((groups, slot) => {
    slot.times.forEach((time) => {
      const groupName = time.from.split('T')[1];
      const startTime = time.from;
      const endTime = time.to;

      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push({startTime, endTime});
    });

    return groups;
  }, {});

  const totalSlots = Object.keys(groups).length;

  if (totalSlots < 2) {
    const start = Object.keys(groups).map((time) => groups[time][0].startTime);
    const end = Object.keys(groups).map((time) => groups[time][0].endTime);
    time = `${moment(start[0]).format(TIME_FORMAT1)} - ${moment(end[0]).format(
      TIME_FORMAT1,
    )}`;
  }

  return time;
};

const getOnGoingShift = (ongoingShifts) => {
  if (_.isNil(ongoingShifts) || _.isEmpty(ongoingShifts)) {
    return [];
  }

  let unFinishedSlot = {};

  //IS TIME IN AND NOT TIMED OUT
  for (let i = 0, j = ongoingShifts.length; i < j; i++) {
    let shiftSlots = ongoingShifts[i].slots;
    for (let k = 0, l = shiftSlots.length; k < l; k++) {
      unFinishedSlot = _.find(shiftSlots[k].times, (slot) => {
        if (!_.isNil(slot.time_in) && _.isNil(slot.time_out)) {
          return slot;
        }
      });
      if (unFinishedSlot) {
        unFinishedSlot = {
          ...unFinishedSlot,
          role:
            _.has(ongoingShifts[i], 'role_id') &&
            _.has(ongoingShifts[i].role_id, 'name') &&
            ongoingShifts[i].role_id.name,
          venue_name:
            _.has(ongoingShifts[i], 'venue_id') &&
            _.has(ongoingShifts[i].venue_id, 'name') &&
            ongoingShifts[i].venue_id.name,
          company_name:
            _.has(ongoingShifts[i], 'company') &&
            _.has(ongoingShifts[i].company, 'name') &&
            ongoingShifts[i].company.name,
          shift_id: ongoingShifts[i].id,
        };
        break;
      }
    }
    if (unFinishedSlot) {
      break;
    }
  }

  return unFinishedSlot;
};

const getSlotById = (slots, slotId) => {
  let slot = _.find(
    slots,
    _.flow(_.property('times'), _.partialRight(_.some, {id: slotId})),
  );

  return slot.times[0];
};

export {
  toISOString,
  ISOToFormat,
  getTimeDifference,
  GetCurrentTimeInISO,
  TimeFromNow,
  setDateTime,
  getShifts,
  getEarnings,
  getShiftsByRoleId,
  getNumberOfShifts,
  upcomingShiftRemainingTime,
  navigateActionsOnNotificationTap,
  isCurrentRoleShiftExist,
  getUpcomingRecentSlot,
  getShiftDates,
  getShiftTimeSlots,
  getOnGoingShift,
  getSlotById,
};
