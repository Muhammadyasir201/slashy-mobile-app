import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import OverdueView from './OverdueView';
import {getMonthlyEarningsRequest} from '../../actions/EarningsActions';

class OverdueController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      overdueShifts: props.overdue,
    };
  }

  static propTypes = {
    overdueShifts: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.overdue, this.props.overdue)) {
      const {overdue} = this.props;
      this.setState({
        overdueShifts: overdue,
      });
    }
  }

  handleDataRequest = () => {
    this.setState({
      loading: true,
    });
    this.props.getMonthlyEarningsRequest({}, () => {
      this.setState({
        loading: false,
      });
    });
  };

  onRefresh = () => {
    this.handleDataRequest();
  };

  render() {
    const {loading, overdueShifts} = this.state;
    return (
      <OverdueView
        {...this.props}
        overdueShiftsList={overdueShifts}
        loading={loading}
        _handleRefresh={this.onRefresh}
      />
    );
  }
}

const mapStateToProps = ({earnings}) => {
  const {overdue} = earnings;
  return {
    overdue: overdue,
  };
};

const actions = {getMonthlyEarningsRequest};

export default connect(mapStateToProps, actions)(OverdueController);
