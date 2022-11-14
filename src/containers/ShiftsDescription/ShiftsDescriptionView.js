import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Popover from 'react-native-popover-view';

import {
  CustomNavbar,
  Text,
  ShiftsListsItem,
  MapComponent,
  ShiftsTimeComponent,
  ShiftListingComponent,
  ComfirmationModal,
} from '../../components';
import styles from './ShiftsDescriptionStyles';
import {AppStyles, Colors, Images} from '../../theme';
import {SHIFT, strings, TIME_FORMAT1} from '../../constants';
import {getNumberOfShifts, ISOToFormat} from '../../services/generalHelper';
import _, {forEach} from 'lodash';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {shouldRenderDay} from '../../services/ShiftTimeSheetHelper';

function renderShiftDays(slots, setSelectedSlotDay, selectedDayOfSlot) {
  return (
    <View style={styles.slotsContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={AppStyles.flexRow}>
        {slots &&
          slots.map((slot) => (
            <Popover
              placement="bottom"
              backgroundStyle={{backgroundColor: 'rgba(00,00,00,0.1)'}}
              arrowStyle={styles.arrow}
              onOpenStart={() => {
                setSelectedSlotDay(slot.day);
              }}
              onCloseStart={() => {
                setSelectedSlotDay(null);
              }}
              from={
                <TouchableOpacity style={AppStyles.mRightBase}>
                  <View
                    style={[
                      styles.slotDay,
                      moment(selectedDayOfSlot).isSame(slot.day) &&
                        styles.selectedSlotStyle,
                    ]}>
                    <Text
                      style={[
                        styles.calenderDay,
                        moment(selectedDayOfSlot).isSame(slot.day) &&
                          styles.selectedSlotTextStyle,
                      ]}>
                      {`${ISOToFormat(slot.day, 'ddd')}`}
                    </Text>
                    <Text
                      type="SemiBold"
                      style={[
                        styles.calenderDate,
                        moment(selectedDayOfSlot).isSame(slot.day) &&
                          styles.selectedSlotTextStyle,
                      ]}>
                      {ISOToFormat(slot.day, 'DD')}
                    </Text>

                    <Text
                      style={[
                        styles.calenderMonth,
                        moment(selectedDayOfSlot).isSame(slot.day) &&
                          styles.selectedSlotTextStyle,
                      ]}>
                      {ISOToFormat(slot.day, 'MMM')}
                    </Text>
                  </View>
                  <View style={[AppStyles.flexRow, AppStyles.centerInner]}>
                    {slot.times &&
                      slot.times.map(() => (
                        <View style={styles.timeDot}></View>
                      ))}
                  </View>
                </TouchableOpacity>
              }>
              <View style={styles.popOverStyle}>
                {slot.times &&
                  slot.times.map((time) => (
                    <Text style={[styles.timeSlotText]}>{`${ISOToFormat(
                      time.from,
                      TIME_FORMAT1,
                    )} - ${ISOToFormat(time.to, TIME_FORMAT1)}`}</Text>
                  ))}
              </View>
            </Popover>
          ))}
      </ScrollView>
    </View>
  );
}
function renderBottomButtons(buttonObj) {
  if (!_.isNil(buttonObj))
    return buttonObj.map((item) => {
      return (
        <TouchableOpacity
          onPress={item.button_action}
          style={[styles.buttonStyle, {backgroundColor: item.bgColor}]}>
          <Text type="Bold" color={item.textColor} size="xSmall">
            {item.text}
          </Text>
        </TouchableOpacity>
      );
    });
}

export default function ShiftsDescriptionView(props) {
  const {
    shift,
    currentJobTime,
    isModalVisible,
    modal,
    activeIndex,
    setSelectedSlotDay,
    selectedDayOfSlot,
    loading,
    buttons,
    handleModalVisible,
    gender,
    onRefresh,
    isShiftSlotsLoading,
    shouldVisibleSlotCompletionStatus,
    changesAccepted,
    acceptChangesClickHandler,
    acceptChangesBtnLoading,
  } = props;

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator color={Colors.brand.primary} size={'small'} />
      </View>
    );
  }

  const {slots, shift_uniform, description, venue_id} = shift;

  let shouldShowTimeSheetView = false;
  let isShiftTimeStarted = false;

  if (!_.isEmpty(slots)) {
    for (let index = 0; index < slots.length; index++) {
      shouldShowTimeSheetView = shouldRenderDay(
        slots[index].times,
        shouldShowShiftStatus(),
        currentJobTime,
      );

      if (shouldShowTimeSheetView) break;
    }

    isShiftTimeStarted =
      moment(slots[0].times[0].from).diff(moment(), 'hours') > 0;
  }
  let coordinates = {
    lat: _.has(venue_id, 'lat') ? venue_id.lat : 0,
    lng: _.has(venue_id, 'lng') ? venue_id.lng : 0,
  };

  function shouldShowShiftStatus() {
    if (
      props.availabilityStatus ===
        SHIFT.shiftAttendanceStatus.SHIFT_COMPLETED ||
      props.availabilityStatus === SHIFT.shiftAttendanceStatus.SLOT_COMPLETED
    ) {
      if (shouldVisibleSlotCompletionStatus) return true;
      else return false;
    } else if (
      shift.status === SHIFT.status.UPCOMMING ||
      shift.status === SHIFT.status.ONGOING
    ) {
      return true;
    } else {
      return false;
    }
  }

  function shouldShowChatIcon() {
    switch (shift.status) {
      case SHIFT.status.ONGOING: {
        return true;
      }
      case SHIFT.status.UPCOMMING: {
        let lastSlotIndex = slots.length - 1;
        let lastSlotTimesIndex = slots[lastSlotIndex].times.length - 1;

        if (
          (moment(slots[0].times[0].from).diff(moment(), 'hours') <= 24 &&
            moment(slots[0].times[0].from).diff(moment(), 'hours') > 0) ||
          (moment().diff(moment(slots[0].times[0].from), 'hours') >= 0 &&
            moment(slots[lastSlotIndex].times[lastSlotTimesIndex].to).diff(
              moment(),
              'hours',
            ) >= 0)
        ) {
          return true;
        }
      }
      default: {
        return false;
      }
    }
  }

  return (
    <>
      <CustomNavbar
        title={strings.Shift_Description}
        rightBtnImage={shouldShowChatIcon() ? Images.MessageIcon : ''}
        rightBtnPress={() => {
          shouldShowChatIcon() &&
            Actions.rocketChatContainer({
              rc_username:
                _.has(shift, 'vendor_id') &&
                _.has(shift.vendor_id, 'rc_username') &&
                shift.vendor_id.rc_username,
              vendorAvatar: shift.vendor_image,
              shiftId: shift.id,
            });
        }}
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }>
        <ShiftsListsItem
          shift={shift}
          noOfShifts={getNumberOfShifts(shift.slots)}
          navigateOnPress={false}
          currentJobTime={currentJobTime}
          makeSlotCompletionStatusVisible={shouldVisibleSlotCompletionStatus}
        />
        {/* //will not appear only in upcomming list and past shifts list*/}
        {/* upcoming condition is added on 7th april */}
        {(shift.status === SHIFT.status.OFFERED ||
          shift.status === SHIFT.status.BROWSE ||
          shift.status === SHIFT.status.APPLIED ||
          shift.status === SHIFT.status.UPCOMMING) &&
          renderShiftDays(slots, setSelectedSlotDay, selectedDayOfSlot)}

        {!_.isNil(currentJobTime) &&
          !isShiftSlotsLoading &&
          shouldShowShiftStatus() && (
            <View style={styles.shiftTimeView}>
              <ShiftsTimeComponent
                shift={shift}
                shiftSlots={slots}
                shiftStatus={props.availabilityStatus}
                slotObj={currentJobTime}
              />
            </View>
          )}

        {slots &&
          (shift.status === SHIFT.status.UPCOMMING ||
            (shift.status === SHIFT.status.PAST &&
              shift.state === SHIFT.state.COMPLETED) ||
            shift.status === SHIFT.status.ONGOING) && ( //will only appear in upcomming, past,ongoing
            <>
              <View style={styles.ShiftListingView}>
                <View
                  style={
                    shouldShowTimeSheetView && styles.ShiftListingBackground
                  }>
                  <FlatList
                    data={slots}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({index, item}) => {
                      return (
                        <>
                          <ShiftListingComponent
                            shiftListing={item}
                            currentJobTime={currentJobTime}
                            isShowingShiftStatusComponent={shouldShowShiftStatus()}
                          />
                          {slots.length - 1 !== index &&
                            shouldShowTimeSheetView && (
                              <View style={styles.horizontalLine}></View>
                            )}
                        </>
                      );
                    }}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
            </>
          )}

        {/* to here*/}
        <View style={styles.detailWraper}>
          <View style={{...AppStyles.paddingHorizontalBase}}>
            <Text type="Bold" style={styles.detailHeading}>
              {strings.UNIFORM}
            </Text>

            {!_.isNil(shift_uniform) && !_.isEmpty(shift_uniform) && (
              <Text style={styles.detailText}>{shift_uniform[0][gender]}</Text>
            )}

            <Text type="Bold" style={styles.detailHeading}>
              {strings.VENUE}
            </Text>

            <Text style={styles.detailText}>
              {_.has(venue_id, 'name') && venue_id.name}
            </Text>

            <Text type="Bold" style={styles.detailHeading}>
              {strings.ADDRESS}
            </Text>

            <Text style={styles.detailText}>
              {_.has(venue_id, 'address') && venue_id.address}
            </Text>
          </View>

          <View style={styles.map}>
            <MapComponent coordinates={coordinates} />
          </View>

          <View style={{...AppStyles.paddingHorizontalBase}}>
            <Text type="Bold" style={styles.detailHeading}>
              {strings.JOB_DESCRIPTION}
            </Text>

            <Text style={styles.detailText}>{description}</Text>
          </View>
        </View>

        <View style={[styles.acceptBtnSecViewStyle]}>
          {changesAccepted === false &&
            shift.status === SHIFT.status.UPCOMMING && (
              <TouchableOpacity
                onPress={() => {
                  acceptChangesBtnLoading == false &&
                    acceptChangesClickHandler();
                }}
                style={[
                  styles.buttonStyle,
                  {backgroundColor: Colors.brand.primary},
                ]}>
                {acceptChangesBtnLoading ? (
                  <ActivityIndicator color={Colors.white} size={'small'} />
                ) : (
                  <Text type="Bold" color={Colors.text.tertiary} size="xSmall">
                    Accept Changes
                  </Text>
                )}
              </TouchableOpacity>
            )}
        </View>

        <View style={styles.bottomSecViewStyle}>
          {_.isEqual(shift.status, SHIFT.status.UPCOMMING)
            ? isShiftTimeStarted && renderBottomButtons(buttons[shift.status])
            : renderBottomButtons(buttons[shift.status])}
        </View>

        {isModalVisible && (
          <ComfirmationModal
            isModalVisible={isModalVisible}
            modal={modal()[shift.status]}
            handleModalVisible={handleModalVisible}
          />
        )}
      </ScrollView>
    </>
  );
}
