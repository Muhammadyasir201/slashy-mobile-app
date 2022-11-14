import React from 'react';
import PropTypes from 'prop-types';
import TermOfUseView from './TermOfUseView';

export default class TermOfUseController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <TermOfUseView {...this.props} />;
  }
}
