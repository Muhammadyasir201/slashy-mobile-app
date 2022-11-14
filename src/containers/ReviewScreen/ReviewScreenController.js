import React from 'react';
import PropTypes from 'prop-types';
import ReviewScreenView from './ReviewScreenView';
import {connect} from 'react-redux';
import {getReviewsByRoleIdRequest} from '../../actions/ReviewActions';

class ReviewScreenController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {
    reviews: PropTypes.object.isRequired,
    roleId: PropTypes.number,
  };
  static defaultProps = {
    roleId: null,
  };

  componentDidMount() {
    this.handleDataRequest();
  }

  handleDataRequest = () => {
    this.setState({
      loading: true,
    });
    const {roleId} = this.props;
    const payload = {
      role_id: roleId,
    };
    this.props.getReviewsByRoleIdRequest(payload, () => {
      this.setState({
        loading: false,
      });
    });
  };

  onRefresh = () => {
    this.handleDataRequest();
  };

  render() {
    const {loading} = this.state;
    return (
      <ReviewScreenView
        {...this.props}
        loading={loading}
        reviewList={this.props.reviews}
        onRefresh={this.onRefresh}
      />
    );
  }
}

const mapStateToProps = ({reviews}) => ({
  reviews: reviews.reviews,
});

const actions = {getReviewsByRoleIdRequest};

export default connect(mapStateToProps, actions)(ReviewScreenController);
