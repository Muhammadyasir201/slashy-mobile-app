import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import VideoMessageView from './VideoMessageView';

class VideoMessageController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    isMyMsg: PropTypes.bool,
    item: PropTypes.object,
    setVideoModalVisibility: PropTypes.func,
  };
  static defaultProps = {
    isMyMsg: false,
    item: {},
    setVideoModalVisibility: () => {},
  };

  render() {
    return <VideoMessageView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(VideoMessageController);
