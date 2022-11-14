// @flow
import _ from 'lodash';
import {create} from 'apisauce';
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
} from '../config/WebService';
import DataHandler from './DataHandler';
import {userSignOutSuccess} from '../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import util from '../util';
import {strings} from '../constants';
import {alertMessage} from '../actions/GeneralActions';
import NetInfo from '@react-native-community/netinfo';

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

const onForbidden = async () => {
  const newToken = await util.refreshAccessToken();
  if (newToken) {
    return newToken;
  }
  // await Util.resetGenericPassword();
  Actions.reset('login');
  return false;
};

const checkConnectivity = () => {
  console.warn('checkConnectivity');

  NetInfo.fetch().then((state) => {
    console.warn('Connection type', state.type);
    console.warn('Is connected?', state.isConnected);

    if (state.isConnected) {
      // Actions.reset('noConnection');
    } else {
      Actions.reset('noConnection');
    }
  });
};

class ApiSauce {
  async post(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.post(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    if (response.status === 403) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();
        console.log({newToken});

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        Util.topAlertError('Network error');
      }

      const responseNew = await api.post(url, data, {
        headers,
      });
      console.log({responseNew});
      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async get(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.get(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  async delete(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.delete(
      url,
      {},
      {
        headers,
      },
    );

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  async put(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.put(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    return this.manipulateResponse(response);
  }

  manipulateResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        if (
          response.status === 401 &&
          response.data.message === 'Unauthenticated'
        ) {
          // session expired, logout user forcefully
          // logoutUserHelper();

          DataHandler.getStore().dispatch(userSignOutSuccess());
          Actions.reset('login');
        }
        if (response.status === 403) {
          // session expired, logout user forcefully
          // logoutUserHelper();

          DataHandler.getStore().dispatch(userSignOutSuccess());
          Actions.reset('login');
        }

        if (response.status === 500) {
          alert('hussain');
          DataHandler.getStore().dispatch(
            alertMessage(ERROR_SOMETHING_WENT_WRONG),
          );
        }

        if (response.problem === 'NETWORK_ERROR') {
          // Actions.reset('noConnection');
          console.warn('NETWORK_ERROR');
          checkConnectivity();
          // reject(ERROR_NETWORK_NOT_AVAILABLE);
        }

        reject(response.data);
      }
    });
  }
}

export default new ApiSauce();
