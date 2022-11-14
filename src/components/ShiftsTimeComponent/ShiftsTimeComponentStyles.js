import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  shiftTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...AppStyles.shadow2,
    borderRadius: Metrics.borderRadius,
  },

  day_time_View: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  dayView: {
    height: 45,
    width: 45,
    borderRadius: 100,
    backgroundColor: Colors.brand.primary,
    marginRight: 10,
    ...AppStyles.centerInner,
  },

  todayText: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
  },

  timeView: {
    alignItems: 'center',
  },

  timeInText: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.quinary,
  },
  shiftCompletedTextStyle: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.green,
    alignSelf: 'flex-end',
  },
  test: {
    fontSize: Fonts.size.xSmall,
  },
  checkInStatusTextStyle: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.secondary,
    fontFamily: Fonts.type.Bold,
  },
  timeTextStyle: {
    fontSize: Fonts.size.small,
    color: Colors.text.primary,
    fontFamily: Fonts.type.Regular,
    lineHeight: 15,
  },
  timingSecView: {
    flexDirection: 'row',
    width: '70%',
  },
  imageStyle: {
    height: 17,
    width: 17,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },
  shiftCompletedSecView: {
    flexDirection: 'row',
    flex: 1,
  },
});
