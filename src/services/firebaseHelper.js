import _ from 'lodash';
import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {
  updateDeviceTokenRequest,
  setSelectedTab,
} from '../actions/GeneralActions';
import DataHandler from '../services/DataHandler';
import {navigateActionsOnNotificationTap} from './generalHelper';
import Util from '../util';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
} from '../constants';
import {Notifications} from 'react-native-notifications';

const LOG = false;

const updateDeviceToken = async (token) => {
  let fcmToken = '';
  if (_.isUndefined(token)) {
    fcmToken = await firebase.messaging().getToken();
  }

  console.log({fcmToken});

  if (fcmToken || token)
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        deviceId: fcmToken || token,
        devicePlatform: Platform.OS,
      }),
    );

  return fcmToken || token;
};

const setChannelForAndroid = async () => {
  await Notifications.setNotificationChannel({
    channelId: NOTIFICATION_CHANNEL.id,
    name: NOTIFICATION_CHANNEL.name,
    importance: 5,
    description: NOTIFICATION_CHANNEL.name,
    enableLights: true,
    enableVibration: true,
    // groupId: 'your-group',
    // showBadge: true,
    // soundFile: 'custom_sound.mp3', // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
  });
};

const getPermissions = async () => {
  let authStatus = messaging().hasPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    try {
      authStatus = await messaging().requestPermission();
    } catch (error) {
      Util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR);
    }
  }

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const showLocalNotification = async (data) => {
  console.log({showLocalNotificationData: data});

  const {title, body, type, extraData, notification_time, id} = data;

  const someId = Math.floor(Math.random() * 10) + '';

  Notifications.postLocalNotification({
    body,
    title,
    sound: 'default',
    silent: false,
    data: {isLocal: true, extraData, id: someId, type},
  });
};

// const showLocalNotification = async (data) => {
//   let {silent = 'false'} = data;
//   silent = JSON.parse(silent);

//   if (!silent) {
//     const {title, body, type, extraData, notification_time, id} = data;

//     const someId = Math.floor(Math.random() * 10) + '';
//     await notifee.displayNotification({
//       title,
//       body,
//       data: {extraData, id: someId, type},
//       android: {
//         channelId: NOTIFICATION_CHANNEL.id,
//         autoCancel: true,
//         id: someId,
//         largeIcon: 'slashy_launcher',
//         smallIcon: 'slashy_launcher',
//         pressAction: {
//           launchActivity: 'default',
//           id: 'default',
//         },
//         sound: 'default',
//       },
//       ios: {
//         sound: 'default',
//       },
//     });
//   }
// };

const clearAllNotifications = () => {
  // firebase.notifications().removeAllDeliveredNotifications();
};

const clearBadgeNumber = () => {
  // TODO
  // reason: firebase.notifications()
  // if (!Util.isPlatformAndroid()) firebase.notifications().setBadge(0);
};

export {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  clearBadgeNumber,
  clearAllNotifications,
};
