import _ from 'lodash';
import React from 'react';
import {Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import util from '../../util';
import PropTypes from 'prop-types';
import LoginView from './LoginView';
import {userSigninRequest} from '../../actions/UserActions';
import {strings} from '../../constants';

class LoginController extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      password: '',
      userIdError: '',
      passwordError: '',
      hidePassword: true,
      isLoading: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    // check is user credentials save then fill in field
    const {credentials} = this.props;
    if (!_.isEmpty(credentials)) {
      this.setState({
        userId: credentials.userId,
        password: credentials.password,
      });
    }
  };

  handleShowPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };

  // get value from field and save into states
  setValue = (key) => {
    this.setState(key);
  };

  //  focus on fields
  userIdFocus = () => {
    this.userIdRef.focus();
  };

  passwordFocus = () => {
    this.passRef.focus();
  };

  // validation all login fields
  validation = () => {
    const {userId, password, userIdError, passwordError} = this.state;
    let error = true;
    if (_.isEmpty(userId)) {
      this.setState({userIdError: util.isRequiredErrorMessage('User Id')});
      this.userIdFocus();
      error = false;
    }
    if (!util.isEmailValid(userId)) {
      this.setState({userIdError: strings.ENTER_VALID_EMAIL});
      this.userIdFocus();
      error = false;
    }
    if (_.isEmpty(password)) {
      this.setState({passwordError: util.isRequiredErrorMessage('Password')});
      this.passwordFocus();
      error = false;
    } else if (!util.isPasswordValid(password)) {
      this.setState({passwordError: strings.PASSWORD_LENGTH});
      this.passwordFocus();
      error = false;
    }

    if (_.isEmpty(userId) && _.isEmpty(password)) {
      this.userIdFocus();
    }

    return error;
  };

  handleSubmit = () => {
    // clear all error msg
    this.setState({
      userIdError: '',
      passwordError: '',
    });

    // if validation pass
    if (this.validation()) {
      const {userId, password} = this.state;

      // loading start
      this.setState({
        isLoading: true,
      });
      // hide keyboard
      Keyboard.dismiss();

      const payload = {
        staff_id: userId,
        password: password,
      };

      this.props.userSigninRequest(payload, (response) => {
        if (response) {
          console.log({response});
          if (response.onboarding_status === 'approved') {
            Actions.reset('drawerMenu');
          } else {
            Actions.reset('drawerMenuSecondary');
          }
        }
        this.setState({
          isLoading: false,
        });
      });
    }
  };

  render() {
    const {
      userId,
      password,
      userIdError,
      passwordError,
      hidePassword,
      isLoading,
    } = this.state;

    return (
      <LoginView
        {...this.props}
        setValue={this.setValue}
        userId={userId}
        password={password}
        userIdError={userIdError}
        passwordError={passwordError}
        handleSubmit={this.handleSubmit}
        passwordFocus={this.passwordFocus}
        hidePassword={hidePassword}
        handleShowPassword={this.handleShowPassword}
        isLoading={isLoading}
        userIdRef={(ref) => {
          this.userIdRef = ref;
        }}
        passRef={(ref) => {
          this.passRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  credentials: user.credentials,
  user: user.data,
});

const actions = {
  userSigninRequest,
};

export default connect(mapStateToProps, actions)(LoginController);
