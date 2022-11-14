import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {CustomNavbar, ShiftsListsItem, Text} from '../../components';
import styles from './MyProfileStyles';
import {Colors, AppStyles, Images, Metrics} from '../../theme';
import {DATE_FORMAT1, DATE_FORMAT2, strings} from '../../constants';
import {Rating} from 'react-native-ratings';
import {ISOToFormat, getNumberOfShifts} from '../../services/generalHelper';
import util from '../../util';

function renderFinancialStats(user) {
  return (
    <View style={styles.dateWraper}>
      <Image source={Images.CalendarIcon} />

      <View style={[AppStyles.flex, AppStyles.paddingHorizontalBase]}>
        <Text style={[styles.nextPayDayText, styles.mLineHeight20]}>
          {strings.Next_Pay_Day}
        </Text>
        <Text type="Bold" style={styles.data}>
          {ISOToFormat(user.next_pay_day, DATE_FORMAT1)}
        </Text>
      </View>

      <View>
        <Text style={[styles.monthText, styles.mLineHeight20]}>
          {strings.This_Month}
        </Text>
        <Text type="Bold" style={styles.price}>
          {`${strings.AED} `}
          <Text color={Colors.brand.primary} style={styles.priceNumber}>
            {_.has(user, 'month_total') && !_.isNaN(user.month_total)
              ? parseFloat(user.month_total).toFixed(2)
              : strings.ZERO}
          </Text>
        </Text>
      </View>
    </View>
  );
}

function renderDescription(user) {
  const {description} = user;

  return (
    <View style={styles.descriptionView}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

function renderRolesSection(user) {
  return (
    <View style={styles.rolesWraper}>
      <Text type="Bold" style={styles.heading}>
        {strings.Roles}
      </Text>

      <View style={styles.bg}>
        <FlatList
          data={user.roles}
          keyExtractor={(item, index) => item.id}
          renderItem={(role) => renderRoles(role)}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.border}></View>}
        />
      </View>
    </View>
  );
}

function renderRoles({index, item}) {
  return (
    <View style={styles.imgView}>
      <View style={styles.imgWraper}>
        <Image
          source={{uri: item.image}}
          resizeMode={'contain'}
          style={styles.imageStyle}
        />
        <Text style={styles.barBackText} type="Bold">
          {item.display_name}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.ratingView}
        onPress={() => {
          item.rating.total > 0
            ? Actions.reviewScreen({roleId: item.id})
            : util.topAlert(strings.NO_REVIEWS_FOUND);
        }}>
        <View style={styles.ratingWraper}>
          <Text style={styles.ratingNum}>{`${
            _.isNil(item.rating.avg) ? 0 : item.rating.avg.toFixed(1)
          }`}</Text>
          <Rating
            startingValue={item.rating.avg}
            imageSize={10}
            readonly={true}
          />
        </View>
        <Text style={styles.review}>{`(${
          _.isNil(item.rating.total) ? 0 : item.rating.total
        } ${item.rating.total > 1 ? `Reviews` : `Review`})`}</Text>
      </TouchableOpacity>
    </View>
  );
}

function renderUpcomingShifts(upcomingShifts) {
  return (
    <View style={styles.footer}>
      <Text type="Bold" style={styles.heading}>
        {strings.Upcoming_Shifts}
      </Text>

      <FlatList
        data={upcomingShifts}
        keyExtractor={(item, index) => item.id}
        renderItem={({index, item}) => (
          <ShiftsListsItem
            shift={item}
            noOfShifts={getNumberOfShifts(item.slots)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default function MyProfileView(props) {
  const {user, upcomingShifts, loading, upcomingShiftsLoading} = props;
  return (
    <>
      <CustomNavbar
        // title={_.has(user, 'name') ? user.name : '-'}
        hasBack={false}
        hasBorder={false}
        isBigTitle={true}
        leftBtnPress={() => {
          Actions.drawerOpen();
        }}
        leftBtnImage={Images.DrawerWhite}
        style={styles.customNavBarStyle}
        titleColor={Colors.white}
      />

      {loading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator color={Colors.brand.primary} size={'small'} />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={{
                uri: user.avatar,
              }}
              style={{height: 210}}
              resizeMode="cover"
            />

            <View style={[AppStyles.basePadding]}>
              {renderFinancialStats(user)}

              {_.has(user, 'description') &&
                !_.isNil(user.description) &&
                !_.isEmpty(user.description) &&
                renderDescription(user)}

              {renderRolesSection(user)}

              {upcomingShiftsLoading ? (
                <ActivityIndicator
                  color={Colors.brand.primary}
                  size={'small'}
                />
              ) : (
                !_.isEmpty(upcomingShifts) &&
                renderUpcomingShifts(upcomingShifts)
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
