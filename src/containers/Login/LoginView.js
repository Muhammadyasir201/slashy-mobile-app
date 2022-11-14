import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, TextInput, Button, SignWithSection} from '../../components';
import styles from './LoginStyles';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';

function renderLoginForm(props) {
  const {
    userId,
    userIdError,
    setValue,
    userIdRef,
    passwordFocus,
    password,
    passwordError,
    passRef,
    handleSubmit,
    hidePassword,
    handleShowPassword,
    isLoading,
  } = props;

  return (
    <View style={[styles.loginFormController, AppStyles.flex]}>
      <View style={[AppStyles.flex, styles.loginFieldsContainer]}>
        {/* User ID */}
        <View>
          <TextInput
            placeholder={'Username or email'}
            placeholderTextColor={Colors.text.secondary}
            value={userId}
            error={userIdError}
            icon={Images.EmailInputIcon}
            autoCapitalize="none"
            onChangeText={(val) => {
              setValue({userId: val});
            }}
            ref={(ref) => {
              userIdRef(ref);
            }}
            onSubmitEditing={passwordFocus}
          />
        </View>

        {/* Password */}
        <View>
          <TextInput
            isPassword={true}
            placeholder={'Password'}
            placeholderTextColor={Colors.text.secondary}
            value={password}
            error={passwordError}
            icon={Images.PasswordInputIcon}
            secureTextEntry={hidePassword}
            onSubmitEditing={handleSubmit}
            onChangeText={(val) => {
              setValue({password: val});
            }}
            ref={(ref) => {
              passRef(ref);
            }}
            onPress={handleShowPassword}
            rightImageIcon={
              hidePassword ? Images.ViewPasswordIcon : Images.HidePasswordIcon
            }
          />
        </View>

        {/* Forgot Password */}
        <View
          style={[
            AppStyles.mBottom20,
            AppStyles.flexRow,
            {justifyContent: 'flex-end'},
          ]}>
          <TouchableOpacity onPress={Actions.forgetPassword}>
            <Text textAlign="right" size="xxSmall" color={Colors.brand.primary}>
              {strings.FORGOT_YOUR_PASSWORD}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[AppStyles.mTop10]}>
          <Button
            indicatorColor="white"
            isLoading={isLoading}
            onPress={handleSubmit}
            background={Colors.brand.primary}
            color={Colors.white}
            type="Bold"
            size="xSmall">
            {strings.SIGNIN}
          </Button>
          <Text
            style={[AppStyles.pTop15]}
            textAlign="center"
            size="xxSmall"
            type="Regular">
            By logging in, you agree to our
          </Text>
          <View style={styles.policyView}>
            <TouchableOpacity onPress={() => Actions.privacyPolicy()}>
              <Text size="xxSmall" style={styles.textUnderLine}>
                {`${strings.PRIVACY_POLICY} `}
              </Text>
            </TouchableOpacity>

            <Text size="xxSmall">&amp;</Text>

            <TouchableOpacity onPress={() => Actions.termOfUse()}>
              <Text size="xxSmall" style={styles.textUnderLine}>
                {` ${strings.TERMS_OF_USE}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dontHaveAccount}>
          {/* <Text size="normal" style={styles.dontHaveAccount} textAlign="center">
            Don't have an account ?{' '}
            <TouchableOpacity onPress={Actions.register}>
              <Text size="normal" style={styles.textUnderLine}>
                Sign up
              </Text>
            </TouchableOpacity>
          </Text> */}

          <Text textAlign="center" size="small" type="Regular">
            Don't have an account?{' '}
            <Text
              size="small"
              onPress={() => Actions.register()}
              color={Colors.brand.primary}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function LoginView(props) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={[AppStyles.centerInner, AppStyles.basePadding]}>
          <RnImage source={Images.logo} style={{height: 98, width: 223}} />
        </View>
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            enableOnAndroid
            scrollEnabled
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}>
            {renderLoginForm(props)}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
