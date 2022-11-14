import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import moment, {duration} from 'moment';
import _ from 'lodash';
import {Text} from '..';
import styles from './NotificationItemStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';

export default function NotificationItemView(props) {
  const {notifications, onPress} = props;
  const {id, body, createdAt, is_read} = notifications;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <View style={[styles.container, !is_read && styles.unRead]}>
        <Image
          source={
            _.has(notifications, 'company_image')
              ? {uri: notifications.company_image}
              : Images.Profile
          }
          resizeMode={'contain'}
          style={{width: 45, height: 45}}
        />

        <View style={styles.view}>
          <Text style={styles.applicationText}>{body}</Text>
          <Text style={styles.notificationTime}>
            {moment(createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
