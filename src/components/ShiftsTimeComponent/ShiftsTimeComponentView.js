import React from 'react';
import {View, Image as RnImage, TouchableOpacity, Image} from 'react-native';
import {Text} from '..';
import styles from './ShiftsTimeComponentStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings, SHIFT, TIME_FORMAT1} from '../../constants';
import util from '../../util';
import {ISOToFormat} from '../../services/generalHelper';
import {Actions} from 'react-native-router-flux';

export default function ShiftsTimeComponentView(props) {
  const {slotObj, shift, shiftStatus} = props;
  let isTimeIn = false,
    isTimeOut = false,
    isCompleted = false,
    isSlotCompleted = false;

  if (shiftStatus === SHIFT.shiftAttendanceStatus.TIME_IN) {
    isTimeIn = true;
  } else if (shiftStatus === SHIFT.shiftAttendanceStatus.TIME_OUT) {
    isTimeOut = true;
  } else if (shiftStatus === SHIFT.shiftAttendanceStatus.SHIFT_COMPLETED) {
    isCompleted = true;
  } else if (shiftStatus === SHIFT.shiftAttendanceStatus.SLOT_COMPLETED) {
    isSlotCompleted = true;
  }

  function renderShiftStatusView() {
    return (
      <TouchableOpacity
        style={styles.timeView}
        onPress={() => {
          (isTimeIn || isTimeOut) &&
            Actions.qrCode({
              shift: shift,
              isTimeIn: isTimeIn,
              slotId: slotObj.id,
              shiftStatus: shiftStatus,
            });
        }}>
        {(isTimeIn || isTimeOut) && (
          <>
            <Image source={Images.TimeIcon} />
          </>
        )}

        {shift.state === SHIFT.state.COMPLETED && (
          <View style={styles.shiftCompletedSecView}>
            <Image
              style={styles.imageStyle}
              source={Images.ShiftCompletedIcon}
            />
            <Text
              style={
                styles.shiftCompletedTextStyle
              }>{` ${strings.SHIFT}`}</Text>
          </View>
        )}

        <Text style={[styles.timeInText]}>
          {`${isTimeIn ? SHIFT.shiftAttendanceStatus.TIME_IN : ''}`}
          {`${isTimeOut ? SHIFT.shiftAttendanceStatus.TIME_OUT : ''}`}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderShiftTimingView() {
    return (
      <View style={styles.day_time_View}>
        <View style={styles.dayView}>
          <Text style={styles.todayText} type="SemiBold">
            {strings.TODAY}
          </Text>
        </View>
        <View style={styles.timingSecView}>
          <View>
            {(isTimeOut || isCompleted || isSlotCompleted) && (
              <Text
                style={[
                  styles.checkInStatusTextStyle,
                  !util.isPlatformAndroid() ? {...AppStyles.mBottom5} : '',
                ]}>
                {isTimeOut || isCompleted || isSlotCompleted
                  ? `${SHIFT.checkedInStatus.CLOCK_IN}`
                  : ''}
              </Text>
            )}
            <Text style={styles.timeTextStyle}>
              {isTimeIn && `${ISOToFormat(slotObj.from, TIME_FORMAT1)} - `}
              {(isTimeOut || isCompleted || isSlotCompleted) &&
                `${ISOToFormat(slotObj.time_in, TIME_FORMAT1)} - `}
            </Text>
          </View>
          <View>
            {(isTimeOut || isCompleted || isSlotCompleted) && (
              <Text
                style={[
                  styles.checkInStatusTextStyle,
                  !util.isPlatformAndroid() ? {...AppStyles.mBottom5} : '',
                ]}>
                {isTimeOut ? `${SHIFT.checkedInStatus.FINISH_TIME}` : ''}
                {isCompleted || isSlotCompleted
                  ? `${SHIFT.checkedInStatus.CLOCK_OUT}`
                  : ''}
              </Text>
            )}
            <Text style={styles.timeTextStyle}>
              {(isTimeIn || isTimeOut) &&
                `${ISOToFormat(slotObj.to, TIME_FORMAT1)}`}
              {(isCompleted || isSlotCompleted) &&
                `${ISOToFormat(slotObj.time_out, TIME_FORMAT1)}`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.shiftTimeView}>
      {renderShiftTimingView()}
      {renderShiftStatusView()}
    </View>
  );
}
