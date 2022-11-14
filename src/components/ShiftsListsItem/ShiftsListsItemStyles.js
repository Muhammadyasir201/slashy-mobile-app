import {StyleSheet} from 'react-native';
import {Fonts, Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadius,
    ...AppStyles.basePadding,
    ...AppStyles.shadow2,
    ...AppStyles.mTop10,
  },

  timeWraper: {
    flex: 1,
    ...AppStyles.pLeft15,
  },

  timeWraperHeading: {
    fontSize: Fonts.size.xSmall,
  },

  timeWraperTiming: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.primary,
    marginTop: 3,
  },

  timeWraperMultiTime: {
    fontSize: Fonts.size.xxxSmall,
    lineHeight: 18,
  },

  imageStyle: {width: 50, height: 50},

  timeWraperHours: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.brand.primary,
    lineHeight: 18,
  },

  paymentView: {
    alignItems: 'center',
  },

  footerPriceNum: {
    fontSize: Fonts.size.normal,
    color: Colors.brand.primary,
    lineHeight: 18,
    alignSelf: 'flex-end',
  },

  footerPrice: {
    fontSize: Fonts.size.xxxSmall,
    lineHeight: 12,
  },
  shiftStateTextStyle: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.green,
    paddingTop: 2,
  },
  shiftStatusStyle: {
    fontSize: Fonts.size.medium,
    color: Colors.text.tertiary,
  },
  shiftStatusSecViewStyle: {
    height: 50,
    flex: 1,
    marginTop: -5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
