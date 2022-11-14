import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import ImageMessageView from './ImageMessageView';

class ImageMessageController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isMyMsg: PropTypes.bool,
    item: PropTypes.object,
    setImageObjectForImageViewer: PropTypes.func,
    setImageViewerVisibility: PropTypes.func,
  };
  static defaultProps = {
    isMyMsg: false,
    item: {},
    setImageObjectForImageViewer: () => {},
    setImageViewerVisibility: () => {},
  };

  render() {
    return <ImageMessageView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ImageMessageController);
