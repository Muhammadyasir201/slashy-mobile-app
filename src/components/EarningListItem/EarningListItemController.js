import React from 'react';
import PropTypes from 'prop-types';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import EarningListItemView from './EarningListItemView';
import {getInvoicePdfRequest} from '../../actions/EarningsActions';

class EarningListItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingPdfId: -1,
    };
  }
  static propTypes = {
    listItem: PropTypes.object,
  };
  static defaultProps = {
    listItem: {},
  };

  onPdfIconClick = (invoiceId) => {
    this.setState({
      loadingPdfId: invoiceId,
    });
    const payload = {payslip: invoiceId};
    this.props.getInvoicePdfRequest(payload, (response) => {
      _.has(response, 'pdf') && Linking.openURL(response.pdf);
      this.setState({
        loadingPdfId: -1,
      });
    });
  };

  render() {
    const {listItem} = this.props;
    const {loadingPdfId} = this.state;
    return (
      <EarningListItemView
        {...this.props}
        listItem={listItem}
        loadingPdfId={loadingPdfId}
        onPdfIconClick={this.onPdfIconClick}
      />
    );
  }
}

const mapStateToProps = ({user}, ownProps) => {
  return {};
};
const actions = {
  getInvoicePdfRequest,
};

export default connect(mapStateToProps, actions)(EarningListItemController);
