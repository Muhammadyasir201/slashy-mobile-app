import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    ...AppStyles.pLeft15,
    ...AppStyles.pRight15,
    ...AppStyles.pTop5,
  },

  slotsContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius,
    ...AppStyles.basePadding,
    ...AppStyles.shadow2,
    ...AppStyles.mTop10,
    ...AppStyles.mBottom5,
  },

  slotDay: {
    width: 57,
    height: 58,
    borderRadius: 50,
    backgroundColor: Colors.background.secondary,
    ...AppStyles.centerInner,
  },
  selectedSlotStyle: {
    backgroundColor: Colors.brand.primary,
  },
  selectedSlotTextStyle: {
    color: Colors.text.tertiary,
  },
  tooltipText: {
    fontSize: Fonts.size.xxSmall,
    padding: 5,
  },

  timeDot: {
    backgroundColor: Colors.brand.primary,
    height: 9,
    width: 9,
    borderRadius: 100,
    margin: 2,
  },

  timeSlotText: {
    fontSize: Fonts.size.xxxSmall,
  },

  arrow: {},

  calenderView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.background.primary,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 5,
    ...AppStyles.shadow2,
  },

  calender: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: Colors.background.secondary,
  },

  calenderDay: {
    fontSize: 10,
    lineHeight: 13,
    fontFamily: Fonts.type.SemiBold,
    color: Colors.text.primary,
  },

  calenderDate: {
    fontSize: 14,
    lineHeight: 13,
    color: Colors.brand.primary,
    fontFamily: Fonts.type.SemiBold,
    ...AppStyles.pTop5,
  },

  calenderMonth: {
    fontSize: 10,
    lineHeight: 13,
    fontFamily: Fonts.type.SemiBold,
    color: Colors.text.primary,
  },

  shiftTimeView: {
    marginTop: Metrics.smallMargin + 1,
  },

  ShiftListingView: {
    // ...AppStyles.mTop10,
    ...AppStyles.mBottom5,
  },

  ShiftListingBackground: {
    backgroundColor: Colors.background.primary,
    borderRadius: 10,
    marginTop: 10,
    ...AppStyles.shadow2,
  },

  detailWraper: {
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadius,
    ...AppStyles.pBottom20,
    ...AppStyles.shadow2,
    ...AppStyles.mTop5,
  },

  detailHeading: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.secondary,
    ...AppStyles.mBottom10,
    ...AppStyles.mTop20,
  },

  detailText: {
    fontSize: Fonts.size.xSmall,
    lineHeight: 20,
  },

  map: {
    flex: 1,
    ...AppStyles.mTop20,
  },

  mapDirectionView: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.brand.primary,
  },

  mapDirection: {
    fontSize: Fonts.size.xxxxSmall,
    color: Colors.white,
  },

  buttonWraper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },

  buttonStyle: {
    paddingVertical: 14,
    borderRadius: 5,
    backgroundColor: Colors.background.primary,
    ...AppStyles.shadow2,
    ...AppStyles.centerInner,
    flex: 1,
    margin: 10,
  },

  AcceptButton: {
    paddingHorizontal: 45,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.brand.primary,
    ...AppStyles.shadow2,
    ...AppStyles.centerInner,
  },

  rejectButtonText: {
    fontSize: Fonts.size.xSmall,
  },

  AcceptButtonText: {
    fontSize: Fonts.size.xSmall,
    color: Colors.white,
  },
  bottomSecViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    ...AppStyles.mBottom20,
  },
  acceptBtnSecViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    ...AppStyles.mTop10,
    ...AppStyles.mBottom0,
  },

  horizontalLine: {
    marginLeft: 12,
    marginRight: 12,
    height: 1,
    backgroundColor: Colors.background.quinary,
  },
  popOverStyle: {
    borderRadius: Metrics.borderRadius,
    padding: Metrics.smallMargin,
  },
});
