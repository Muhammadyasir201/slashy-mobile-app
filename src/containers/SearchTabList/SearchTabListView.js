import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import {
  Text,
  CustomNavbar,
  EmptyStateText,
  ShiftsListsItem,
} from '../../components';
import styles from './SearchTabListStyles';
import moment, {duration} from 'moment';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings, SHIFT, TIME_FORMAT1, DATE_FORMAT6} from '../../constants';
import ShiftsLists from '../../containers/ShiftsLists';
import {Actions} from 'react-native-router-flux';
import {
  ISOToFormat,
  getNumberOfShifts,
  isCurrentRoleShiftExist,
} from '../../services/generalHelper';

function renderCustomNavBar(mProps) {
  const {activeTabKey, ongoingEvent} = mProps;
  return (
    <CustomNavbar
      centerImage={Images.SlashyIcon}
      hasBack={false}
      hasBorder={
        (activeTabKey === SHIFT.status.BROWSE && _.isEmpty(ongoingEvent)) ||
        activeTabKey !== SHIFT.status.BROWSE
      }
      leftBtnPress={() => {
        Actions.drawerOpen();
      }}
      leftBtnImage={Images.Drawer}
    />
  );
}

export default function SearchTabListView(props) {
  const {
    activeTabKey,
    ongoingEvent,
    tabbar,
    roles,
    loading,
    shiftsListItems,
    emptyStates,
    filterShiftsByRole,
    allBrowseTabShifts,
    onRefresh,
    setValue,
    selectedRoleId,
  } = props;
  return (
    <>
      {renderCustomNavBar(props)}
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
                    ongoingEvent.company_name,
                  )}`}
                </Text>
              </View>

              <View>
                <Text style={styles.onGoingTime} type="Bold">
                  {`${moment(ongoingEvent.from).format(
                    TIME_FORMAT1,
                  )} - ${moment(ongoingEvent.to).format(TIME_FORMAT1)}`}
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
            <RefreshControl refreshing={false} onRefresh={() => onRefresh()} />
          }>
          {!_.isEmpty(roles) &&
            activeTabKey === SHIFT.status.BROWSE &&
            !loading && (
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
              initialScrollIndex={0}
              contentContainerStyle={[AppStyles.flex, styles.listItemSecStyle]}
              data={shiftsListItems}
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
            />
          )}
        </ScrollView>
      </View>
    </>
  );
}
