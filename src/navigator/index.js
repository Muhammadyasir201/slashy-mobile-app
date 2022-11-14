// @flow
import React from 'react';
import {connect} from 'react-redux';
import {
  Stack,
  Scene,
  Router,
  Actions,
  Tabs,
  Drawer,
} from 'react-native-router-flux';
import {
  Login,
  Start,
  ForgetPassword,
  MyProfile,
  ShiftsLists,
  ShiftsDescription,
  QRCode,
  WalletLists,
  ReviewScreen,
  Overdue,
  Notifications,
  ShiftCheckList,
  PasswordRecovery,
  CodeValidation,
  TermOfUse,
  PrivacyPolicy,
  RocketChatContainer,
  ChangePassword,
  MyShiftsTabList,
  SearchTabList,
  Register,
  ApplicationStatus,
  Otp,
} from '../containers';
import styles from './styles';
import {Tabbar, Sidebar} from '../components';

function onBackPress() {
  if (Actions.state.index === 0) {
    return false;
  }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack key="root" titleStyle={styles.title} headerStyle={styles.header}>
    <Drawer
      drawer
      key="drawerMenuSecondary"
      contentComponent={Sidebar}
      hideNavBar>
      <Scene key="applicationStatus" component={ApplicationStatus} hideNavBar />
    </Drawer>
    <Drawer drawer key="drawerMenu" contentComponent={Sidebar} hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled={true}
        tabBarComponent={() => <Tabbar />}
        tabBarPosition="bottom"
        hideNavBar>
        <Stack key="my_shifts_tab" title="My Shifts">
          {/* <Scene key="my_shifts" component={ShiftsLists} hideNavBar /> */}
          <Scene key="my_shifts" component={MyShiftsTabList} hideNavBar />
        </Stack>

        <Stack key="wallet_tab" title="Wallet">
          <Scene key="wallet" component={WalletLists} hideNavBar />
        </Stack>
        {/* <Stack key="wallet_tab" title="Wallet"></Stack> */}

        <Stack key="search_tab" title="Search" initial>
          {/* <Scene key="search" component={ShiftsLists} hideNavBar initial /> */}
          <Scene key="search" component={SearchTabList} hideNavBar initial />
        </Stack>

        <Stack key="notification_tab" title="Notification">
          <Scene key="notification" component={Notifications} hideNavBar />
        </Stack>

        <Stack key="profile_tab" title="Profile">
          <Scene key="profile" component={MyProfile} hideNavBar />
        </Stack>
      </Tabs>
    </Drawer>
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="start" component={Start} hideNavBar initial />
    <Scene key="forgetPassword" component={ForgetPassword} hideNavBar />
    <Scene key="shiftsDescription" component={ShiftsDescription} hideNavBar />
    <Scene key="qrCode" component={QRCode} hideNavBar />
    <Scene key="myProfile" component={MyProfile} hideNavBar />

    <Scene key="reviewScreen" component={ReviewScreen} hideNavBar />
    <Scene key="overdue" component={Overdue} hideNavBar />
    <Scene key="shiftCheckList" component={ShiftCheckList} hideNavBar />
    <Scene key="passwordRecovery" component={PasswordRecovery} hideNavBar />
    <Scene key="codeValidation" component={CodeValidation} hideNavBar />
    <Scene key="termOfUse" component={TermOfUse} hideNavBar />
    <Scene key="privacyPolicy" component={PrivacyPolicy} hideNavBar />
    <Scene key="changePassword" component={ChangePassword} hideNavBar />

    <Scene
      key="rocketChatContainer"
      component={RocketChatContainer}
      hideNavBar
    />
    <Scene key="register" component={Register} hideNavBar />

    <Scene key="otp" component={Otp} hideNavBar />
  </Stack>,
);

export default () => (
  <AppNavigator navigator={navigator} backAndroidHandler={onBackPress} />
);

const AppNavigator = connect()(Router);
