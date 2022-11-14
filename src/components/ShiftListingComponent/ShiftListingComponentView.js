import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './ShiftListingComponentStyles';
import {Colors, Fonts, AppStyles} from '../../theme';
import {
  strings,
  CHECK_IN_VISIBILITY_TIME,
  TIME_FORMAT1,
  SHIFT,
} from '../../constants';
import moment, {duration} from 'moment';
import {ISOToFormat} from '../../services/generalHelper';
import _ from 'lodash';

export default function ShiftListingComponentView(props) {
  const {shiftListing, currentJobTime, isShowingShiftStatusComponent} = props;
  let isBefore = moment(shiftListing.day).isBefore(moment());

  function isNoShow(item) {
    const {to, time_in, time_out} = item;
    let isNoShow = false;

    if (_.isEqual(item.status, SHIFT.status.NO_SHOW)) {
      isNoShow = true;
    } else if (
      moment().isAfter(moment(to)) &&
      _.isNil(time_in) &&
      _.isNil(time_out)
    ) {
      isNoShow = true;
    }
    return isNoShow;
  }

  function renderShiftListingTime(shiftListingTime) {
    return (
      <>
        {shiftListingTime.map((item) => {
          return (
            <View>
              {isNoShow(item) ? (
                <Text style={styles.noneTextStyle}>{`${strings.NO_SHOW}`}</Text>
              ) : (
                !checkIfSlotIsAlreadyStarted(item) && (
                  <Text
                    style={[
                      styles.timeDurationStyle,
                      moment(
                        _.isNil(item.time_out) ? item.from : item.time_out,
                      ).isBefore(moment().toDate()) && styles.pastDateTimeStyle,
                    ]}>
                    {`${ISOToFormat(
                      _.isNil(item.time_in) ? item.from : item.time_in,
                      TIME_FORMAT1,
                    )} - ${ISOToFormat(
                      _.isNil(item.time_out) ? item.to : item.time_out,
                      TIME_FORMAT1,
                    )}`}
                  </Text>
                )
              )}
            </View>
          );
        })}
      </>
    );
  }

  function checkIfSlotIsAlreadyStarted(item) {
    let isAlreadyStarted = false;
    let diffInTime = moment(item.from).diff(moment(), 'minutes');

    if (diffInTime < CHECK_IN_VISIBILITY_TIME && diffInTime > 0) {
      // isAlreadyStarted = true;
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

  function shouldRenderDay(mTimesArr) {
    let shouldShow = false;

    if (mTimesArr.length > 1) {
      shouldShow = true;
    } else {
      if (!isShowingShiftStatusComponent) {
        shouldShow = !checkIfSlotIsAlreadyStarted(mTimesArr[0]);
      }
    }

    return shouldShow;
  }

  function checkIfAllShiftsTimePassed(mTimesArr) {
    let isAllShiftsPassed = false;

    if (mTimesArr.length > 0) {
      let lastItemOfArr = mTimesArr[mTimesArr.length - 1];
      if (!_.isNil(lastItemOfArr.time_out)) {
        isAllShiftsPassed = true;
      }
    }
    return isAllShiftsPassed;
  }

  return shouldRenderDay(shiftListing.times) ? (
    <View>
      <View style={[styles.shiftListingView]}>
        <View style={styles.shiftDayTextStyle}>
          <Text
            style={[
              styles.text,
              checkIfAllShiftsTimePassed(shiftListing.times) &&
                styles.pastDateTimeStyle,
            ]}>
            {`${ISOToFormat(shiftListing.day, 'ddd')}`}
          </Text>
          <Text
            style={[
              styles.text,
              styles.boldText,
              checkIfAllShiftsTimePassed(shiftListing.times) &&
                styles.pastDateTimeStyle,
            ]}>
            {` ${ISOToFormat(shiftListing.day, 'DD')} ${ISOToFormat(
              shiftListing.day,
              'MMM',
            )}`}
          </Text>
        </View>
        <View style={[AppStyles.pTop10, AppStyles.pBottom10]}>
          {!_.isEmpty(shiftListing.times) &&
            renderShiftListingTime(shiftListing.times)}
        </View>
      </View>
    </View>
  ) : (
    <></>
  );
}
