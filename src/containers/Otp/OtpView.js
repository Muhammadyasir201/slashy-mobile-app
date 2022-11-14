import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, Image, CustomNavbar, CodeInput} from '../../components';
import styles from './OtpStyles';
import {Fonts, AppStyles, Images, Colors, Metrics} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function OtpView(props) {
  const {autoSubmit, resendError, code, loading, onWrongNumberPress} = props;

  var minutes = Math.floor(props.timer / 60);
  var seconds = props.timer - minutes * 60;

  return (
    <View style={styles.container}>
      <CustomNavbar title="OTP Verification" />
      {loading && (
        <View style={styles.loadingParent}>
          <ActivityIndicator size="large" color={Colors.brand.primary} />
        </View>
      )}

      <KeyboardAwareScrollView
        enableOnAndroid
        scrollEnabled
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <RnImage
            style={{height: 155, width: 155}}
            source={Images.otpAnimation}
          />
        </View>

        <View style={{alignItems: 'center', paddingHorizontal: 50}}>
          <Text size="xLarge" type="Bold">
            OTP Verification
          </Text>
          <Text
            size={Fonts.size.xSmall}
            textAlign="center"
            color={Colors.text.secondary}
            style={AppStyles.mTop10}>
            {`An OTP code has been sent to your mobile number. Please make sure you have used an active number.`}
          </Text>

          <CodeInput codeSubmit={(code) => props.codeSubmit(code)} />

          <View style={styles.resendParent}>
            <Text>{`${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(
              -2,
            )}`}</Text>

            <Text
              style={[AppStyles.mTop20, AppStyles.mBottom20]}
              color={Colors.text.secondary}>{`${props?.data?.contact}`}</Text>

            <TouchableOpacity
              // style={AppStyles.mTop10}
              onPress={() => {
                props.reSendActive ? props.resendPress() : {};
              }}
              activeOpacity={props.reSendActive ? 0 : 9}>
              <Text size={Fonts.size.xSmall} color={Colors.text.secondary}>
                Didn’t receive a code?
                <Text
                  color={
                    props.reSendActive
                      ? Colors.brand.black
                      : Colors.text.secondary
                  }
                  size={Fonts.size.xSmall}
                  type="Bold">
                  {''} Resend Code
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.mTop5}
              onPress={onWrongNumberPress}>
              <Text type="Bold" size={Fonts.size.xSmall}>
                Wrong Number ?
              </Text>
            </TouchableOpacity>


            <Text>
              {props?.data?.otp}
            </Text>
          </View>

          {props.showError && (
            <View style={styles.errorParent}>
              <Text color={'red'}>{resendError}</Text>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
