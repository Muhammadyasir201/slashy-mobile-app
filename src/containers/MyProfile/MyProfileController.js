import React from 'react';
import PropTypes from 'prop-types';
import MyProfileView from './MyProfileView';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getShifts} from '../../services/generalHelper';
import {SHIFT} from '../../constants';
import {getUserProfileRequest} from '../../actions/UserActions';
import {getShiftsByStatus} from '../../actions/ShiftsActions';
import {setSelectedTab} from '../../actions/GeneralActions';

class MyProfileController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      upcomingShiftsLoading: false,
    };
    MyProfileController.instance = this;
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  static onEnter() {
    if (MyProfileController.instance) {
      MyProfileController.instance._onEnter();
    }
  }

  _onEnter() {
    this.props.setSelectedTab(4);
  }

  static onExit() {
    if (MyProfileController.instance) {
      MyProfileController.instance._onExit();
    }
  }

  _onExit() {}

  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    this.setState({
      loading: true,
      upcomingShiftsLoading: true,
    });

    this.props.getUserProfileRequest({}, () => {
      this.setState({
        loading: false,
      });
    });

    const payload = {
      status: [SHIFT.status.UPCOMMING],
    };

    this.props.getShiftsByStatus(payload, () => {
      this.setState({
        upcomingShiftsLoading: false,
      });
    });
  };

  render() {
    const {user, upcomingShifts} = this.props;
    const {loading, upcomingShiftsLoading} = this.state;
    return (
      <MyProfileView
        {...this.props}
        loading={loading}
        upcomingShiftsLoading={upcomingShiftsLoading}
        user={user}
        upcomingShifts={upcomingShifts}
      />
    );
  }
}

const mapStateToProps = ({user, shifts}) => {
  let upcomingShifts = getShifts(shifts.shifts, {
    status: SHIFT.status.UPCOMMING,
  });
  return {
    user: user.data,
    upcomingShifts: upcomingShifts,
  };
};

const actions = {
  getUserProfileRequest,
  getShiftsByStatus,
  setSelectedTab,
};

export default connect(mapStateToProps, actions)(MyProfileController);
