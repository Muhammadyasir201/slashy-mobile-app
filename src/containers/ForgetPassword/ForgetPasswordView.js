import React from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Button, CustomNavbar, Text, TextInput} from '../../components';
import styles from './ForgetPasswordStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ForgetPasswordView(props) {
  const {
    email,
    emailError,
    handleSubmit,
    isLoading,
    emailRef,
    setValue,
  } = props;

  return (
    <>
      <CustomNavbar
        title={strings.FORGOT_PASSWORD}
        hasBack={true}
        style={styles.navbar}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[AppStyles.doubleBasePadding]}>
        <View style={AppStyles.centerInner}>
          <Image source={Images.ForgetImage} />
        </View>

        <View style={AppStyles.basePadding}>
          <Text
            style={styles.heading}
            type="Bold"
            size={Fonts.size.medium}
            textAlign="center">
            {strings.DID_SOMEONE_FORGET_THEIR_PASSWORD}
          </Text>
        </View>

        <View style={AppStyles.smallMargin}>
          <Text
            style={styles.description}
            type="Regular"
            align="center"
            color={Colors.black}
            size={Fonts.size.xxSmall}
            textAlign="center">
            {strings.THATS_OK}
          </Text>
          <Text style={styles.description} type="Regular">
            {strings.DESCRIPTION}
          </Text>
        </View>

        <View>
          <TextInput
            placeholder={strings.EMAIL_ID}
            placeholderTextColor={Colors.text.secondary}
            value={email}
            error={emailError}
            icon={Images.EmailInputIcon}
            onChangeText={(val) => {
              setValue({email: val});
            }}
            ref={(ref) => {
              emailRef(ref);
            }}
            onSubmitEditing={handleSubmit}
          />
        </View>

        <View style={AppStyles.mTop40}>
          <Button
            onPress={handleSubmit}
            isLoading={isLoading}
            background={Colors.brand.primary}
            color={Colors.white}
            type="Bold"
            size="xSmall">
            {strings.SUBMIT}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
