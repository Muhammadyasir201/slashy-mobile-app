import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import moment, {duration} from 'moment';
import {Colors} from '../../theme';
import {Text} from '..';
import {AppStyles, Images} from '../../theme';
import {DATE_FORMAT7, strings} from '../../constants';
import util from '../../util';
import styles from './EarningListItemStyles';

export default function EarningListItemView(props) {
  const {listItem, onPdfIconClick, loadingPdfId} = props;
  const {shift} = listItem;

  function renderPdfIcon() {
    return (
      <View style={[AppStyles.flex, AppStyles.alignItemsFlexEnd]}>
        {!_.isEqual(loadingPdfId, listItem.id) && (
          <TouchableOpacity
            onPress={() => {
              try {
                _.has(listItem, 'pdf') &&
                !_.isNil(listItem.pdf) &&
                !_.isEmpty(listItem.pdf)
                  ? Linking.openURL(listItem.pdf).catch((err) => {
                      util.topAlertError(strings.PDF_UNABLE_TO_OPEN);
                    })
                  : onPdfIconClick(listItem.id);
              } catch (exception) {
                util.topAlertError(strings.PDF_UNABLE_TO_OPEN);
              }
            }}
            style={{...AppStyles.centerInner}}>
            <Image source={Images.PdfIcon} />
          </TouchableOpacity>
        )}

        {_.isEqual(loadingPdfId, listItem.id) && (
          <ActivityIndicator
            color={Colors.brand.primary}
            animating
            size="small"
          />
        )}
      </View>
    );
  }

  function renderDurationHoursAndMins() {
    return (
      <View style={[AppStyles.flex, AppStyles.alignItemsFlexEnd]}>
        <Text style={[styles.orderDuration, styles.mLineHeight20]}>
          {strings.DURATION}
        </Text>
        <Text
          style={[styles.orderHour, styles.mLineHeight20]}
          type="Bold"
          size="xSmall">
          {!_.isNil(listItem.hours_worked) &&
            `${parseFloat(listItem.hours_worked).toFixed(2)} Hours`}
        </Text>
      </View>
    );
  }

  function renderJobInfo() {
    let parsedAmount =
      _.has(listItem, 'amount') && !_.isNil(listItem.amount)
        ? parseFloat(listItem.amount)
        : 0;

    return (
      <View style={[AppStyles.flex]}>
        <Text style={[styles.orderDate, styles.mLineHeight20]}>
          {_.has(shift, 'start') &&
          _.has(shift, 'end') &&
          moment(shift.start).isSame(shift.end)
            ? `${util.getFormattedDateTime(shift.start, DATE_FORMAT7)}`
            : `${util.getFormattedDateTime(
                shift.start,
                DATE_FORMAT7,
              )} - ${util.getFormattedDateTime(shift.end, DATE_FORMAT7)}`}
        </Text>

        <View>
          <Text
            style={[styles.orderName, styles.mLineHeight20]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {`${
              _.has(listItem, 'role') && _.has(listItem.role, 'display_name')
                ? listItem.role.display_name
                : `-`
            } @ ${
              _.has(listItem, 'company') && _.has(listItem.company, 'name')
                ? _.startCase(listItem.company.name)
                : '-'
            }`}
          </Text>
        </View>
        <Text
          style={[
            styles.orderPrice,
            AppStyles.flex,
            styles.mLineHeight20,
            parsedAmount < 0 && {
              color: Colors.red,
            },
          ]}
          type="Bold">
          {`${strings.AED} ${parsedAmount.toFixed(2)}`}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.orderWraper]}>
      <View>{renderJobInfo()}</View>

      {listItem.hours_worked &&
        !listItem.is_paid &&
        renderDurationHoursAndMins()}

      {listItem.is_paid && renderPdfIcon()}
    </View>
  );
}
