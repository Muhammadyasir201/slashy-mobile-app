import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PasswordRecoveryView from './PasswordRecoveryView';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import util from '../../util';
import {strings} from '../../constants';
import {resetPasswordRequest} from '../../actions/UserActions';
class PasswordRecoveryController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      newPasswordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      loading: false,
      hideNewPassword: true,
      hideConfirmPassword: true,
    };
  }
  static propTypes = {
    email: PropTypes.string.isRequired,
  };
  static defaultProps = {};

  setValue = (key) => {
    this.setState(key);
  };

  newPasswordFocus = () => {
    this.newPasswordRef.focus();
  };

  confirmPasswordFocus = () => {
    this.confirmPasswordRef.focus();
  };

  validation = () => {
    const {newPassword, confirmPassword} = this.state;
    let error = true;

    if (_.isEmpty(confirmPassword)) {
      this.setState({
        confirmPasswordError: util.isRequiredErrorMessage('Password'),
      });
      this.confirmPasswordFocus();
      error = false;
    } else if (!util.isPasswordValid(confirmPassword)) {
      this.setState({confirmPasswordError: strings.PASSWORD_LENGTH});
      this.confirmPasswordFocus();
      error = false;
    }

    if (_.isEmpty(newPassword)) {
      this.setState({
        newPasswordError: util.isRequiredErrorMessage('Password'),
      });
      this.newPasswordFocus();
      error = false;
    } else if (!util.isPasswordValid(newPassword)) {
      this.setState({newPasswordError: strings.PASSWORD_LENGTH});
      this.newPasswordFocus();
      error = false;
    } else if (!util.isStrongPassword(newPassword)) {
      this.setState({
        newPasswordError: strings.PASSWORD_SHOULD_CONTAIN_ONE_CAPITAL_LETTER,
      });
      this.newPasswordFocus();
      error = false;
    }

    if (!_.isEqual(newPassword, confirmPassword)) {
      util.topAlertError(strings.PASSWORD_MATCH_ERROR);
      error = false;
    }

    return error;
  };

  handleSubmitButton = () => {
    this.setState({newPasswordError: '', confirmPasswordError: ''});

    if (this.validation()) {
      this.setState({
        loading: true,
      });

      const {email} = this.props;
      const {confirmPassword} = this.state;

      const payload = {
        staff_id: email,
        password: confirmPassword,
      };

      this.props.resetPasswordRequest(payload, (response) => {
        this.setState({
          loading: false,
        });

        response && Actions.login();
      });
    }
  };

  handleNavBackButton = () => {
    Actions.reset('login');
  };

  render() {
    const {
      newPassword,
      newPasswordError,
      confirmPassword,
      confirmPasswordError,
      loading,
      hideNewPassword,
      hideConfirmPassword,
    } = this.state;
    return (
      <PasswordRecoveryView
        {...this.props}
        setValue={this.setValue}
        newPassword={newPassword}
        loading={loading}
        newPasswordError={newPasswordError}
        confirmPassword={confirmPassword}
        confirmPasswordError={confirmPasswordError}
        hideNewPassword={hideNewPassword}
        hideConfirmPassword={hideConfirmPassword}
        newPasswordFocus={this.newPasswordFocus}
        confirmPasswordFocus={this.confirmPasswordFocus}
        handleSubmitButton={this.handleSubmitButton}
        newPasswordRef={(ref) => {
          this.newPasswordRef = ref;
        }}
        confirmPasswordRef={(ref) => {
          this.confirmPasswordRef = ref;
        }}
        handleNavBackButton={this.handleNavBackButton}
      />
    );
  }
}

const mapStateToProps = () => ({});

const actions = {resetPasswordRequest};

export default connect(mapStateToProps, actions)(PasswordRecoveryController);
