import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import moment, {duration} from 'moment';
import _ from 'lodash';
import {Text} from '..';
import styles from './ShiftCheckListItemStyles';
import {Colors, Fonts, AppStyles} from '../../theme';
import {strings, DATE_FORMAT2, TIME_FORMAT1} from '../../constants';

export default function ShiftCheckListItemView(props) {
  const {ShiftCheckLists, handleClickCheckbox, index} = props;
  function renderTimeScheduleView() {
    return ShiftCheckLists.slots.map((item) => {
      return (
        <View style={styles.timeScheduleSec}>
          <Text style={styles.dayTimeTextStyle}>
            {moment(item.day).format(DATE_FORMAT2)}
          </Text>
          <View>
            {item.times.map((timeSlot) => {
              return (
                <View style={styles.timingsSec}>
                  <Text style={styles.dayTimeTextStyle}>
                    {`${moment(timeSlot.from).format(TIME_FORMAT1)} - ${moment(
                      timeSlot.to,
                    ).format(TIME_FORMAT1)}`}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      );
    });
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        handleClickCheckbox(index);
      }}>
      <View style={styles.container}>
        <View style={styles.checkboxVIew}>
          <View
            style={
              !ShiftCheckLists.isClicked
                ? styles.checkbox
                : styles.clickedCheckbox
            }></View>
        </View>

        <View style={styles.textView}>
          <Text style={styles.heading} type="Bold">
            {ShiftCheckLists.heading}
          </Text>
          {ShiftCheckLists.isSlotDescription ? (
            renderTimeScheduleView()
          ) : (
            <Text style={styles.description}>
              {`${ShiftCheckLists.description}`}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
