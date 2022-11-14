import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  SectionList,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {
  Text,
  CustomNavbar,
  ImageViewer,
  VideoPlayer,
  Loader,
  TextMessage,
  ImageMessage,
  VideoMessage,
} from '../RCComponents';
import {Colors, Images} from '../RCTheme';
import _ from 'lodash';
import styles from './RocketChatStyles';
import RCUtils from '../RCUtils';
import Modal from 'react-native-modal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {strings} from '../../constants';
import {AppStyles} from '../../theme';

let isMyMsg = false;

export default function RocketChatView(props) {
  const {
    sendMessage,
    onInputText,
    inputText,
    sectionListArray,
    renderStickyDate,
    updateStickyDate,
    handleImagePress,
    attachments,
    isImageViewVisible,
    setImageViewerVisibility,
    setImageObjectForImageViewer,
    isVideoModalVisible,
    setVideoModalVisibility,
    videoUri,
    isLoading,
    progressNumber,
    isChatLoader,
    chattingWithPersonName,
    isInternetConnected,
    hideNoInternetConnectionModal,
    vendorAvatar,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <CustomNavbar
        title={strings.CHAT}
        titleStyle={styles.titleStyle}
        style={styles.customNavBarStyle}
      />
      {!isInternetConnected && (
        <Modal
          isVisible={!isInternetConnected}
          onBackButtonPress={() => {}}
          onBackdropPress={() => {}}
          backdropOpacity={0.6}>
          <View style={styles.noInternetConnSec}>
            <Text style={styles.noInternetErrorStyle}>
              {strings.INTERNET_IS_NOT_AVAILABLE}
            </Text>
            <TouchableOpacity
              onPress={() => {
                hideNoInternetConnectionModal();
              }}>
              <View style={styles.okBtn}>
                <Text style={styles.okBtnTextStyle}>{strings.OK}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <View style={styles.chatViewWrap}>
        <View style={styles.chatListWrap}>
          <>
            {isLoading && (
              <Loader
                loading={isLoading}
                loadingFor={'Uploading Image'}
                backdropOpacity={0.8}
                progress={progressNumber}
              />
            )}
            {isChatLoader && (
              <Loader
                loading={isChatLoader}
                loadingFor={'loading Chat'}
                backdropOpacity={0.8}
              />
            )}
            <Modal
              isVisible={isVideoModalVisible}
              style={styles.modal}
              animationIn="fadeIn"
              onBackButtonPress={() => {
                setVideoModalVisibility();
              }}
              onBackdropPress={() => {
                setVideoModalVisibility();
              }}
              backdropOpacity={0.6}
              animationOut="fadeOut">
              <VideoPlayer uri={videoUri} />
            </Modal>
            {renderStickyDate()}
            <SectionList
              style={styles.sectionListPadding}
              inverted={true}
              onViewableItemsChanged={updateStickyDate}
              showsVerticalScrollIndicator={false}
              sections={sectionListArray}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => {
                return (
                  (isMyMsg = item.u._id === RCUtils.getRCId()),
                  (
                    <View>
                      {_.isUndefined(item.groupable) && (
                        <>
                          {_.isEmpty(item.attachments) && (
                            <View
                              style={[
                                AppStyles.flex,
                                AppStyles.flexRow,
                                isMyMsg && {justifyContent: 'flex-end'},
                              ]}>
                              {vendorAvatar && !isMyMsg && (
                                <Image
                                  source={{uri: vendorAvatar}}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    margin: 5,
                                  }}
                                />
                              )}
                              <TextMessage
                                isMyMsg={isMyMsg}
                                item={item}
                                vendorAvatar={vendorAvatar}
                              />
                            </View>
                          )}
                          {!_.isEmpty(item.attachments) &&
                            item.attachments[0].image_url && (
                              <ImageMessage
                                isMyMsg={isMyMsg}
                                item={item}
                                setImageObjectForImageViewer={
                                  setImageObjectForImageViewer
                                }
                                setImageViewerVisibility={
                                  setImageViewerVisibility
                                }
                              />
                            )}
                          {!_.isEmpty(item.attachments) &&
                            item.attachments[0].video_url && (
                              <VideoMessage
                                isMyMsg={isMyMsg}
                                item={item}
                                setVideoModalVisibility={
                                  setVideoModalVisibility
                                }
                              />
                            )}
                        </>
                      )}
                    </View>
                  )
                );
              }}
              renderSectionFooter={({section: {title}}) => (
                <View style={styles.stickyDate}>
                  <Text style={styles.stickyDateText}>{title}</Text>
                </View>
              )}
            />

            {isImageViewVisible && (
              <ImageViewer
                isImageViewVisible={isImageViewVisible}
                setImageViewerVisibility={setImageViewerVisibility}
                attachments={attachments}
              />
            )}
          </>
        </View>
        {!isInternetConnected && (
          <View style={styles.connectingStatusStyle}>
            <Text
              style={styles.connectingStatusTextStyle}>{`Connecting...`}</Text>
          </View>
        )}
        <View style={styles.chatMessageSec}>
          <View style={styles.textInputStyle}>
            <TextInput
              placeholder={'Type your message here...'}
              placeholderTextColor={Colors.grey2}
              value={inputText}
              style={styles.textInput}
              onChangeText={(inputText) => {
                onInputText(inputText);
              }}
            />
            <TouchableOpacity
              disabled={!isInternetConnected}
              onPress={() => {
                // inputText.length > 0 ? sendMessage() : handleImagePress();
                inputText.length > 0 ? sendMessage() : '';
              }}
              style={styles.sendBtnSecWrap}>
              <Image
                source={inputText.length > 0 && Images.SendBtnImage}
                style={styles.sendBtnStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    </SafeAreaView>
  );
}
