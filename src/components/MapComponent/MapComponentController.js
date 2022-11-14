import React from 'react';
import PropTypes from 'prop-types';
import MapComponentView from './MapComponentView';

export default class MapComponentController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    coordinates: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  render() {
    return <MapComponentView {...this.props} />;
  }
}
