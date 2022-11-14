import React from 'react';
import PropTypes from 'prop-types';
import ComfirmationModalView from './ComfirmationModalView';

export default class ComfirmationModalController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
    handleModalVisible: PropTypes.func.isRequired,
    modal: PropTypes.object,
    isTimerVisible: PropTypes.bool,
  };
  static defaultProps = {
    modal: {},
    isTimerVisible: false,
  };

  render() {
    return <ComfirmationModalView {...this.props} />;
  }
}
