// @flow
import {Platform, Linking} from 'react-native';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
import DataHandler from '../services/DataHandler';
import {MESSAGE_TYPES, DISCARD_WARNING} from '../constants';
import _ from 'lodash';

class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isValidURL(url: 'string') {
    const re = /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length > 5;
  }
  isValidName(name) {
    return /^[a-zA-Z '.-]*$/.test(name);
  }

  notificationCounter = (count) => {
    if (count >= 99) {
      return `99+`;
    } else {
      return count;
    }
  };

  topAlert(message, action) {
    if (action) {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'ok',
          textColor: 'white',
          onPress: () => null,
        },
      });
    } else {
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  getErrorText(ErrMessage) {
    return ErrMessage;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return '';
  };

  getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return '';
  };

  isEmpty(value) {
    return value == '';
  }

  showLoader = (instance, loadingFor = '') => {
    if (!instance.state.loading) {
      instance.setState({
        loading: true,
        loadingFor,
      });
    }
  };

  hideLoader = (instance, callback) => {
    if (instance.state.loading) {
      instance.setState(
        {
          loading: false,
          loadingFor: '',
        },
        callback,
      );
    }
  };

  arrayLastIndex = (array) => {
    return array.length - 1;
  };

  ISOToFormat = (DateTime, format) => {
    if (!_.isNil(DateTime)) {
      if (moment(DateTime).format(format) === 'Invalid date') {
        return null;
      } else {
        return moment(DateTime).format(format);
      }
    }
  };

  getCurrentUserAccessToken() {
    return DataHandler.getStore().getState().user.data.access_token;
  }

  isNumber(val) {
    return /^\d+$/.test(val);
  }

  openLinkInBrowser(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }

  generateGetParameter(obj) {
    let final = '?';
    for (const key in obj) {
      final = `${final}${key}=${obj[key]}&`;
    }
    final = final.slice(0, -1);
    return final;
  }

  generateGuid() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  isRequiredErrorMessage(fieldName) {
    return `${this.capitalizeFirstLetter(fieldName)} is required`;
  }

  isNotValidErrorMessage(fieldName) {
    return `${this.capitalizeFirstLetter(fieldName)} is not valid`;
  }

  isStrongPassword(password) {
    return (
      (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) ||
      password.match(/^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/)
    );
  }

  getRCToken() {
    console.log({
      rc_auth_token_utils: DataHandler.getStore().getState().user.data
        .rc_auth_token,
    });
    return DataHandler.getStore().getState().user.data.rc_auth_token;
  }
}

export default new Util();
