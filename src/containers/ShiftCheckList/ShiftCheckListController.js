import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ShiftCheckListView from './ShiftCheckListView';
import {connect} from 'react-redux';
import {getShifts} from '../../services/generalHelper';
import {strings, ShiftCheckLists, SHIFT, DATE_FORMAT1} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {shiftListTabs} from '../../components/Tabbar';
import {setSelectedTab} from '../../actions/GeneralActions';
import {
  applyOnShift,
  respondToOffer,
  changeShiftStatusSuccess,
  shouldCallOnEnterSuccess,
} from '../../actions/ShiftsActions';

class ShiftCheckListController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      ShiftCheckLists: ShiftCheckLists(props && props.shift, props.gender),
      loading: false,
    };
  }

  static propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
    isOfferedShift: PropTypes.bool,
  };
  static defaultProps = {
    isOfferedShift: false,
  };

  handleClickCheckbox = (index) => {
    const temp = _.cloneDeep(this.state.ShiftCheckLists);

    temp[index].isClicked = !temp[index].isClicked;

    this.setState({
      ShiftCheckLists: temp,
    });
  };

  isValid = () => {
    const temp = _.cloneDeep(this.state.ShiftCheckLists);

    let isError = _.find(temp, {isClicked: false});

    if (isError) {
      return false;
    }
    return true;
  };

  handleConfirmPress = async () => {
    if (this.isValid()) {
      this.setState({
        loading: true,
      });

      const payload = {
        shift_id: this.props.shiftID,
        accept: true,
      };

      const responseCallback = (isOfferedShift = false) => {
        let selectedTabs = shiftListTabs.myShifts.tabs;
        let activeTabKey = SHIFT.status.UPCOMMING;

        if (!isOfferedShift) {
          selectedTabs = shiftListTabs.search.tabs;
          activeTabKey = SHIFT.status.APPLIED;
          Actions.jump('search', {
            tabs: selectedTabs,
            activeTabKey: activeTabKey,
            shouldReloadTab: new Date(),
          });
        } else {
          this.props.shouldCallOnEnterSuccess();
          Actions.jump('my_shifts', {
            tabs: selectedTabs,
            activeTabKey: activeTabKey,
            shouldReloadTab: new Date(),
          });
        }

        this.setState({
          loading: false,
        });
      };

      if (this.props.isOfferedShift) {
        this.props.respondToOffer(payload, (status, message) => {
          if (status) {
            responseCallback(this.props.isOfferedShift);
          } else {
            // !_.isUndefined(status) &&
            //   setTimeout(() => {
            //     Actions.reset('drawerMenu');
            //   }, 2000);
            this.setState({
              loading: false,
            });
            util.topAlertError(message);
          }
        });
      } else {
        this.props.applyOnShift(payload, (response) => {
          if (response) {
            responseCallback();
          } else {
            this.setState({
              loading: false,
            });
          }
        });
      }
    } else {
      util.topAlertError(strings.ALL_FIELDS_NEEDS_TO_SELECT);
    }
  };

  render() {
    const {shift} = this.props;
    const {ShiftCheckLists, loading} = this.state;
    return (
      <ShiftCheckListView
        {...this.props}
        shift={shift}
        ShiftCheckLists={ShiftCheckLists}
        loading={loading}
        handleClickCheckbox={this.handleClickCheckbox}
        isClicked={this.state.isClicked}
        handleConfirmPress={this.handleConfirmPress}
      />
    );
  }
}

const mapStateToProps = ({shifts, user}, {shiftID}) => ({
  shift: getShifts(shifts.shifts, {id: shiftID}),
  gender: user.data.gender,
});

const actions = {
  setSelectedTab,
  applyOnShift,
  respondToOffer,
  changeShiftStatusSuccess,
  shouldCallOnEnterSuccess,
};

export default connect(mapStateToProps, actions)(ShiftCheckListController);
