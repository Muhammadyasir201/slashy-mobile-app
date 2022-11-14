import React from 'react';
import PropTypes from 'prop-types';
import ShiftsListTabsView from './ShiftsListTabsView';

export default class ShiftsListTabsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <ShiftsListTabsView {...this.props} />;
  }
}
