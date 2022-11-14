import React from 'react';
import PropTypes from 'prop-types';
import ReviewListItemView from './ReviewListItemView';

export default class ReviewListItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    reviewItemObj: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  render() {
    return <ReviewListItemView {...this.props} />;
  }
}
