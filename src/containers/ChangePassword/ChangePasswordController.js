import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import ChangePasswordView from './ChangePasswordView';
import {strings} from '../../constants';
import {changePasswordRequest} from '../../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

class ChangePasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      oldPassword: '',
      newPassword: '',
      reTypeNewPassword: '',
      oldPasswordError: '',
      newPasswordError: '',
      reTypeNewPasswordError: '',
      isOldPasswordVisible: false,
      isNewPasswordVisible: false,
      isReTypeNewPasswordVisible: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  validation = () => {
    let isValid = true;
    this.setState({
      oldPasswordError: '',
      newPasswordError: '',
      reTypeNewPasswordError: '',
    });

    const {oldPassword, newPassword, reTypeNewPassword} = this.state;

    if (_.isEmpty(reTypeNewPassword) || _.isEmpty(reTypeNewPassword.trim())) {
      this.setState({
        reTypeNewPasswordError: strings.RE_TYPE_NEW_PASS_ERROR,
      });
      this.reTypeNewPasswordFocus();
      isValid = false;
    } else if (!util.isPasswordValid(reTypeNewPassword)) {
      this.setState({reTypeNewPasswordError: strings.PASSWORD_LENGTH});
      this.reTypeNewPasswordFocus();
      isValid = false;
    } else if (!util.isStrongPassword(reTypeNewPassword)) {
      this.setState({
        reTypeNewPasswordError:
          strings.PASSWORD_SHOULD_CONTAIN_ONE_CAPITAL_LETTER,
      });
      this.reTypeNewPasswordFocus();
      isValid = false;
    }

    if (_.isEmpty(newPassword) || _.isEmpty(newPassword.trim())) {
      this.setState({
        newPasswordError: strings.NEW_PASS_ERROR,
      });
      this.newPasswordFocus();
      isValid = false;
    } else if (!util.isPasswordValid(newPassword)) {
      this.setState({newPasswordError: strings.PASSWORD_LENGTH});
      this.newPasswordFocus();
      isValid = false;
    } else if (!util.isStrongPassword(newPassword)) {
      this.setState({
        newPasswordError: strings.PASSWORD_SHOULD_CONTAIN_ONE_CAPITAL_LETTER,
      });
      this.newPasswordFocus();
      isValid = false;
    }

    if (_.isEmpty(oldPassword) || _.isEmpty(oldPassword.trim())) {
      isValid = false;
      this.setState({
        oldPasswordError: strings.OLD_PASS_ERROR,
      });
      this.oldPasswordFocus();
    } else if (!util.isPasswordValid(oldPassword)) {
      this.setState({oldPasswordError: strings.INCORRECT_OLD_PASSWORD});
      this.oldPasswordFocus();
      isValid = false;
    } else if (!util.isStrongPassword(oldPassword)) {
      this.setState({
        oldPasswordError: strings.INCORRECT_OLD_PASSWORD,
      });
      this.oldPasswordFocus();
      isValid = false;
    }

    if (!_.isEqual(newPassword, reTypeNewPassword)) {
      util.topAlertError(strings.PASS_NOT_EQUAL_ERROR);
      isValid = false;
    }

    if (_.isEqual(oldPassword, newPassword)) {
      util.topAlertError(strings.PLEASE_PROVIDE_NEW_PASSWORD);
      isValid = false;
    }

    return isValid;
  };

  continueButtonClickHandler = () => {
    const {oldPassword, newPassword} = this.state;
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    if (this.validation()) {
      this.setState({
        isLoading: true,
      });
      this.props.changePasswordRequest(payload, (res) => {
        if (res) {
          Actions.pop();
        }
        this.setState({
          isLoading: false,
        });
      });
    }
  };

  setValue = (key) => {
    this.setState(key);
  };

  oldPasswordFocus = () => {
    this.oldPassRef.focus();
  };
  newPasswordFocus = () => {
    this.newPassRef.focus();
  };
  reTypeNewPasswordFocus = () => {
    this.reTypeNewPassRef.focus();
  };

  render() {
    const {
      oldPassword,
      newPassword,
      reTypeNewPassword,
      oldPasswordError,
      newPasswordError,
      reTypeNewPasswordError,
      isOldPasswordVisible,
      isNewPasswordVisible,
      isReTypeNewPasswordVisible,
      isLoading,
    } = this.state;
    return (
      <ChangePasswordView
        {...this.props}
        oldPassword={oldPassword}
        newPassword={newPassword}
        reTypeNewPassword={reTypeNewPassword}
        oldPasswordError={oldPasswordError}
        newPasswordError={newPasswordError}
        reTypeNewPasswordError={reTypeNewPasswordError}
        isOldPasswordVisible={isOldPasswordVisible}
        isNewPasswordVisible={isNewPasswordVisible}
        isReTypeNewPasswordVisible={isReTypeNewPasswordVisible}
        setValue={this.setValue}
        oldPasswordFocus={this.oldPasswordFocus}
        newPasswordFocus={this.newPasswordFocus}
        reTypeNewPasswordFocus={this.reTypeNewPasswordFocus}
        continueButtonClickHandler={this.continueButtonClickHandler}
        isLoading={isLoading}
        oldPassRef={(ref) => {
          this.oldPassRef = ref;
        }}
        newPassRef={(ref) => {
          this.newPassRef = ref;
        }}
        reTypeNewPassRef={(ref) => {
          this.reTypeNewPassRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = () => ({});

const actions = {
  changePasswordRequest,
};

export default connect(mapStateToProps, actions)(ChangePasswordController);
