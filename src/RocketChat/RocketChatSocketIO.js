//@flow
import _ from 'lodash';
import {Rocketchat as RocketchatClient} from '@rocket.chat/sdk';
import Util from '../util';
import RCUtils from './RCUtils';
import moment from 'moment';
import {create} from 'apisauce';
import {CHAT_SERVER} from './RCConstants';

let isConnectedWithSocket = false;
let lastData = '';
const LOG = false;
class RocketChatSocketIO {
  constructor(rid) {
    this.rid = rid;
    this.messages = {};
  }
  /**
   *
   *
   * @param {function} connectCallBack
   * @param {function} disconnectCallBack
   * @memberof SocketIO
   */
  connect(connectCallBack, connectionErrorCallBack = undefined): void {
    this.socket = new RocketchatClient({
      host: CHAT_SERVER,
      protocol: 'ddp',
      // useSsl: useSsl(server),
    });

    this.socket
      .connect()
      .then(() => {
        isConnectedWithSocket = true;
        connectCallBack();
      })
      .catch((err) => {
        isConnectedWithSocket = false;
        connectionErrorCallBack(err);
      });
  }

  async getLoggedIn(
    loginSuccessCallBack,
    loginFailedCallBack = undefined,
    connectionErrorCallBack = undefined,
  ): void {
    if (isConnectedWithSocket) {
      await this.socket
        .login({
          resume: Util.getRCToken(),
        })
        .then(() => {
          loginSuccessCallBack();
        })
        .catch((err) => {
          loginFailedCallBack(err);
        });
    } else {
      connectionErrorCallBack('socket connection failed');
    }
  }

  async createRoom(username, ridSuccessCallback, ridFailureCallBack): void {
    await this.socket
      .createDirectMessage(username)
      // .createDirectMessage('test_67584')
      .then((response) => {
        console.log('success' + JSON.stringify(response.rid));
        this.rid = response.rid;
        ridSuccessCallback(JSON.stringify(response.rid));
      })
      .catch((error) => {
        console.log('failure' + JSON.stringify(error));
        ridFailureCallBack('Room Id Error');
      });
  }

  connectToChannel(channelName, users, ridSuccessCallback, ridFailureCallBack) {
    this.getChannel(
      channelName,
      (rid) => {
        this.rid = rid;
        ridSuccessCallback(rid);
      },
      () => {
        this.createChannel(
          channelName,
          users,
          ridSuccessCallback,
          ridFailureCallBack,
        );
      },
    );
  }

  getChannel(channelName, successCallback, errorCallback) {
    const api = create({
      baseURL: `${CHAT_SERVER}/api/v1/`,
      headers: {
        'X-Auth-Token': RCUtils.getRCToken(),
        'X-User-Id': RCUtils.getRCId(),
      },
    });
    api.get(`channels.info?roomName=${channelName}`).then((response) => {
      if (response.ok) {
        return (
          response.data &&
          response.data.channel &&
          successCallback(response.data.channel._id)
        );
      } else {
        errorCallback();
      }
    });
  }

  createChannel(channelName, users, ridSuccessCallback, ridFailureCallBack) {
    const api = create({
      baseURL: `${CHAT_SERVER}/api/v1/`,
      headers: {
        'X-Auth-Token': RCUtils.getRCToken(),
        'X-User-Id': RCUtils.getRCId(),
      },
    });
    api
      .post('channels.create', {
        name: channelName,
        members: users,
        readOnly: false,
      })
      .then((response) => {
        this.rid = response.data.channel._id;
        ridSuccessCallback(response.data.channel._id);
      });
  }

  subscribe = (internetConnectionCallback) => {
    console.log(`Subscribing to room ${this.rid}`);
    this.socket.subscribeRoom(this.rid);
    this.connectedListener = this.socket.onStreamData(
      'connect',
      this.handleConnection,
    );
    this.disconnectedListener = this.socket.onStreamData(
      'close',
      internetConnectionCallback,
    );
  };

  handleConnection = () => {
    // this.socket.loadMissedMessages(rid).catch((e) => console.log(e));
    // alert('handleConnection');
    console.log('handleConnection');
  };
  handleDisConnection = () => {
    // this.socket.loadMissedMessages(this.rid).catch((e) => console.log(e));
    // RCUtils.topAlertError('Connection Failure');
    console.log('handleDisConnection');
  };
  handleNotifyRoomReceived = () => {
    // this.socket.loadMissedMessages(this.rid).catch((e) => console.log(e));
    // RCUtils.topAlertError('Connection Failure');
    console.log('handleDisConnection');
  };

  loadHistory = async () => {
    const _room = await this.socket.loadHistory(
      this.rid,
      moment().subtract(100, 'days'),
    );
    return _room;
  };

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  // ------------------ EMITS ------------------

  /**
   *
   *
   * @param {string} message
   */
  sendMessage(
    message: string,
    sendMessageSuccessCallback = undefined,
    sendMessageFailureCallback = undefined,
  ): void {
    this.socket
      .sendMessage(message, this.rid)
      .then((res) => {
        sendMessageSuccessCallback(res);
      })
      .catch((err) => {
        sendMessageFailureCallback(err);
      });
  }

  /**
   *
   *
   * @param {string} message
   * @param {function} onProgressCallBack
   * @memberof SocketIO
   */
  sendFileMessage(attachments, onProgressCallBack) {
    const uploadUrl = `${CHAT_SERVER}/api/v1/rooms.upload/${this.rid}`;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    let myFile = {};

    xhr.open('POST', uploadUrl);

    console.log('uploadUrl' + JSON.stringify(attachments[0]['image_url'].path));
    const imagePath = attachments[0]['image_url'].path;

    myFile = {
      uri: RCUtils.isPlatformIOS() ? `file:/ /${imagePath}` : `${imagePath}`,
      type: attachments[0]['image_url'].mime,
      name: attachments[0]['image_url'].filename,
    };

    console.log('myFile.uri' + JSON.stringify(myFile.uri));

    formData.append('file', myFile);

    xhr.setRequestHeader('X-Auth-Token', RCUtils.getRCToken());
    xhr.setRequestHeader('X-User-Id', RCUtils.getRCId());

    xhr.upload.onprogress = async ({total, loaded}) => {
      try {
        onProgressCallBack((loaded / total) * 100);
      } catch (e) {
        console.log('e' + e);
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        // If response is all good...
        try {
          const response = JSON.parse(xhr.response);
          console.log('response1' + JSON.stringify(response));
        } catch (e) {
          console.log('e1' + e);
        }
      } else {
        try {
          const response = JSON.parse(xhr.response);
          console.log('response2' + JSON.stringify(response));
        } catch (e) {
          console.log('e2' + e);
        }
      }
    };

    xhr.onerror = async (error) => {
      try {
        console.log({error});
        console.log('error json');
        console.log(
          JSON.stringify(error, ['message', 'arguments', 'type', 'name']),
        );
      } catch (e) {
        log(e);
      }
    };
    xhr.send(formData);
  }

  markReadMessages = () => {
    const readMsgUrl = `${CHAT_SERVER}/api/v1/subscriptions.read`;
    const xhr = new XMLHttpRequest();
    console.log('readMsgUrl' + readMsgUrl);

    // var data = new FormData();
    // data.append('rid', this.rid);

    xhr.open('POST', readMsgUrl);

    xhr.setRequestHeader('X-Auth-Token', RCUtils.getRCToken());
    xhr.setRequestHeader('X-User-Id', RCUtils.getRCId());

    xhr.upload.onprogress = async ({total, loaded}) => {
      try {
        console.log('onprogress 1');
      } catch (e) {
        console.log('e' + e);
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        // If response is all good...
        try {
          console.log('xhr.response=====' + xhr.response);
          const response = JSON.parse(xhr.response);
          // console.log({response});
        } catch (e) {
          console.log('e1' + e);
        }
      } else {
        try {
          const response = JSON.parse(xhr.response);
          console.log('response2=====' + JSON.stringify(response));
        } catch (e) {
          console.log('e2' + e);
        }
      }
    };

    xhr.onerror = async (error) => {
      try {
        console.log('onprogress 4');
      } catch (e) {
        console.log('on catch 4' + e);
      }
    };
    console.log({xhr});
    xhr.send(JSON.stringify({rid: this.rid}));
  };

  getUnreadMessagesCount = () => {
    console.log('coming inside');
    const unReadMsgsCountUrl = `${CHAT_SERVER}/api/v1/im.counters?roomId=${this.rid}`;
    const xhr = new XMLHttpRequest();
    console.log('unReadMsgsCountUrl' + unReadMsgsCountUrl);

    xhr.open('GET', unReadMsgsCountUrl);

    xhr.setRequestHeader('X-Auth-Token', RCUtils.getRCToken());
    xhr.setRequestHeader('X-User-Id', RCUtils.getRCId());

    xhr.upload.onprogress = async ({total, loaded}) => {
      try {
        console.log('onprogress 1' + e);
      } catch (e) {
        console.log('e' + e);
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        // If response is all good...
        try {
          console.log('xhr.response=====' + xhr.response);
          const response = JSON.parse(xhr.response);
          // console.log({response});
        } catch (e) {
          console.log('e1' + e);
        }
      } else {
        try {
          const response = JSON.parse(xhr.response);
          console.log('response2=====' + JSON.stringify(response));
        } catch (e) {
          console.log('e2' + e);
        }
      }
    };

    xhr.onerror = async (error) => {
      try {
        console.log('onprogress 4' + e);
      } catch (e) {
        log(e);
      }
    };
    console.log({xhr});
    xhr.send();
  };

  // ------------------ LISTENERS ------------------

  /**
   *
   *
   * @param {function} callback
   * @memberof SocketIO
   */
  onMessageRcv(callback): void {
    this.socket.onStreamData('stream-room-messages', (data) => {
      if (LOG) {
        console.log('stream-room-messages', data);
      }
      if (callback && lastData != data) {
        lastData = data;
        callback(data);
      }
    });
  }

  /**
   *
   *

   * @memberof SocketIO
   */
  onDisconnect(callback): void {
    this.socket.on('disconnect', () => {
      isConnectedWithSocket = false;

      if (LOG) {
        console.log('Disconnect from socket.io');
      }

      if (callback) {
        callback();
      }
    });
  }

  onConnect(callback): void {
    this.socket.on('connect', () => {
      isConnectedWithSocket = true;
      if (LOG) {
        console.log('Connect from socket.io');
      }

      if (callback) {
        callback();
      }
    });
  }

  unsubscribeAll = () => {
    this.removeListener(this.connectedListener);
    this.removeListener(this.disconnectedListener);
    this.removeListener(this.notifyRoomListener);
    this.removeListener(this.messageReceivedListener);
  };
  removeListener = async (promise) => {
    if (promise) {
      try {
        const listener = await promise;
        listener.stop();
      } catch (e) {
        // do nothing
      }
    }
  };
}

export default new RocketChatSocketIO();
