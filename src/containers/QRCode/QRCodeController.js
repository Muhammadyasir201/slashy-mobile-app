import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import QRCodeView from './QRCodeView';
import _ from 'lodash';
import {MARK_ATTENDANCE} from '../../actions/ActionTypes';
import {
  markAttendanceRequest,
  shouldCallOnEnterSuccess,
} from '../../actions/ShiftsActions';
import {Actions} from 'react-native-router-flux';
import {shiftListTabs} from '../../components/Tabbar';
import {SHIFT} from '../../constants';
import {setSelectedTab} from '../../actions/GeneralActions';

class QRCodeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static propTypes = {
    isTimeIn: PropTypes.bool,
    slotId: PropTypes.number,
    shift: PropTypes.object,
    shiftStatus: PropTypes.string,
  };
  static defaultProps = {
    isTimeIn: false,
    slotId: null,
    shift: {},
    shiftStatus: '',
  };

  onPress = (qrCodeText) => {
    this.setState({
      loading: true,
    });

    const payload = {
      slot_id: this.props.slotId,
      qrcode: qrCodeText,
      time: moment().format(),
      is_time_in: this.props.isTimeIn,
    };

    this.props.markAttendanceRequest(payload, (response) => {
      if (response) {
        let shouldVisibleSlotCompletionStatus = this.props.isTimeIn
          ? false
          : true;

        Actions.pop();
        Actions.pop();
        Actions.shiftsDescription({
          shiftID: this.props.shift.id,
          shouldVisibleSlotCompletionStatus: shouldVisibleSlotCompletionStatus,
          slotId: this.props.slot_id,
        });
      }
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const {isTimeIn} = this.props;
    const {loading} = this.state;

    return (
      <QRCodeView
        {...this.props}
        isTimeIn={isTimeIn}
        onPress={this.onPress}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = () => ({});

const actions = {
  markAttendanceRequest,
  setSelectedTab,
  shouldCallOnEnterSuccess,
};

export default connect(mapStateToProps, actions)(QRCodeController);
