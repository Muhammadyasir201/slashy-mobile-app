import React from 'react';
import PropTypes from 'prop-types';
import RocketChatView from './RocketChatView';
import _ from 'lodash';
import moment from 'moment';
import RocketChatSocketIO from '../RocketChatSocketIO';
import {CHAT_SERVER, ROCKET_CHAT_ERRORS, DATE_FORMAT7} from '../RCConstants';
import styles from './RocketChatStyles';
import {View} from 'react-native';
import {Text} from '../RCComponents';
import NetInfo from '@react-native-community/netinfo';
import {Actions} from 'react-native-router-flux';

import RCUtils from '../RCUtils';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'react-native-bottomsheet';

const LOG = true;
let intialImageObj = {
  source: {
    uri: '',
  },
  title: '',
  width: 806,
  height: 720,
};

let unsubscribe = () => {};

export default class RocketChatController extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      sectionListArray: [],
      currentDate: null,
      isLoading: false,
      progressNumber: 0,
      attachments: [],
      isImageViewVisible: false,
      isVideoModalVisible: false,
      isChatLoader: true,
      isInternetConnected: true,
    };
  }
  static propTypes = {
    rc_username: PropTypes.string,
    vendorAvatar: PropTypes.string,
    chattingWithPersonName: PropTypes.string,
    shiftId: PropTypes.number.isRequired,
  };
  static defaultProps = {
    rc_username: '',
    chattingWithPersonName: '',
    vendorAvatar: null,
  };

  componentWillUnmount() {
    RocketChatSocketIO.disconnect();
    unsubscribe();
  }

  internetConnectionCallback = () => {
    this.setState({
      isInternetConnected: false,
    });
  };

  componentWillMount() {
    const {rc_username} = this.props;
    if (_.isEmpty(rc_username)) {
      RCUtils.topAlertError('Something went wrong');
      this.setState({
        isChatLoader: false,
      });
      return;
    }

    // unsubscribe = NetInfo.addEventListener((state) => {
    // if (
    //   state.isInternetReachable === true &&
    //   !this.state.isInternetConnected
    // ) {
    RocketChatSocketIO.unsubscribeAll();
    RocketChatSocketIO.disconnect();
    RocketChatSocketIO.connect(
      () => {
        // socket connection success callback
        if (LOG) {
          console.log('socket connection successfully built');
        }

        RocketChatSocketIO.getLoggedIn(
          () => {
            // logged in connection success callback
            if (LOG) {
              console.log('logged in successfully');
            }
            console.log('this.props.rc_username___' + this.props.rc_username);

            const {shiftId, rc_username} = this.props;

            const channelName = `${shiftId}_${RCUtils.getRCUsername()}`;

            const channelDetails = {
              name: channelName,
              users: [
                RCUtils.getRCUsername(), // Loggedin user Rocketchat username
                rc_username, // Vendor Rocketchat username
              ],
            };

            RocketChatSocketIO.connectToChannel(
              channelDetails.name,
              channelDetails.users,
              async (roomId) => {
                if (LOG) {
                  console.log('createDirectMessage' + roomId);
                }
                RocketChatSocketIO.subscribe(this.internetConnectionCallback);
                RocketChatSocketIO.onMessageRcv(this.onHandleMessageReceived);

                const _room = await RocketChatSocketIO.loadHistory();
                this.setState({
                  isChatLoader: false,
                });
                let mArray = _room.updated.sort(function compare(a, b) {
                  var dateA = new Date(a._updatedAt);
                  var dateB = new Date(b._updatedAt);
                  return dateA - dateB;
                });
                let data = this.manipulateDataForSectionList(mArray);
                if (LOG) {
                  // console.log(JSON.stringify(data));
                  // console.log({_room});
                }
                this.setState({
                  sectionListArray: data.reverse(),
                });
              },
              (ridFailureError) => {
                // socket connection error callback
                console.log(ridFailureError);
                this.setState({
                  isChatLoader: false,
                });
                console.log('ROOM_ID_NOT_FOUND');
                RCUtils.topAlertError(ROCKET_CHAT_ERRORS.ROOM_ID_NOT_FOUND);
              },
            );
          },
          (err) => {
            // error callback
            console.log('Rocket chat LOGIN_FAILED', {err});
            this.setState({
              isChatLoader: false,
            });
            RCUtils.topAlertError(ROCKET_CHAT_ERRORS.LOGIN_FAILED);
          },
          (connectionErrorCallback) => {
            // socket connection error callback
            console.log(
              'Rocket chat SOCKET_CONNECTION_FAILED' + connectionErrorCallback,
            );
            this.setState({
              isChatLoader: false,
            });
            RCUtils.topAlertError(ROCKET_CHAT_ERRORS.SOCKET_CONNECTION_FAILED);
          },
        );
      },
      (err) => {
        //socket connection error callback
        console.log('Rocket chat SERVER_CONNECTION_FAILED' + {err});
        RCUtils.topAlertError(ROCKET_CHAT_ERRORS.SERVER_CONNECTION_FAILED);
        this.setState({
          isChatLoader: false,
        });
      },
    );
    // this.setState({
    //   isInternetConnected: true,
    // });
    // } else {
    //   if (
    //     state.isInternetReachable === false &&
    //     this.state.isInternetConnected === true
    //   ) {
    //     this.setState({
    //       isInternetConnected: false,
    //     });
    //     RCUtils.topAlertError('Internet Connection failure');
    //   }
    // }
    // });
  }

  componentDidMount() {}

  manipulateDataForSectionList = (mArray) => {
    let sectionListArray = []; //final list
    let obj = {}; //object to insert in section list
    let lastDate = '2018-01-01T16:06:39.629Z'; //last date
    let dataArray = []; //single array index data

    mArray.map((item) => {
      let isSameDay = moment(item._updatedAt).isSame(moment(lastDate), 'day');

      if (isSameDay) {
        sectionListArray[sectionListArray.length - 1].data.unshift(item);
      } else {
        dataArray = [];
        obj = {};
        obj['title'] = RCUtils.ISOToFormat(item._updatedAt, DATE_FORMAT7);
        dataArray.push(item);
        obj['data'] = _.cloneDeep(dataArray);
        sectionListArray.push(obj);
      }
      lastDate = item._updatedAt;
    });
    return sectionListArray;
  };

  onHandleMessageReceived = (lMessage) => {
    // RocketChatSocketIO.markReadMessages();

    if (LOG) {
      console.log('message' + JSON.stringify(lMessage));
    }
    let mMessage = lMessage.fields.args[0];
    let {sectionListArray} = this.state;
    let itemVal = _.cloneDeep(sectionListArray);

    if (itemVal.length > 0) {
      let isSameDay = moment(itemVal[itemVal.length - 1]._updatedAt).isSame(
        mMessage._updatedAt,
        'day',
      );

      if (isSameDay) {
        itemVal[0].data.unshift(mMessage);
      } else {
        let dataArray = [];
        let obj = {};
        obj['title'] = RCUtils.ISOToFormat(mMessage._updatedAt, DATE_FORMAT7);
        dataArray.push(mMessage);
        obj['data'] = _.cloneDeep(dataArray);
        itemVal.push(obj);
      }
    } else {
      let dataArray = [];
      let obj = {};
      obj['title'] = RCUtils.ISOToFormat(mMessage._updatedAt, DATE_FORMAT7);
      dataArray.push(mMessage);
      obj['data'] = _.cloneDeep(dataArray);
      itemVal.push(obj);
    }
    this.setState({
      sectionListArray: itemVal,
    });
  };

  sendMessage = () => {
    try {
      const messageValue = _.clone(this.state.inputText);
      if (!_.isEmpty(messageValue)) {
        this.setState({
          inputText: '',
        });
        // RocketChatSocketIO.getUnreadMessagesCount(); //ali-todo
        RocketChatSocketIO.sendMessage(
          messageValue,
          (message) => {
            if (LOG) {
              console.log('sendMessageSuccessfully--->');
            }
          },
          (err) => {
            console.log('sendMessageErr--->', err);
          },
        );
        // RocketChatSocketIO.markReadMessages();
      }
    } catch (e) {
      RCUtils.topAlertError('Something went wrong');
    }
  };

  onInputText = (text) => {
    this.setState({
      inputText: text,
    });
  };

  renderStickyDate = () => {
    const {currentDate, sectionListArray} = this.state;
    let dataLength = 0;

    let mSectionListObj = _.find(sectionListArray, {title: currentDate});

    if (mSectionListObj) dataLength = mSectionListObj.data.length;

    return (
      dataLength > 10 &&
      currentDate && (
        <View style={styles.stickyDate}>
          <Text style={styles.stickyDateText}>{currentDate}</Text>
        </View>
      )
    );
  };

  updateStickyDate = ({viewableItems, changed}) => {
    // if (viewableItems && viewableItems.length > 5) {
    const lastItem = viewableItems.pop();
    if (lastItem && lastItem.section) {
      this.setState({
        currentDate: lastItem.section.title,
      });
      // }
    }
  };

  handleImagePress = () => {
    let newObj = {};
    BottomSheet.showBottomSheetWithOptions(
      {
        options: ['Take picture', 'Take video', 'Open Gallery', 'Close'],
        // title: 'Upload Image',
        dark: false,
        cancelButtonIndex: 3,
      },
      (value) => {
        if (value === 0) {
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64: true,
          }).then((image) => {
            console.log({image: image});
            this.setState({
              image: image.path,
            });
          });
        }
        if (value === 1) {
          ImagePicker.openCamera({
            mediaType: 'video',
          }).then((video) => {
            console.log('video' + JSON.stringify(video));
          });
        }
        if (value === 2) {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64: true,
          }).then((image) => {
            console.log({image});
            this.setState({
              isLoading: true,
              progressNumber: 10,
            });

            let newArr = [];
            newObj['image_url'] = image;
            newArr.push(newObj);
            this.setState({
              attachments: newArr,
            });
            RocketChatSocketIO.sendFileMessage(
              this.state.attachments,
              (onProgressNum) => {
                this.setState({
                  progressNumber: onProgressNum,
                });
                if (onProgressNum > 99.9) {
                  this.setState({
                    isLoading: false,
                    progressNumber: 0,
                  });
                }
              },
            );
          });
        }
      },
    );
  };

  setImageObjectForImageViewer = (allAttachments) => {
    let finalAttachments = [];
    allAttachments.map((item) => {
      intialImageObj.source.uri = `${CHAT_SERVER}${item.image_url}?rc_uid=${RCUtils.getRCId}`;
      finalAttachments.push(intialImageObj);
    });
    this.setState({
      attachments: finalAttachments,
    });
  };

  setImageViewerVisibility = () => {
    this.setState({
      isImageViewVisible: !this.state.isImageViewVisible,
    });
  };

  setVideoModalVisibility = () => {
    this.setState({
      isVideoModalVisible: !this.state.isVideoModalVisible,
    });
  };

  hideNoInternetConnectionModal = () => {
    this.setState({
      isInternetConnected: true,
    });
    Actions.pop();
  };

  render() {
    const {
      sectionListArray,
      inputText,
      attachments,
      isImageViewVisible,
      isVideoModalVisible,
      isLoading,
      progressNumber,
      isChatLoader,
      isInternetConnected,
    } = this.state;
    return (
      <RocketChatView
        {...this.props}
        onInputText={this.onInputText}
        sendMessage={this.sendMessage}
        renderStickyDate={this.renderStickyDate}
        updateStickyDate={this.updateStickyDate}
        setImageViewerVisibility={this.setImageViewerVisibility}
        setVideoModalVisibility={this.setVideoModalVisibility}
        setImageObjectForImageViewer={this.setImageObjectForImageViewer}
        handleImagePress={this.handleImagePress}
        hideNoInternetConnectionModal={this.hideNoInternetConnectionModal}
        isImageViewVisible={isImageViewVisible}
        isVideoModalVisible={isVideoModalVisible}
        attachments={attachments}
        inputText={inputText}
        sectionListArray={sectionListArray}
        isLoading={isLoading}
        progressNumber={progressNumber}
        isChatLoader={isChatLoader}
        isInternetConnected={isInternetConnected}
      />
    );
  }
}
