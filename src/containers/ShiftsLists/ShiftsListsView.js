import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import moment, {duration} from 'moment';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  ShiftsListsItem,
  CustomNavbar,
  EmptyStateText,
} from '../../components';
import styles from './ShiftsListsStyles';
import {Colors, Fonts, AppStyles, Metrics, Images} from '../../theme';
import {strings, SHIFT, DATE_FORMAT6, TIME_FORMAT1} from '../../constants';
import {
  getNumberOfShifts,
  isCurrentRoleShiftExist,
  ISOToFormat,
} from '../../services/generalHelper';

export default function ShiftsListsView(props) {
  const {
    shiftListing,
    tabbar,
    activeTabKey,
    setValue,
    emptyStates,
    roles,
    filterShiftsByRole,
    selectedRoleId,
    isComingFromSearchTab,
    onRefresh,
    loading,
    ongoingEvent,
    flatListRef,
    selectedIndex,
    allBrowseTabShifts,
    onTabPressHandler,
  } = props;

  function renderCustomNavBar() {
    return (
      <CustomNavbar
        centerImage={selectedIndex === 2 && Images.SlashyIcon}
        hasBack={false}
        hasBorder={
          (activeTabKey === SHIFT.status.BROWSE && _.isEmpty(ongoingEvent)) ||
          activeTabKey !== SHIFT.status.BROWSE
        }
        leftBtnPress={() => {
          Actions.drawerOpen();
        }}
        leftBtnImage={Images.Drawer}
        title={selectedIndex === 0 && strings.MY_SHIFTS}
      />
    );
  }

  return (
    <>
      {renderCustomNavBar()}
      {activeTabKey === SHIFT.status.BROWSE &&
        !_.isNil(ongoingEvent) &&
        !_.isEmpty(ongoingEvent) && (
          <TouchableOpacity
            onPress={() => {
              Actions.shiftsDescription({
                shiftID: ongoingEvent.shift_id,
                ongoingEvent: ongoingEvent,
              });
            }}>
            <View style={styles.onGoingJobSecContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.onGoingText}>{strings.ONGOING_SHIFTS}</Text>
                <Text
                  ellipsizeMode="tail"
                  style={styles.onGoingcategoryText}
                  type="Bold"
                  numberOfLines={1}>
                  {`${_.startCase(ongoingEvent.role)} @ ${_.startCase(
                    ongoingEvent.venue_name,
                  )}`}
                </Text>
              </View>

              <View>
                <Text style={styles.onGoingTime} type="Bold">
                  {`${moment(ongoingEvent.from).format(
                    TIME_FORMAT1,
                  )} - ${moment(ongoingEvent.to).format(TIME_FORMAT1)}`}
                  {/* {`${moment(ongoingEvent.slots[0].times[0].from).format(
                  TIME_FORMAT2,
                )} - ${moment(ongoingEvent.slots[0].times[0].to).format(
                  TIME_FORMAT2,
                )}`} */}
                </Text>
                <Text style={styles.onGoingDate} type="Bold">
                  {ISOToFormat(moment(), DATE_FORMAT6)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

      <View style={[AppStyles.flexRow]}>
        {tabbar &&
          tabbar.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setValue({activeTabKey: item.key});
                  onTabPressHandler(item.key);
                }}
                style={[
                  AppStyles.flex,
                  AppStyles.paddingHorizontalBase,
                  AppStyles.centerInner,
                ]}>
                <View style={activeTabKey === item.key && styles.activeTab}>
                  <Text
                    type="Bold"
                    size={Fonts.size.xSmall}
                    color={
                      activeTabKey === item.key
                        ? Colors.brand.primary
                        : Colors.tabbar.primary
                    }
                    style={AppStyles.paddingVerticalBase}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }>
          {!_.isEmpty(roles) && activeTabKey === SHIFT.status.BROWSE && (
            <View>
              <FlatList
                contentContainerStyle={[
                  AppStyles.paddingHorizontalBase,
                  AppStyles.pTop15,
                ]}
                data={roles}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                  <>
                    {isCurrentRoleShiftExist(allBrowseTabShifts, item.id) && (
                      <TouchableOpacity
                        onPress={() => {
                          filterShiftsByRole(item.id);
                        }}
                        style={[
                          styles.rolesSectView,
                          selectedRoleId === item.id &&
                            styles.selectedItemStyle,
                        ]}>
                        <Text
                          style={[
                            styles.categoryItemText,
                            selectedRoleId === item.id && {
                              color: Colors.text.tertiary,
                            },
                          ]}>
                          {`${item.display_name}`}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              />
            </View>
          )}

          {loading ? (
            <View style={styles.loadingStyle}>
              <ActivityIndicator color={Colors.brand.primary} size={'small'} />
            </View>
          ) : (
            <FlatList
              ref={(ref) => {
                flatListRef(ref);
              }}
              initialScrollIndex={0}
              contentContainerStyle={[AppStyles.flex, styles.listItemSecStyle]}
              data={shiftListing}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => {
                {
                  return (
                    <ShiftsListsItem
                      shift={item}
                      noOfShifts={getNumberOfShifts(item.slots)}
                    />
                  );
                }
              }}
              ListEmptyComponent={() => (
                <EmptyStateText
                  image={emptyStates[activeTabKey || 'default'].image}
                  text={emptyStates[activeTabKey || 'default'].text}
                  button_text={
                    emptyStates[activeTabKey || 'default'].button_text
                  }
                  button_action={
                    emptyStates[activeTabKey || 'default'].button_action
                  }
                />
              )}
              ref={(ref) => {
                flatListRef(ref);
              }}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
}
