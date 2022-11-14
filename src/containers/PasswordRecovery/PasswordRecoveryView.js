import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Button, CustomNavbar, Text, TextInput} from '../../components';
import styles from './PasswordRecoveryStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function PasswordRecoveryView(props) {
  const {
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
    handleSubmitButton,
    newPasswordRef,
    confirmPasswordRef,
    setValue,
    newPasswordFocus,
    confirmPasswordFocus,
    handleNavBackButton,
    loading,
    hideNewPassword,
    hideConfirmPassword,
  } = props;

  return (
    <>
      <CustomNavbar
        title={strings.CONFIRM_PASSWORD}
        leftBtnPress={handleNavBackButton}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Image source={Images.ForgetImage} />

        <Text style={styles.recoveryText} type="Bold">
          {strings.PASSWORD_RECOVERY}
        </Text>
        {/* <Text style={styles.description}>
          Lorem Ipsum is simply dummy text of the printing.
        </Text> */}

        <View style={styles.inputTextView}>
          <TextInput
            placeholder={strings.NEW_PASSWORD}
            icon={Images.PasswordInputIcon}
            value={newPassword}
            error={newPasswordError}
            secureTextEntry={hideNewPassword}
            ref={(ref) => {
              newPasswordRef(ref);
            }}
            onChangeText={(val) => {
              setValue({newPassword: val});
            }}
            onSubmitEditing={confirmPasswordFocus}
            onPress={() => {
              setValue({hideNewPassword: !hideNewPassword});
            }}
            rightImageIcon={
              hideNewPassword
                ? Images.ViewPasswordIcon
                : Images.HidePasswordIcon
            }
          />
          <TextInput
            placeholder={strings.CONFIRM_PASSWORD}
            icon={Images.PasswordInputIcon}
            value={confirmPassword}
            error={confirmPasswordError}
            secureTextEntry={hideConfirmPassword}
            ref={(ref) => {
              confirmPasswordRef(ref);
            }}
            onChangeText={(val) => {
              setValue({confirmPassword: val});
            }}
            onPress={() => {
              setValue({hideConfirmPassword: !hideConfirmPassword});
            }}
            onSubmitEditing={handleSubmitButton}
            rightImageIcon={
              hideConfirmPassword
                ? Images.ViewPasswordIcon
                : Images.HidePasswordIcon
            }
          />
          <Button
            onPress={handleSubmitButton}
            style={styles.button}
            background={Colors.brand.primary}
            color={Colors.white}
            isLoading={loading}
            type="Bold"
            size="xSmall">
            {strings.RESET}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
