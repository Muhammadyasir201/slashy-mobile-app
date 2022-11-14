import React from 'react';
import {
  View,
  Image as RnImage,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Image,
  CircularImage,
  TextInput,
  PhoneInput,
  OptionSelect,
  Button,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './RegisterStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {imagesTypes, strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
export default function RegisterView(props) {
  const {
    profilePicLoading,
    profilePic,
    showBottomSheet,
    setValue,
    firstName,
    firstNameError,
    firstNameRef,
    lastName,
    lastNameError,
    lastNameRef,
    lastNameFocus,
    email,
    emailError,
    emailRef,
    emailFocus,
    phone,
    phoneFormatted,
    phoneError,
    phoneRef,
    phoneFocus,
    gender,
    genderError,
    setSelectedValue,
    roles,
    selectedRoles,
    setSelectedRoles,
    rolesError,
    rolesLoading,
    documentSelect,
    isLoading,
    onSubmit,
    idDocLoading,
    cvDocLoading,
    cvDocuments,
    idDocuments,
    removeDoc,
    idDocumentsError,
    cvDocumentsError,
  } = props;
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
            showsVerticalScrollIndicator={false}>
            <>
              {/* profile picture */}
              <View style={[AppStyles.alignItemsCenter, AppStyles.mTop30]}>
                <TouchableOpacity onPress={showBottomSheet}>
                  {profilePic.url === '' && (
                    <View
                      style={{
                        height: 88,
                        width: 88,
                        borderRadius: 50,
                        overflow: 'hidden',
                        borderColor: Colors.brand.primary,
                        borderWidth: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {!profilePicLoading && (
                        <RnImage
                          source={Images.UserPh}
                          style={{height: 50, width: 50, resizeMode: 'contain'}}
                        />
                      )}
                      {profilePicLoading && (
                        <ActivityIndicator
                          size="small"
                          color={Colors.brand.primary}
                        />
                      )}
                    </View>
                  )}
                  {profilePic.url != '' && (
                    <CircularImage
                      image={profilePic.url}
                      placeholderStyle={{zIndex: -10, position: 'absolute'}}
                      placeholderSource={Images.UserPh}
                      noShadow
                      size={88}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={[
                  AppStyles.flex,
                  AppStyles.spaceCenter,
                  styles.formStyles,
                  AppStyles.mBottom20,
                ]}>
                {/* First Name */}
                <View>
                  <TextInput
                    placeholder={'First Name'}
                    placeholderTextColor={Colors.text.secondary}
                    value={firstName}
                    error={firstNameError}
                    icon={Images.UserInputIcon}
                    onChangeText={(val) => {
                      setValue({firstName: val});
                    }}
                    ref={(ref) => {
                      firstNameRef(ref);
                    }}
                    onSubmitEditing={lastNameFocus}
                  />
                </View>
                {/* Last Name */}
                <View>
                  <TextInput
                    placeholder={'Last Name'}
                    placeholderTextColor={Colors.text.secondary}
                    value={lastName}
                    error={lastNameError}
                    icon={Images.UserInputIcon}
                    onChangeText={(val) => {
                      setValue({lastName: val});
                    }}
                    ref={(ref) => {
                      lastNameRef(ref);
                    }}
                    onSubmitEditing={emailFocus}
                  />
                </View>
                {/* Email*/}
                <View>
                  <TextInput
                    keyboardType="email-address"
                    placeholder={'Email'}
                    placeholderTextColor={Colors.text.secondary}
                    value={email}
                    autoCapitalize="none"
                    error={emailError}
                    icon={Images.EmailInputIcon}
                    onChangeText={(val) => {
                      setValue({email: val.replace(/\s/g, '')});
                    }}
                    ref={(ref) => {
                      emailRef(ref);
                    }}
                    onSubmitEditing={phoneFocus}
                  />
                </View>
                {/* phone*/}
                <View>
                  <PhoneInput
                    placeholder={'Phone'}
                    placeholderTextColor={Colors.text.secondary}
                    value={phoneFormatted}
                    error={phoneError}
                    icon={Images.PhoneInputIcon}
                    onChangeText={(formatted, extracted) => {
                      console.log(`Formatted: ${formatted}`); // +1 (123) 456-7890
                      console.log(`Extracted: ${extracted}`); // 1234567890
                      setValue({phone: extracted, phoneFormatted: formatted});
                    }}
                    ref={(ref) => {
                      phoneRef(ref);
                    }}
                    onSubmitEditing={() => {}}
                  />
                </View>
                {/*Gender*/}
                <View>
                  <OptionSelect
                    title="Select Gender"
                    placeholder="Gender"
                    icon={Images.GenderInputIcon}
                    list={[
                      {key: 0, value: 'Male'},
                      {key: 1, value: 'Female'},
                    ]}
                    error={genderError}
                    selectedValue={gender}
                    setSelectedValue={setSelectedValue}
                  />
                </View>
                {/*Roles*/}
                <View>
                  <OptionSelect
                    title="Select Roles"
                    subtitle="You can select multiple roles. Only select
                  the roles you have experience in."
                    dataLoading={rolesLoading}
                    multiple
                    placeholder="Certified Roles"
                    icon={Images.RoleInputIcon}
                    list={roles}
                    error={rolesError}
                    selectedValue={selectedRoles}
                    setSelectedValue={setSelectedRoles}
                  />
                </View>
                {/* Upload Documents */}
                <View style={AppStyles.mTop35}>
                  <Text size={Fonts.size.medium} type="Bold">
                    Upload Documents
                  </Text>
                  <Text size={Fonts.size.xxxSmall}>
                    Upload Emirates ID (front and back) and updated CV
                  </Text>
                </View>
                {/* Upload Emirates ID */}
                <TouchableOpacity
                  style={styles.documentContainer}
                  onPress={() => documentSelect('id')}>
                  <View style={AppStyles.flex}>
                    <Text size={Fonts.size.xvi}>
                      Upload Emirates ID
                      <Text size={Fonts.size.xxxxSmall}> (front and back)</Text>
                    </Text>
                    {/* <Text size={Fonts.size.small} color={Colors.text.secondary}>
                      Maximum size 5 mb
                    </Text> */}
                  </View>
                  {!idDocLoading && <RnImage source={Images.PlusIconBlue} />}
                  {idDocLoading && (
                    <ActivityIndicator color={Colors.brand.primary} />
                  )}
                </TouchableOpacity>
                {!_.isEmpty(idDocumentsError) &&
                  !_.isUndefined(idDocumentsError) &&
                  !_.isNull(idDocumentsError) && (
                    <Text type="Medium" size="small" color={Colors.red}>
                      {idDocumentsError}
                    </Text>
                  )}

                <View style={idDocuments.length > 0 && AppStyles.mTop40}>
                  {idDocuments.map((item, index) => {
                    const isImage = imagesTypes.includes(item.format);
                    const isPdf = !isImage && item.format === 'pdf';

                    return (
                      <View
                        style={[
                          styles.documentItem,
                          index > 0 && {
                            borderTopWidth: 0.5,
                            borderTopColor: Colors.text.grey,
                            paddingVertical: 10,
                          },
                          index === 0 && {marginBottom: 10},
                        ]}>
                        <RnImage
                          style={{height: 46, width: 46}}
                          source={
                            isImage
                              ? Images.DocImage
                              : isPdf
                              ? Images.DocPdfIcon
                              : Images.DocDoc
                          }
                        />
                        <Text
                          style={[AppStyles.flex, AppStyles.mLeft10]}
                          size="xSmall">
                          {isImage
                            ? 'Image ' + (index + 1)
                            : 'Document ' + (index + 1)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeDoc('id', index)}>
                          <RnImage source={Images.RemoveDocumentIcon} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>

                {/*  Upload CV */}
                <TouchableOpacity
                  style={styles.documentContainer}
                  onPress={() => documentSelect('cv')}>
                  <View style={AppStyles.flex}>
                    <Text size={Fonts.size.xvi}>Upload CV</Text>
                    {/* <Text size={Fonts.size.small} color={Colors.text.secondary}>
                      Maximum size 5 mb
                    </Text> */}
                  </View>
                  {!cvDocLoading && <RnImage source={Images.PlusIconBlue} />}
                  {cvDocLoading && (
                    <ActivityIndicator color={Colors.brand.primary} />
                  )}
                </TouchableOpacity>
                {!_.isEmpty(cvDocumentsError) &&
                  !_.isUndefined(cvDocumentsError) &&
                  !_.isNull(cvDocumentsError) && (
                    <Text type="Medium" size="small" color={Colors.red}>
                      {cvDocumentsError}
                    </Text>
                  )}
                <View style={cvDocuments.length > 0 && AppStyles.mTop40}>
                  {cvDocuments.map((item, index) => {
                    const isImage = imagesTypes.includes(item.format);
                    const isPdf = !isImage && item.format === 'pdf';

                    return (
                      <View
                        style={[
                          styles.documentItem,
                          index > 0 && {
                            borderTopWidth: 0.5,
                            borderTopColor: Colors.text.grey,
                            paddingVertical: 10,
                          },
                          index === 0 && {marginBottom: 10},
                        ]}>
                        <RnImage
                          style={{height: 46, width: 46}}
                          source={
                            isImage
                              ? Images.DocImage
                              : isPdf
                              ? Images.DocPdfIcon
                              : Images.DocDoc
                          }
                        />
                        <Text
                          style={[AppStyles.flex, AppStyles.mLeft10]}
                          size="xSmall">
                          {isImage
                            ? 'Image ' + (index + 1)
                            : 'Document ' + (index + 1)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeDoc('cv', index)}>
                          <RnImage source={Images.RemoveDocumentIcon} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>

                <View style={AppStyles.mTop30}>
                  <Button
                    indicatorColor="white"
                    isLoading={isLoading}
                    onPress={onSubmit}
                    background={Colors.brand.primary}
                    color={Colors.white}
                    type="Bold"
                    size="xSmall">
                    {strings.SIGNUP}
                  </Button>

                  <Text
                    onPress={() => Actions.pop()}
                    style={[AppStyles.pTop15]}
                    textAlign="center"
                    size="xii"
                    type="Regular">
                    Already have an account?{' '}
                    <Text size="xii" color={Colors.brand.primary}>
                      Login
                    </Text>
                  </Text>
                </View>
              </View>
            </>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
