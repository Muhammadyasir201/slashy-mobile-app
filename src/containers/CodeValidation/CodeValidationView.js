import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button, CustomNavbar, Text, TextInput} from '../../components';
import styles from './CodeValidationStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';

export default function CodeValidationView(props) {
  const {
    getCode,
    handleSubmitButton,
    otpError,
    otp,
    onResendBtnPress,
    isLoading,
    isResetBtnLoading,
  } = props;

  return (
    <>
      <CustomNavbar title={strings.VARIFICATION_CODE} />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Image source={Images.ForgetImage} />

        <Text size="small">{strings.OTP_Text}</Text>
        <Text style={styles.code}>{otp}</Text>
        <Text style={styles.recoveryText} type="SemiBold">
          {strings.enterCode}
        </Text>

        <View style={styles.inputTextView}>
          <CodeInput
            inputPosition="center"
            activeColor={Colors.text.primary}
            inactiveColor={Colors.border.primary}
            autoFocus={true}
            codeLength={4}
            inputPosition="center"
            size={60}
            space={20}
            keyboardType="numeric"
            onFulfill={(code) => getCode(code)}
            codeInputStyle={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          />
          <Text
            size={12}
            color={Colors.red}
            style={[{marginTop: 5, marginBottom: 2}]}>
            {otpError}
          </Text>

          <Button
            onPress={handleSubmitButton}
            style={styles.button}
            background={Colors.brand.primary}
            color={Colors.white}
            type="Bold"
            isLoading={isResetBtnLoading}
            size="xSmall">
            {strings.RESET}
          </Button>
        </View>

        <View style={[AppStyles.mTop15, AppStyles.centerInner]}>
          <Text style={styles.getACode}>Didn't get a code?</Text>
          <TouchableOpacity onPress={onResendBtnPress}>
            {isLoading ? (
              <ActivityIndicator
                color={Colors.brand.primary}
                animating
                size="small"
              />
            ) : (
              <Text style={styles.resendCode}>RESEND CODE</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
