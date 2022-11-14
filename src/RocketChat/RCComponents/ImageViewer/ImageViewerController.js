import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import ImageViewerView from './ImageViewerView';

class ImageViewerController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isImageViewVisible: PropTypes.bool.isRequired,
    setImageViewerVisibility: PropTypes.func.isRequired,
    attachments: PropTypes.array.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ImageViewerView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ImageViewerController);
