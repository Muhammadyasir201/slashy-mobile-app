import React from 'react';
import PropTypes from 'prop-types';
import ShiftCheckListItemView from './ShiftCheckListItemView';

export default class ShiftCheckListItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    ShiftCheckLists: PropTypes.object.isRequired,
    handleClickCheckbox: PropTypes.func.isRequired,
    isClicked: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ShiftCheckListItemView {...this.props} />;
  }
}
