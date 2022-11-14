import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  ShiftsListsItem,
  EmptyStateText,
} from '../../components';
import styles from './MyShiftsTabListStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings, SHIFT} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {getNumberOfShifts} from '../../services/generalHelper';

function renderCustomNavBar() {
  return (
    <CustomNavbar
      hasBack={false}
      hasBorder={true}
      leftBtnPress={() => {
        Actions.drawerOpen();
      }}
      leftBtnImage={Images.Drawer}
      title={strings.MY_SHIFTS}
    />
  );
}

export default function MyShiftsTabListView(props) {
  const {
    activeTabKey,
    tabbar,
    setValue,
    onRefresh,
    loading,
    shiftsListItems,
    emptyStates,
    onTabPressHandler,
  } = props;
  return (
    <>
      {renderCustomNavBar()}
      <View style={[AppStyles.flexRow]}>
        {tabbar &&
          tabbar.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
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
              refreshing={false}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }>
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
