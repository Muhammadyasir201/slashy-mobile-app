import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {Text, TextInput, Button, CustomNavbar} from '../../components';
import styles from './ChangePasswordStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';

function renderInputForm(props) {
  const {
    oldPassword,
    newPassword,
    reTypeNewPassword,
    oldPasswordError,
    newPasswordError,
    reTypeNewPasswordError,
    setValue,
    isLoading,
    continueButtonClickHandler,
    isOldPasswordVisible,
    isNewPasswordVisible,
    isReTypeNewPasswordVisible,
    oldPassRef,
    newPassRef,
    reTypeNewPassRef,
    newPasswordFocus,
    reTypeNewPasswordFocus,
  } = props;

  return (
    <View style={[styles.mainViewSec, AppStyles.flex]}>
      {/* Password */}
      <View>
        <TextInput
          isPassword={true}
          placeholder={'Old Password'}
          placeholderTextColor={Colors.text.secondary}
          value={oldPassword}
          error={oldPasswordError}
          icon={Images.PasswordInputIcon}
          secureTextEntry={isOldPasswordVisible}
          onSubmitEditing={newPasswordFocus}
          onChangeText={(val) => {
            setValue({oldPassword: val});
          }}
          ref={(ref) => {
            oldPassRef(ref);
          }}
          onPress={() => {
            setValue({isOldPasswordVisible: !isOldPasswordVisible});
          }}
          rightImageIcon={
            isOldPasswordVisible
              ? Images.ViewPasswordIcon
              : Images.HidePasswordIcon
          }
        />

        <TextInput
          isPassword={true}
          placeholder={'New Password'}
          placeholderTextColor={Colors.text.secondary}
          value={newPassword}
          error={newPasswordError}
          icon={Images.PasswordInputIcon}
          secureTextEntry={isNewPasswordVisible}
          onSubmitEditing={reTypeNewPasswordFocus}
          onChangeText={(val) => {
            setValue({newPassword: val});
          }}
          ref={(ref) => {
            newPassRef(ref);
          }}
          onPress={() => {
            setValue({isNewPasswordVisible: !isNewPasswordVisible});
          }}
          rightImageIcon={
            isNewPasswordVisible
              ? Images.ViewPasswordIcon
              : Images.HidePasswordIcon
          }
        />

        <TextInput
          isPassword={true}
          placeholder={'ReType Password'}
          placeholderTextColor={Colors.text.secondary}
          value={reTypeNewPassword}
          error={reTypeNewPasswordError}
          icon={Images.PasswordInputIcon}
          secureTextEntry={isReTypeNewPasswordVisible}
          onSubmitEditing={continueButtonClickHandler}
          onChangeText={(val) => {
            setValue({reTypeNewPassword: val});
          }}
          ref={(ref) => {
            reTypeNewPassRef(ref);
          }}
          onPress={() => {
            setValue({isReTypeNewPasswordVisible: !isReTypeNewPasswordVisible});
          }}
          rightImageIcon={
            isReTypeNewPasswordVisible
              ? Images.ViewPasswordIcon
              : Images.HidePasswordIcon
          }
        />

        <View style={styles.continueBtnStyle}>
          <Button
            isLoading={isLoading}
            onPress={continueButtonClickHandler}
            background={Colors.brand.primary}
            color={Colors.white}
            type="Bold"
            size="xSmall">
            {strings.CONTINUE}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default function ChangePasswordiew(props) {
  return (
    <>
      <CustomNavbar title={strings.CHANGE_PASSWORD} />
      <SafeAreaView style={styles.container}>
        <View style={[AppStyles.centerInner, AppStyles.basePadding]}>
          <RnImage
            source={Images.logo}
            style={{height: 98, width: 223, resizeMode: 'contain'}}
          />
        </View>
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            enableOnAndroid
            scrollEnabled
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            {renderInputForm(props)}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
