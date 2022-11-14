import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ShiftsListsItemView from './ShiftsListsItemView';
import {upcomingShiftRemainingTime} from '../../services/generalHelper';
import moment from 'moment';

export default class ShiftsListsItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      recentSlotStatus: null,
      recentSlotText: '',
    };
  }
  static propTypes = {
    shift: PropTypes.object.isRequired,
    navigateOnPress: PropTypes.bool,
    noOfShifts: PropTypes.number.isRequired,
    currentJobTime: PropTypes.object,
    makeSlotCompletionStatusVisible: PropTypes.bool,
  };

  static defaultProps = {
    navigateOnPress: true,
    currentJobTime: {},
    makeSlotCompletionStatusVisible: false,
  };

  getRecentShiftText = (shifts) => {
    if (!_.has(shifts, 'slots')) return;
    let upcommingRecentSlot = upcomingShiftRemainingTime(shifts.slots);

    if (_.isNil(upcommingRecentSlot)) {
      this.setState({recentSlotText: ''});
      return;
    }
    // get time difference between current time and from time
    let recentShiftTime = moment(upcommingRecentSlot.from).diff(
      moment(),
      'hours',
    );

    // if time diffrence is greater or equals than 1, set recentSlotStatus
    // if time diffrence is less than 1, set recentSlotStatus
    if (recentShiftTime >= 1) {
      this.setState({
        recentSlotText: `Start in ${recentShiftTime} hours`,
      });
    } else {
      this.setState({recentSlotText: `Less than an hour`});
    }
  };

  componentDidMount() {
    this.getRecentShiftText(this.props.shift);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shift !== this.props.shift) {
      this.getRecentShiftText(this.props.shift);
    }
  }

  render() {
    const {recentSlotText} = this.state;

    return (
      <ShiftsListsItemView {...this.props} recentSlotText={recentSlotText} />
    );
  }
}
