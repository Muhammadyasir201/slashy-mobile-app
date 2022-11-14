import React from 'react';
import {Keyboard} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ForgetPasswordView from './ForgetPasswordView';
import util from '../../util';
import {
  forgotPasswordRequest,
  // , testabc
} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {strings} from '../../constants';

class ForgetPasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      email: '',
      emailError: '',
    };
  }
  static propTypes = {};
  static defaultProps = {};

  setValue = (key) => {
    this.setState(key);
  };

  emailFocus = () => {
    this.emailRef.focus();
  };

  handleSubmit = () => {
    this.setState({emailError: ''});
    // if validation pass
    if (this.validation()) {
      this.handleForgotPassRequest();
    }
  };

  validation = () => {
    const {email, emailError} = this.state;
    let error = true;
    if (_.isEmpty(email)) {
      this.setState({emailError: util.isRequiredErrorMessage('Email')});
      this.emailFocus();
      error = false;
    } else if (!util.isEmailValid(email)) {
      this.setState({emailError: strings.VALID_EMAIL_ERROR});
      this.emailFocus();
      error = false;
    }

    return error;
  };

  handleForgotPassRequest = () => {
    const {email} = this.state;

    // loading start
    this.setState({
      isLoading: true,
    });

    const payload = {
      staff_id: email,
    };

    this.props.forgotPasswordRequest(payload, (response) => {
      this.setState({
        isLoading: false,
      });
      if (response) {
        Actions.codeValidation({email: email});
      }
    });
    Keyboard.dismiss();
  };

  render() {
    const {email, emailError, isLoading} = this.state;

    return (
      <ForgetPasswordView
        setValue={this.setValue}
        email={email}
        emailError={emailError}
        handleSubmit={this.handleSubmit}
        emailFocus={this.emailFocus}
        isLoading={isLoading}
        emailRef={(ref) => {
          this.emailRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});
const actions = {
  forgotPasswordRequest,
  // , testabc
};

export default connect(mapStateToProps, actions)(ForgetPasswordController);
