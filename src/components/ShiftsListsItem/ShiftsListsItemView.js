import _ from 'lodash';
import React from 'react';
import {View, Image as RnImage, TouchableOpacity, Image} from 'react-native';
import moment, {duration} from 'moment';
import {Text} from '..';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {DATE_FORMAT2, strings, SHIFT, TIME_FORMAT1} from '../../constants';
import styles from './ShiftsListsItemStyles';
import {
  ISOToFormat,
  upcomingShiftRemainingTime,
  getUpcomingRecentSlot,
  getShiftDates,
  getShiftTimeSlots,
} from '../../services/generalHelper';
import {Actions} from 'react-native-router-flux';

export default function ShiftsListsItemView(props) {
  const {
    shift,
    navigateOnPress,
    noOfShifts,
    recentSlotText,
    currentJobTime,
    makeSlotCompletionStatusVisible,
  } = props;

  if (_.isNil(shift)) {
    return false;
  }

  function renderPastJobStatus(mShift) {
    let isJobCompleted =
      (mShift.state === SHIFT.state.COMPLETED ||
        _.isEqual(mShift.status, SHIFT.status.REVIEW_PENDING)) &&
      true;
    let isNoShow = _.isEqual(mShift.status, SHIFT.status.NO_SHOW);

    return (
      <View
        style={[
          styles.shiftStatusSecViewStyle,
          !isNoShow && !isJobCompleted && AppStyles.mBottom10,
          {
            backgroundColor:
              isJobCompleted && !isNoShow ? Colors.text.green : Colors.text.red,
          },
        ]}>
        <Text style={styles.shiftStatusStyle}>
          {isNoShow && `${strings.MARKED_AS_NO_SHOW}`}
          {!isNoShow && isJobCompleted && strings.SHIFT_SUCCESSFULLY_COMPLETED}
          {!isNoShow &&
            !isJobCompleted &&
            `${strings.YOU_HAVE} ${mShift.state} ${strings.THIS_SHIFT}`}
        </Text>
      </View>
    );
  }

  function renderStartingInHoursSection() {
    return (
      shift.status !== SHIFT.status.PAST &&
      shift.status !== SHIFT.status.NO_SHOW &&
      shift.status !== SHIFT.status.REVIEW_PENDING &&
      shift.status !== SHIFT.status.ONGOING &&
      !_.isEmpty(recentSlotText) && (
        <Text type="SemiBold" style={[styles.timeWraperHours]}>
          {!_.isEmpty(recentSlotText) && recentSlotText}
        </Text>
      )
    );
  }
  return (
    <>
      <TouchableOpacity
        disabled={!navigateOnPress}
        activeOpacity={!navigateOnPress ? 1 : 0.9}
        onPress={() => {
          Actions.shiftsDescription({shiftID: shift.id});
        }}
        style={styles.container}>
        {shift.vendor_image && (
          <View>
            <Image
              source={{uri: shift.vendor_image}}
              style={{width: 60, height: 60}}
              resizeMode={'contain'}
            />
          </View>
        )}

        <View style={styles.timeWraper}>
          <Text
            type="Bold"
            style={[styles.timeWraperHeading]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {`${
              _.has(shift.role_id, 'display_name')
                ? `${shift.role_id.display_name} @`
                : ''
            } ${
              _.has(shift.company, 'name')
                ? _.startCase(shift.company.name)
                : ''
            }`}
          </Text>

          <Text style={[styles.timeWraperTiming]}>
            {getShiftDates(shift.slots)}
          </Text>

          <Text style={[styles.timeWraperMultiTime]}>
            {getShiftTimeSlots(shift.slots)}
          </Text>

          {(shift.status === SHIFT.status.PAST ||
            shift.status === SHIFT.status.REVIEW_PENDING ||
            shift.status === SHIFT.status.NO_SHOW) &&
            navigateOnPress && (
              <Text
                type="SemiBold"
                style={[
                  styles.shiftStateTextStyle,
                  (shift.state !== SHIFT.state.COMPLETED ||
                    shift.status === SHIFT.status.NO_SHOW) && {
                    color: Colors.text.red,
                  },
                ]}>
                {_.startCase(
                  shift.status !== SHIFT.status.NO_SHOW
                    ? shift.state
                    : `${strings.MARKED_AS_NO_SHOW}`,
                )}
              </Text>
            )}

          {renderStartingInHoursSection()}
        </View>

        <View style={styles.paymentView}>
          <Text type="Bold" style={[styles.footerPriceNum]}>
            {`${shift.hourly_rate}`}
          </Text>
          <Text
            style={styles.footerPrice}>{`${strings.AED}/${strings.HR}`}</Text>
        </View>
      </TouchableOpacity>

      {(shift.status === SHIFT.status.PAST ||
        shift.status === SHIFT.status.REVIEW_PENDING ||
        shift.status === SHIFT.status.NO_SHOW) &&
        !navigateOnPress &&
        !makeSlotCompletionStatusVisible &&
        renderPastJobStatus(shift)}
    </>
  );
}
