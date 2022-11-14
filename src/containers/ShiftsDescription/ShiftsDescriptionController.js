import moment from 'moment';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ShiftsDescriptionView from './ShiftsDescriptionView';
import {Colors, Images} from '../../theme';
import {getShifts, getSlotById} from '../../services/generalHelper';
import {
  strings,
  SHIFT,
  CHECK_IN_VISIBILITY_TIME,
  DATE_FORMAT1,
  TIME_FORMAT3,
} from '../../constants';
import {
  getShiftDetails,
  withdrawOffer,
  respondToOffer,
  cancelShift,
  changeShiftStatusSuccess,
  markAttendanceRequest,
  getShiftsByStatus,
  shouldCallOnEnterSuccess,
  changesAcceptedSuccess,
  changesAcceptedRequest,
} from '../../actions/ShiftsActions';
import {shiftListTabs} from '../../components/Tabbar';
import {setSelectedTab} from '../../actions/GeneralActions';
import util from '../../util';

class ShiftsDescriptionController extends React.Component {
  constructor(props) {
    super(props);
    ShiftsDescriptionController.instance = this;
    this.state = {
      activeIndex: null,
      isModalVisible: false,
      currentJobTime: null,
      availabilityStatus: '',
      selectedDayOfSlot: null,
      loading: true,
      isShiftSlotsLoading: true,
      acceptChangesBtnLoading: false,
    };
  }

  static propTypes = {
    shift: PropTypes.object,
    shiftID: PropTypes.number.isRequired,
    shouldVisibleSlotCompletionStatus: PropTypes.bool,
  };

  static defaultProps = {
    shift: {},
    shouldVisibleSlotCompletionStatus: false,
  };

  buttons = {
    offered: [
      {
        text: SHIFT.buttons.REJECT,
        bgColor: Colors.background.primary,
        textColor: Colors.text.primary,
        button_action: () => {
          this.handleModalVisible();
        },
      },
      {
        text: SHIFT.buttons.ACCEPT,
        bgColor: Colors.brand.primary,
        textColor: Colors.text.tertiary,
        button_action: () => {
          Actions.shiftCheckList({
            shiftID: this.props.shiftID,
            isOfferedShift: true,
          });
        },
      },
    ],
    applied: [
      {
        text: SHIFT.buttons.WITHDRAW,
        bgColor: Colors.brand.primary,
        textColor: Colors.text.tertiary,
        button_action: () => {
          this.handleModalVisible();
        },
      },
    ],
    upcoming: [
      {
        text: SHIFT.buttons.CANCEL_SHIFT,
        bgColor: Colors.background.red,
        textColor: Colors.text.tertiary,
        button_action: () => {
          this.handleModalVisible();
        },
      },
    ],
    past: [],
    ongoing: [],
    browse: [
      {
        //options for browse
        text: SHIFT.buttons.APPLY,
        bgColor: Colors.brand.primary,
        textColor: Colors.text.tertiary,
        button_action: () => {
          Actions.shiftCheckList({shiftID: this.props.shiftID});
        },
      },
    ],
    default: [
      {
        //options for browse
        text: SHIFT.buttons.APPLY,
        bgColor: Colors.brand.primary,
        textColor: Colors.text.tertiary,
        button_action: () => {
          Actions.shiftCheckList({shiftID: this.props.shiftID});
        },
      },
    ],
  };

  cancelShiftModal = () => {};

  modal = () => {
    const {shift} = this.props;
    let shiftWillStartIn = '00 : 00 : 00';
    if (
      _.has(shift, 'slots') &&
      !_.isEmpty(shift.slots) &&
      _.has(shift.slots[0], 'times') &&
      !_.isEmpty(shift.slots[0].times) &&
      _.has(shift.slots[0].times[0], 'from')
    ) {
      let endTime = shift.slots[0].times[0].from;

      var duration = moment.duration(moment(endTime).diff(new Date()));

      var hours = parseInt(duration.asHours());
      var minutes = parseInt(duration.asMinutes()) % 60;
      var seconds = (parseInt(duration.asSeconds()) % 60) % 60;

      shiftWillStartIn = `${hours} : ${minutes} : ${seconds}`;
    }

    let cancelShiftModal = {
      id: 1,
      headerText: 'Are you sure you want to cancel shift?',
      timer: shiftWillStartIn,
      timeDescription: `Penalty will apply when cancelling a shift within 48 hours of shift start time.`,
      negativeButtonText: strings.CANCEL,
      negativeButtonColor: Colors.white,
      negativeButtonAction: () => {
        this.handleModalVisible();
      },
      positiveButtonText: strings.OK,
      positiveButtonColor: Colors.button.primary,
      positiveButtonAction: () => {
        const payload = {
          shift_id: this.props.shiftID,
        };

        this.setState({
          loading: true,
        });

        this.props.cancelShift(payload, (response) => {
          if (response) {
            this.props.shouldCallOnEnterSuccess();
            this.handleModalVisible();
            this.handleInitialRequest();
          } else {
            this.setState({
              loading: false,
            });
          }
        });
      },
      isTimerVisible: true,
    };

    return {
      offered: {
        id: 1,
        headerText: 'Want to reject invite?',
        description: 'Are you sure you want to reject this shift offer?',
        negativeButtonText: strings.NO,
        negativeButtonColor: Colors.white,
        negativeButtonAction: () => {
          this.handleModalVisible();
        },
        positiveButtonText: strings.CONFIRM,
        positiveButtonColor: Colors.brand.primary,
        positiveButtonAction: () => {
          const data = {
            shiftId: this.props.shiftID,
            status: '',
          };

          const payload = {
            shift_id: this.props.shiftID,
            accept: false,
          };
          this.setState({
            loading: true,
          });

          this.props.respondToOffer(payload, (response) => {
            if (response) {
              this.props.changeShiftStatusSuccess(data);
              this.props.shouldCallOnEnterSuccess();
              Actions.jump('search', {
                activeTabKey: SHIFT.status.OFFERED,
                tabs: shiftListTabs.search.tabs,
                shouldReloadTab: new Date(),
              });
            } else {
              Actions.pop();
            }
            this.setState({
              loading: false,
            });
          });
          this.handleModalVisible();
        },
      },
      applied: {
        id: 1,
        headerText: 'Withdraw Application',
        description: 'Are you sure you want to withdraw your application?',
        negativeButtonText: strings.CANCEL,
        negativeButtonColor: Colors.white,
        negativeButtonAction: () => {
          this.handleModalVisible();
        },
        positiveButtonText: strings.OK,
        positiveButtonColor: Colors.brand.primary,
        positiveButtonAction: () => {
          this.handleModalVisible();

          this.setState({
            loading: true,
          });
          const payload = {shift_id: this.props.shiftID};
          this.props.withdrawOffer(payload, (response) => {
            const data = {
              shiftId: this.props.shiftID,
              status: '',
            };
            this.props.changeShiftStatusSuccess(data);

            let selectedTabs = shiftListTabs.search;
            selectedTabs.activeTabKey = SHIFT.status.APPLIED;

            if (response) {
              this.props.shouldCallOnEnterSuccess();

              Actions.jump('search', {
                tabs: shiftListTabs.search.tabs,
                activeTabKey: SHIFT.status.APPLIED,
                shouldReloadTab: new Date(),
              });
            }
            this.setState({
              loading: false,
            });
          });
        },
      },
      upcoming: cancelShiftModal,
      ongoing: cancelShiftModal,
    };
  };

  static onEnter() {
    if (ShiftsDescriptionController.instance) {
      ShiftsDescriptionController.instance._onEnter();
    }
  }

  _onEnter() {
    if (this.props.shouldCallOnEnter) {
      this.setState({
        isShiftSlotsLoading: true,
      });
      this.handleInitialRequest();
    }
  }

  static onExit() {
    if (ShiftsDescriptionController.instance) {
      ShiftsDescriptionController.instance._onExit();
    }
  }

  _onExit() {}

  componentDidMount() {
    if (_.isNil(this.props.shiftID)) {
      util.topAlertError(`Invalid Shift Data`);
      Actions.pop();
    } else {
      this.handleInitialRequest();
    }
  }

  handleInitialRequest = () => {
    this.setState({
      loading: true,
    });
    const payload = {
      id: this.props.shiftID,
    };
    this.props.getShiftDetails(payload, (response) => {
      if (response) {
        this.setState({
          shift: this.props.shift,
        });
        this.isTodaySlotAvailable();
      } else {
        Actions.pop();
      }
      this.setState({
        loading: false,
      });
    });
  };

  handleModalVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  isTodaySlotAvailable = async () => {
    const {ongoingEvent, slotId} = this.props;

    let slotsArr = this.props.shift.slots;

    let today = _.find(slotsArr, (slot) => moment().isSame(slot.day, 'day'));
    let selectedSlotObj = null;

    //time in but not timeout
    if (!_.isNil(ongoingEvent) && !_.isEmpty(ongoingEvent)) {
      selectedSlotObj = ongoingEvent;
    } else if (!_.isNil(slotId)) {
      //if slot is completed then get recent timed out slot
      selectedSlotObj = getSlotById(slotsArr, slotId);
    } else if (!_.isNil(today)) {
      // 20 mins remining in next shift time in
      let currentJobTime = await _.find(today.times, (time) => {
        let diffInTimeFrom = moment(time.from).diff(moment(), 'minutes');
        let diffInTimeTo = moment().isSameOrAfter(moment(time.to));

        if (this.props.shift.state === SHIFT.state.COMPLETED) {
          return diffInTimeFrom < CHECK_IN_VISIBILITY_TIME;
        }

        return diffInTimeFrom < CHECK_IN_VISIBILITY_TIME && !diffInTimeTo;
      });

      if (this.props.shift.state === SHIFT.state.COMPLETED) {
        let timesArr = slotsArr[0].times;
        selectedSlotObj = timesArr[timesArr.length - 1];
      } else {
        selectedSlotObj = currentJobTime;
      }
    } else if (this.props.shift.state === SHIFT.state.COMPLETED) {
      //if shift is completed then show last index of slot
      let timesArr = slotsArr[0].times;
      selectedSlotObj = timesArr[timesArr.length - 1];
    }

    if (!_.isNil(selectedSlotObj))
      await this.getSlotAvailablityStatus(selectedSlotObj);
  };

  getSlotAvailablityStatus = async (slotObj) => {
    let availabilityStatus = '';

    if (_.isNil(slotObj.time_in)) {
      availabilityStatus = SHIFT.shiftAttendanceStatus.TIME_IN;
    } else if (!_.isNil(slotObj.time_in) && _.isNil(slotObj.time_out)) {
      availabilityStatus = SHIFT.shiftAttendanceStatus.TIME_OUT;
    } else if (this.props.shift.state === SHIFT.state.COMPLETED) {
      availabilityStatus = SHIFT.shiftAttendanceStatus.SHIFT_COMPLETED;
    } else if (!_.isNil(slotObj.time_in) && !_.isNil(slotObj.time_out)) {
      availabilityStatus = SHIFT.shiftAttendanceStatus.SLOT_COMPLETED;
    }
    this.setState({
      availabilityStatus: availabilityStatus,
      currentJobTime: slotObj,
      isShiftSlotsLoading: false,
    });
  };

  setSelectedSlotDay = (selectedDay) => {
    this.setState({
      selectedDayOfSlot: selectedDay,
    });
  };

  onRefresh = () => {
    this.handleInitialRequest();
  };

  acceptChangesClickHandler = () => {
    this.setState({
      acceptChangesBtnLoading: true,
    });
    const {shift} = this.props;
    const {id} = shift;
    const payload = {
      shift: id,
    };

    this.props.changesAcceptedRequest(payload, (res) => {
      this.setState({
        acceptChangesBtnLoading: false,
      });
    });
  };

  render() {
    const {
      activeIndex,
      currentJobTime,
      availabilityStatus,
      isModalVisible,
      selectedDayOfSlot,
      loading,
      isShiftSlotsLoading,
      acceptChangesBtnLoading,
    } = this.state;
    const {
      shift,
      gender,
      shouldVisibleSlotCompletionStatus,
      changesAccepted,
    } = this.props;

    return (
      <ShiftsDescriptionView
        {...this.props}
        activeIndex={activeIndex}
        availabilityStatus={availabilityStatus}
        isShiftSlotsLoading={isShiftSlotsLoading}
        acceptChangesBtnLoading={acceptChangesBtnLoading}
        shift={shift}
        gender={gender}
        shouldVisibleSlotCompletionStatus={shouldVisibleSlotCompletionStatus}
        isModalVisible={isModalVisible}
        selectedDayOfSlot={selectedDayOfSlot}
        modal={this.modal}
        setSelectedSlotDay={this.setSelectedSlotDay}
        onRefresh={this.onRefresh}
        handleModalVisible={this.handleModalVisible}
        buttons={this.buttons}
        currentJobTime={currentJobTime}
        loading={loading}
        changesAccepted={changesAccepted}
        acceptChangesClickHandler={this.acceptChangesClickHandler}
      />
    );
  }
}

const mapStateToProps = ({shifts, user}, {shiftID}) => {
  let mShift = getShifts(shifts.shifts, {id: shiftID});
  return {
    shift: mShift,
    gender: user.data.gender,
    changesAccepted: _.has(mShift, 'changes_accepted')
      ? mShift.changes_accepted
      : true,
    shouldCallOnEnter: shifts.shouldCallOnEnter,
  };
};

const actions = {
  getShiftDetails,
  withdrawOffer,
  respondToOffer,
  cancelShift,
  changeShiftStatusSuccess,
  markAttendanceRequest,
  setSelectedTab,
  getShiftsByStatus,
  shouldCallOnEnterSuccess,
  changesAcceptedRequest,
  changesAcceptedSuccess,
};

export default connect(mapStateToProps, actions)(ShiftsDescriptionController);
