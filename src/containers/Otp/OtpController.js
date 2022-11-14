import React from 'react';
import PropTypes from 'prop-types';
import OtpView from './OtpView';
import {Keyboard, Platform} from 'react-native';
import util from '../../util';
import {
  otpRequest,
  verifyCodeRequest,
  userLoginSuccess,
  userSignupRequest,
} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {SOMETHING_WRONG} from '../../constants';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';

class OtpController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      attempt: 0,
      initial: 60,
      increment: 30,
      reSendActive: false,
      timer: 60,
      showError: false,
      code: props?.data?.otp,
      pass: '',
      responseData: {},
    };
  }
  componentDidMount() {
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.clockCall);
  }
  decrementClock = () => {
    this.setState((prevstate) =>
      prevstate.timer === 0
        ? prevstate.showError
          ? {reSendActive: false}
          : {reSendActive: true}
        : {timer: prevstate.timer - 1},
    ),
      () => {
        if (prevstate.timer === 0) {
          clearInterval(this.clockCall);
        }
      };
  };
  activeResend = () => {};
  static propTypes = {data: PropTypes.object.isRequired};
  static defaultProps = {};
  resendPress = () => {
    const payload = {
      // phone: this.props.data.contact,
      phone: this.props?.data?.contact,
      email: this.props?.data?.email,
      is_staging: false,
    };
    this.state.attempt < 3
      ? this.props.otpRequest(payload, (status, code) => {
          if (status) {
            this.setState((prevstate) => ({
              attempt: prevstate.attempt + 1,
              timer:
                prevstate.initial +
                prevstate.increment * (prevstate.attempt + 1),
              reSendActive: false,
              code: '',
            }));
          }
        })
      : this.setState({showError: true, reSendActive: false});
  };
  codeSubmit = (newCode) => {
    this.setState({
      loading: true,
    });
    Keyboard.dismiss();
    const {data} = this.props;
    const newData = _.cloneDeep(data);
    newData.otp = newCode;
    const documents = [];
    if (this.props.id?.pdf != '') documents.push(this.props.id);
    if (this.props.cv?.pdf != '') documents.push(this.props.cv);
    newData.documents = [...documents];
    this.props.userSignupRequest(newData, (status, data) => {
      //loading state false
      this.setState({
        loading: false,
      });
      this.setState({responseData: {...data}});
      if (status) {
        if (data) {
          if (data.onboarding_status != 'approved') {
            Actions.reset('drawerMenuSecondary');
          }
        } else {
          util.topAlert(SOMETHING_WRONG);
        }
      }
    });
  };
  onSubmit = () => {
    Keyboard.dismiss();

    if (this.state.code.length < 4) {
      util.topAlert('Invalid code');
    }
  };

  onWrongNumberPress = () => {
    Actions.pop();
  };
  render() {
    const {
      showError,
      keyOpen,
      reSendActive,
      timer,
      loading,
      responseData,
    } = this.state;
    return (
      <OtpView
        {...this.props}
        reSendActive={reSendActive}
        timer={timer}
        resendPress={this.resendPress}
        showError={showError}
        codeSubmit={this.codeSubmit}
        onSubmit={this.onSubmit}
        code={this.state.code}
        loading={loading}
        onWrongNumberPress={this.onWrongNumberPress}
        responseData={responseData}
      />
    );
  }
}
const mapStateToProps = ({user}) => ({passData: user.passData});
const actions = {
  otpRequest,

  userSignupRequest,
};
export default connect(mapStateToProps, actions)(OtpController);
