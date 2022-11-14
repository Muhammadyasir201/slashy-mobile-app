import {CHECK_IN_VISIBILITY_TIME} from '../constants';
import _ from 'lodash';
import moment from 'moment';

function shouldRenderDay(
  mTimesArr,
  isShowingShiftStatusComponent,
  currentJobTime,
) {
  let shouldShow = false;

  if (mTimesArr.length > 1) {
    shouldShow = true;
  } else {
    if (!isShowingShiftStatusComponent) {
      shouldShow = !checkIfSlotIsAlreadyStarted(mTimesArr[0], currentJobTime);
    }
  }

  return shouldShow;
}

function checkIfSlotIsAlreadyStarted(item, currentJobTime) {
  let isAlreadyStarted = false;
  let diffInTime = moment(item.from).diff(moment(), 'minutes');

  if (diffInTime < CHECK_IN_VISIBILITY_TIME && diffInTime > 0) {
    isAlreadyStarted = false;
  }
  if (
    !_.isNil(currentJobTime) &&
    moment(currentJobTime.from).isSameOrAfter(item.from) &&
    moment(currentJobTime.to).isSameOrBefore(item.to)
  ) {
    isAlreadyStarted = true;
  }

  if (!_.isNil(item.time_out)) {
    isAlreadyStarted = false;
  }

  return isAlreadyStarted;
}

export {shouldRenderDay};
