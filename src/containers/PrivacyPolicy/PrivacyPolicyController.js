import React from 'react';
import PropTypes from 'prop-types';
import PrivacyPolicyView from './PrivacyPolicyView';

export default class PrivacyPolicyController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  render() {
    return <PrivacyPolicyView {...this.props} />;
  }
}
