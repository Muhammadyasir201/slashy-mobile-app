import React from 'react';
import PropTypes from 'prop-types';
import ShiftListingComponentView from './ShiftListingComponentView';

export default class ShiftListingComponentController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    shiftListing: PropTypes.object.isRequired,
    currentJobTime: PropTypes.object,
    isShowingShiftStatusComponent: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    currentJobTime: {},
  };

  render() {
    return <ShiftListingComponentView {...this.props} />;
  }
}
