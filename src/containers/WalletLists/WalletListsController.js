import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import WalletListsView from './WalletListsView';
import {WALLET, strings} from '../../constants';
import {Colors} from '../../theme';
import {
  getMonthlyEarningsRequest,
  requestEarlyPayment,
  getAllPaySlipsRequest,
} from '../../actions/EarningsActions';
import {setSelectedTab} from '../../actions/GeneralActions';

class WalletListsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: props.tabs.activeTabKey,
      invoice: props.invoice,
      payslips: props.payslips,
      overdue: props.overdue,
      isModalVisible: false,
      isOkBtnModalVisible: false,
      loading: false,
    };

    WalletListsController.instance = this;
  }

  static propTypes = {
    payDay: PropTypes.string.isRequired,
    totalEarning: PropTypes.string.isRequired,
    invoice: PropTypes.array.isRequired,
    overdue: PropTypes.array.isRequired,
    payslips: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    earlyPaymentRequested: PropTypes.bool.isRequired,
  };

  static defaultProps = {};

  static onEnter() {
    if (WalletListsController.instance) {
      WalletListsController.instance._onEnter();
    }
  }

  _onEnter() {
    this.props.setSelectedTab(1);
  }

  static onExit() {
    if (WalletListsController.instance) {
      WalletListsController.instance._onExit();
    }
  }

  _onExit() {}

  componentDidMount() {
    this.handleInitialRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTabKey !== this.state.activeTabKey) {
      const {activeTabKey} = this.state;
      if (_.isEmpty(this.state[activeTabKey])) {
        this.handleInitialRequest();
      }
    }

    if (prevProps.tabs.activeTabKey !== this.props.tabs.activeTabKey) {
      this.handleInitialRequest();
    }

    if (!_.isEqual(this.props.invoice, prevProps.invoice)) {
      this.setState({
        invoice: this.props.invoice,
        overdue: this.props.overdue,
      });
    }

    if (!_.isEqual(this.props.payslips, prevProps.payslips)) {
      this.setState({
        payslips: this.props.payslips,
      });
    }

    if (this.props.dateToReRender !== prevProps.dateToReRender) {
      this.handleInitialRequest();
    }
  }

  handleInitialRequest = () => {
    this.setState({
      loading: true,
    });

    const {activeTabKey} = this.state;

    if (_.isEqual(activeTabKey, WALLET.INVOICE)) {
      this.props.getMonthlyEarningsRequest({}, () => {
        this.setState({
          loading: false,
        });
      });
      this.props.setSelectedTab(1);
    } else {
      this.props.getAllPaySlipsRequest({}, () => {
        this.setState({
          loading: false,
        });
      });
      this.props.setSelectedTab(1);
    }
  };

  setValue = (obj) => {
    this.setState(obj);
  };

  emptyStates = {
    invoice: {
      image: '',
      text: strings.NO_MONTHLY_EARNINGS,
      button_text: strings.MONTHLY_EARNINGS,
      button_action: () => {
        this.setValue({activeTabKey: null});
      },
    },
    payslips: {
      image: '',
      text: strings.NO_PAY_SLIPS,
      button_text: strings.PAY_SLIPS,
      button_action: () => {
        this.setValue({activeTabKey: null});
      },
    },
    default: {
      image: '',
      text: strings.NO_EARNINGS_FOUND,
      button_text: null,
      button_action: null,
    },
  };

  modal = () => {
    return {
      invoice: {
        id: 1,
        headerText: 'Request Early Payment',
        description:
          'Are you sure you want to make a request for early payment? ',
        negativeButtonText: strings.NO,
        negativeButtonColor: Colors.white,
        negativeButtonAction: () => {
          this.handleModalVisible();
        },
        positiveButtonText: strings.YES,
        positiveButtonColor: Colors.brand.primary,
        positiveButtonAction: () => {
          this.handleModalVisible();
          this.setState({
            loading: true,
          });
          this.props.requestEarlyPayment({}, (response) => {
            if (response) {
              this.setState({
                isOkBtnModalVisible: !this.state.isOkBtnModalVisible,
              });
            }
            this.setState({
              loading: false,
            });
          });
        },
      },

      ok_btn: {
        id: 1,
        headerText: 'Need money now?',
        description: strings.NEED_MONEY_NOW,
        negativeButtonText: '',
        negativeButtonColor: Colors.white,
        negativeButtonAction: () => {
          this.setOkBtnModalVisibility();
        },
        positiveButtonText: strings.OK,
        positiveButtonColor: Colors.brand.primary,
        positiveButtonAction: () => {
          this.setOkBtnModalVisibility();
        },
      },
    };
  };

  setOkBtnModalVisibility = () => {
    this.setState({
      isOkBtnModalVisible: !this.state.isOkBtnModalVisible,
    });
    this.handleInitialRequest();
  };

  handleModalVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onRefresh = () => {
    this.handleInitialRequest();
  };

  render() {
    const {
      isModalVisible,
      loading,
      isOkBtnModalVisible,
      overdue,
      invoice,
      payslips,
    } = this.state;
    const {earlyPaymentRequested, payDay, totalEarning} = this.props;
    return (
      <WalletListsView
        {...this.props}
        invoice={invoice}
        payslips={payslips}
        totalEarning={totalEarning}
        payDay={payDay}
        overdue={overdue}
        tabbar={this.props.tabs}
        activeTabKey={this.state.activeTabKey}
        setValue={this.setValue}
        emptyStates={this.emptyStates}
        modal={this.modal}
        isModalVisible={isModalVisible}
        isOkBtnModalVisible={isOkBtnModalVisible}
        early_payment_requested={earlyPaymentRequested}
        loading={loading}
        onRefresh={this.onRefresh}
        handleModalVisible={this.handleModalVisible}
      />
    );
  }
}

const mapStateToProps = ({earnings, user}, ownProps) => {
  const {
    payDay,
    totalEarning,
    invoice,
    overdue,
    payslips,
    earlyPaymentRequested,
  } = earnings;
  return {
    payDay: payDay,
    totalEarning: totalEarning,
    invoice: invoice,
    overdue: overdue,
    payslips: payslips,
    earlyPaymentRequested: earlyPaymentRequested,
  };
};
const actions = {
  getMonthlyEarningsRequest,
  getAllPaySlipsRequest,
  requestEarlyPayment,
  setSelectedTab,
};

export default connect(mapStateToProps, actions)(WalletListsController);
