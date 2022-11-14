import React from 'react';
import PropTypes from 'prop-types';
import NotificationItemView from './NotificationItemView';

export default class NotificationItemController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    notifications: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isRead: false,
  };

  render() {
    const {onPress} = this.props;
    return (
      <NotificationItemView
        {...this.props}
        notifications={this.props.notifications}
        onPress={onPress}
      />
    );
  }
}
