import React from 'react';
import {
  View,
  TouchableOpacity,
  SectionList,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {CustomNavbar, Text, NotificationItem} from '../../components';
import styles from './NotificationsStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';

export default function NotificationsView(props) {
  const {
    notifications,
    onRefresh,
    loading,
    markNotificationAsRead,
    onFlatListScrollHandler,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBack={false}
        title={strings.NOTIFICATIONS}
        leftBtnPress={() => {
          Actions.drawerOpen();
        }}
        leftBtnImage={Images.Drawer}
      />

      {loading && _.isEmpty(notifications) && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            minHeight: 40,
          }}>
          <ActivityIndicator
            color={Colors.brand.primary}
            animating
            size="small"
          />
        </View>
      )}

      {!_.isEmpty(notifications) && (
        <SectionList
          style={[AppStyles.paddingHorizontalBase]}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          // onEndReached={() => onFlatListScrollHandler}
          // onEndReachedThreshold={0.7}
          sections={notifications}
          renderItem={({item}) => {
            return (
              <NotificationItem
                notifications={item}
                onPress={() => markNotificationAsRead(item)}
              />
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <Text type="Bold" style={styles.titleOfSectionList}>
              {title}
            </Text>
          )}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }
        />
      )}
    </View>
  );
}
