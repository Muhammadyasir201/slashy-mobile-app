import NetInfo from '@react-native-community/netinfo';
import {MessageBarManager} from 'react-native-message-bar';
import moment, {duration} from 'moment';
import {Platform} from 'react-native';
import DataHandler from '../services/DataHandler';
import {MESSAGE_TYPES} from '../constants';
import _ from 'lodash';

class RCUtils {
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }

  isPlatformIOS() {
    return Platform.OS === 'ios';
  }
  getRCToken() {
    return DataHandler.getStore().getState().user.data.rc_auth_token;
  }

  getRCId() {
    return DataHandler.getStore().getState().user.data.rc_id;
  }

  getRCUsername() {
    return DataHandler.getStore().getState().user.data.rc_username;
  }

  getData() {
    return DataHandler.getStore().getState().user.data;
  }
  getUserName() {
    return DataHandler.getStore().getState().user.data.name;
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    MessageBarManager.showAlert({
      message,
      alertType,
    });
  }

  /**
   *
   * @param {String} DateTime ISO String to be converted
   * @param {String} format Expected Format
   */
  ISOToFormat = (DateTime, format) => {
    if (moment(DateTime).format(format) === 'Invalid date') {
      return null;
    } else {
      return moment(DateTime).format(format);
    }
  };
}

export default new RCUtils();
