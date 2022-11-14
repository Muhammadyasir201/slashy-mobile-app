import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.secondary,
    ...AppStyles.mLeft20,
    ...AppStyles.mRight20,
    ...AppStyles.mTop10,
  },
  activeTab: {
    color: Colors.brand.primary,
    borderBottomColor: Colors.brand.primary,
    borderBottomWidth: 3,
  },

  mLineHeight20: {
    lineHeight: 20,
  },
  monthlyEarningView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    ...AppStyles.shadow1,
  },
  monthlyEarningDateWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Day_Mouth_text: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.primary,
  },
  date_Price_Text: {
    fontSize: Fonts.size.xSmall,
    color: Colors.brand.primary,
  },

  monthlyEarningprice: {
    fontSize: Fonts.size.xxLarge,
    color: Colors.brand.primary,
  },
  monthlyEarningMouthWraper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nextPayDaySec: {
    paddingLeft: 10,
  },
  listSecView: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.background.secondary,
  },
  loaderSecView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background.secondary,
  },
  financialStatsStyleSec: {backgroundColor: Colors.background.secondary},
  dateWraper: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    marginTop: 1,
    ...AppStyles.shadow2,
    ...AppStyles.basePadding,
    ...AppStyles.spaceBetween,
    height: 112,
  },
  nextPayDayText: {
    fontSize: Fonts.size.xxxSmall,
  },
  data: {
    fontSize: Fonts.size.xSmall,
    color: Colors.brand.primary,
  },
  monthText: {
    fontSize: Fonts.size.xxxSmall,
    textAlign: 'right',
  },
  price: {
    fontSize: Fonts.size.xSmall,
    color: Colors.brand.primary,
    textAlign: 'right',
  },
  priceNumber: {
    fontSize: Fonts.size.large,
    textAlign: 'right',
  },

  // emptyCard

  emptyCard: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
    overflow: 'hidden',
    borderRadius: Metrics.borderRadius,
  },
  btnStyle: {
    ...AppStyles.mTop15,
    ...AppStyles.shadow2,
    ...AppStyles.mLeft10,
    ...AppStyles.mRight10,
  },
  modalSecView: {
    backgroundColor: Colors.background.primary,
    ...AppStyles.borderRadius,
    ...AppStyles.basePadding,
    paddingVertical: 25,
  },
  okBtnStyle: {
    height: 50,
    width: 150,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: Colors.background.green,
    ...AppStyles.mTop20,
  },
  okTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.Medium,
    color: Colors.text.tertiary,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  okButton: {
    flex: 1,
    ...AppStyles.shadow2,
    backgroundColor: Colors.text.green,
  },
});
