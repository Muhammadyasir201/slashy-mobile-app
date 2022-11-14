import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import StartView from './StartView';
import {getUSerDataRequest} from '../../actions/UserActions';

class StartController extends React.Component {
  static propTypes = {
    appLanguage: PropTypes.string,
  };
  static defaultProps = {};

  componentDidMount() {
    if (!_.isNil(this.props.user.access_token)) {
      this.props.getUSerDataRequest();
    }
  }

  navigate = () => {
    _.isNil(this.props.user.access_token)
      ? Actions.reset('login')
      : this.props.user.onboarding_status === 'approved'
      ? Actions.reset('drawerMenu')
      : Actions.reset('drawerMenuSecondary');
  };

  render() {
    return <StartView {...this.props} navigate={this.navigate} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {getUSerDataRequest};

export default connect(mapStateToProps, actions)(StartController);
