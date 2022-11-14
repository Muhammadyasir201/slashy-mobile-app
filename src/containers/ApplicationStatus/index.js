import React from 'react';
import {SafeAreaView, Text, View, Image as RNImage} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {CustomNavbar} from '../../components';
import {strings} from '../../constants';
import {Images} from '../../theme';
import styles from './styles';
import {
  getPermissions,
  setChannelForAndroid,
  showLocalNotification,
  updateDeviceToken,
} from '../../services/firebaseHelper';
import util from '../../util';
import {Notifications} from 'react-native-notifications';
import {navigateActionsOnNotificationTap} from '../../services/generalHelper';
import {updateUserProfileSuccess} from '../../actions/UserActions';

function renderCustomNavBar() {
  return (
    <CustomNavbar
      hasBack={false}
      hasBorder={false}
      leftBtnPress={() => {
        Actions.drawerOpen();
      }}
      leftBtnImage={Images.Drawer}
      centerImage={Images.SlashyIcon}
    />
  );
}
class ApplicationStatus extends React.Component {
  constructor() {
    super();
    this._fcmInit();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  _fcmInit = async () => {
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    this.registerRemoteNotifications = Notifications.registerRemoteNotifications();

    Notifications.getInitialNotification()
      .then((notification) => {
        if (notification && notification.payload)
          console.log(
            'Initial notification was:',
            notification ? notification.payload : 'N/A',
          );

        const payload = notification?.payload?.data
          ? notification?.payload?.data
          : notification?.payload;

        if (payload?.type === 'request_accepted') {
          this.props.updateUserProfileSuccess({
            onboarding_status: 'approved',
          });
          navigateActionsOnNotificationTap(payload);
        } else if (payload?.type === 'request_rejected') {
          this.props.updateUserProfileSuccess({
            onboarding_status: 'rejected',
          });

          navigateActionsOnNotificationTap(payload);
        } else {
          navigateActionsOnNotificationTap(notification.payload);
        }
      })
      .catch((err) => console.error('getInitialNotifiation() failed', err));

    this.registerRemoteNotificationsRegistered = Notifications.events().registerRemoteNotificationsRegistered(
      (event) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      },
    );
    this.registerRemoteNotificationsRegistrationFailed = Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event) => {
        console.error(event);
      },
    );

    this.registerNotificationReceivedForeground = Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification);
        console.log(notification.payload);

        const notType = notification.payload?.type;
        if (notType === 'request_accepted') {
          this.props.updateUserProfileSuccess({onboarding_status: 'approved'});
          Actions.reset('drawerMenu');
        }

        if (notType === 'request_rejected') {
          this.props.updateUserProfileSuccess({onboarding_status: 'rejected'});
        }

        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          showLocalNotification(notification.payload);
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    this.registerNotificationOpened = Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification.payload);

        const notType = notification.payload?.type;
        if (notType === 'request_accepted') {
          this.props.updateUserProfileSuccess({onboarding_status: 'approved'});
          Actions.reset('drawerMenu');
        }

        if (notType === 'request_rejected') {
          this.props.updateUserProfileSuccess({onboarding_status: 'rejected'});
        }

        navigateActionsOnNotificationTap(
          notification.payload.data
            ? notification.payload.data
            : notification.payload,
        );

        completion();
      },
    );

    this.registerNotificationReceivedBackground = Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification);
        console.log(notification.payload);

        const notType = notification.payload?.type;
        if (notType === 'request_accepted') {
          this.props.updateUserProfileSuccess({onboarding_status: 'approved'});
          Actions.reset('drawerMenu');
        }

        if (notType === 'request_rejected') {
          this.props.updateUserProfileSuccess({onboarding_status: 'rejected'});
        }

        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          // return;
        } else {
          showLocalNotification(notification.payload);
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  render() {
    console.log({props: this.props});
    return (
      <View style={styles.container}>
        {renderCustomNavBar()}
        {this.props?.userData?.onboarding_status === 'pending' ? (
          <View style={styles.main}>
            <RNImage source={Images.AppUnderReview} style={styles.image} />
            <Text style={styles.text1}>Application under review</Text>

            <Text style={styles.text2}>
              If your application is successful our team will contact you to
              schedule a video interview!
            </Text>
          </View>
        ) : (
          <View style={styles.main}>
            <RNImage source={Images.AppUnSuccessful} style={styles.image} />
            <Text style={styles.text1}>Application unsuccessful</Text>

            <Text style={styles.text2}>
              Unfortunately you did not meet the requirements to register with
              Slashy. Thank you for your application.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({userData: user.data});

const actions = {
  updateUserProfileSuccess,
};

export default connect(mapStateToProps, actions)(ApplicationStatus);
