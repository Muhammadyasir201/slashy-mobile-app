import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment, {duration} from 'moment';
import ShiftsTimeComponentView from './ShiftsTimeComponentView';
import {strings, SHIFT, CHECK_IN_VISIBILITY_TIME} from '../../constants';
export default class ShiftsTimeComponentController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    shiftStatus: PropTypes.string,
    slotObj: PropTypes.object,
    shift: PropTypes.object,
  };
  static defaultProps = {
    shiftStatus: '',
    slotObj: {},
    shift: {},
  };

  render() {
    const {shiftStatus, slotObj, shift} = this.props;
    return (
      <ShiftsTimeComponentView
        {...this.props}
        shiftStatus={shiftStatus}
        slotObj={slotObj}
        shift={shift}
      />
    );
  }
}
