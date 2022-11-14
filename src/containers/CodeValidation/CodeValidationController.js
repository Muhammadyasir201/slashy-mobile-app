import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Keyboard} from 'react-native';
import _ from 'lodash';
import CodeValidationView from './CodeValidationView';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {strings} from '../../constants';
import {
  forgotPasswordRequest,
  verifyOTPRequest,
} from '../../actions/UserActions';

class CodeValidationController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otpError: '',
      isLoading: false,
      isResetBtnLoading: false,
    };
  }
  static propTypes = {
    email: PropTypes.string.isRequired,
  };
  static defaultProps = {};

  getCode = (code) => {
    this.setState({
      otp: code,
    });
  };

  validation = () => {
    let isValid = true;

    if (_.isNil(this.state.otp) || util.isEmpty(this.state.otp)) {
      isValid = false;
      this.setState({
        otpError: util.isRequiredErrorMessage(strings.CODE),
      });
    } else if (!parseInt(this.state.otp) || this.state.otp.length < 4) {
      isValid = false;
      this.setState({
        otpError: util.isNotValidErrorMessage(strings.CODE),
      });
    } else {
      this.setState({otpError: ''});
    }

    return isValid;
  };

  handleSubmitButton = () => {
    if (this.validation()) {
      this.setState({
        isResetBtnLoading: true,
      });
      const payload = {
        staff_id: this.props.email,
        otp: this.state.otp,
      };

      this.props.verifyOTPRequest(payload, (response) => {
        this.setState({
          isResetBtnLoading: false,
        });
        response && Actions.passwordRecovery({email: this.props.email});
      });
    }
  };

  handleResendOtpRequest = () => {
    const {email} = this.props;
    // loading start
    this.setState({
      isLoading: true,
    });
    const payload = {
      staff_id: email,
    };
    this.props.forgotPasswordRequest(payload, () => {
      this.setState({
        isLoading: false,
      });
    });
    Keyboard.dismiss();
  };

  render() {
    const {otpError, isLoading, isResetBtnLoading} = this.state;
    const {otp} = this.props.user;
    return (
      <CodeValidationView
        {...this.props}
        getCode={this.getCode}
        handleSubmitButton={this.handleSubmitButton}
        onResendBtnPress={this.handleResendOtpRequest}
        otpError={otpError}
        isLoading={isLoading}
        isResetBtnLoading={isResetBtnLoading}
        otp={otp}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {forgotPasswordRequest, verifyOTPRequest};

export default connect(mapStateToProps, actions)(CodeValidationController);
