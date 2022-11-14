import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },

  dateWraper: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    ...AppStyles.shadow2,
    ...AppStyles.basePadding,
    ...AppStyles.spaceBetween,
  },

  dayWraper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
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

  descriptionView: {
    ...AppStyles.mTop10,
    ...AppStyles.basePadding,
    backgroundColor: Colors.background.primary,
    borderRadius: 5,
    ...AppStyles.shadow2,
  },

  description: {
    fontSize: Fonts.size.xxSmall,
    lineHeight: 20,
  },

  rolesWraper: {
    marginTop: 20,
  },

  heading: {
    color: 'gray',
    marginLeft: 10,
    fontSize: Fonts.size.xSmall,
    marginBottom: 5,
  },

  bg: {
    backgroundColor: Colors.background.primary,
    borderRadius: 5,
    paddingHorizontal: 5,
    ...AppStyles.shadow2,
  },

  imgView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },

  imgWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  imageStyle: {width: 30, height: 30},
  barBackText: {
    marginLeft: 18,
    fontSize: Fonts.size.small,
  },

  waiterText: {
    marginLeft: 15,
    fontSize: Fonts.size.small,
  },

  ratingView: {
    alignItems: 'flex-end',
  },

  ratingWraper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingNum: {
    fontSize: Fonts.size.xxxxSmall,
    paddingRight: 2,
  },

  ratingImg: {
    width: 10,
    height: 10,
    marginLeft: 2,
  },

  review: {
    fontSize: Fonts.size.xxxxSmall,
  },

  border: {
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderBottomColor: Colors.border.primary,
  },

  footer: {
    marginTop: 25,
  },

  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderRadius: 5,
    paddingRight: 20,
    paddingVertical: 10,
    ...AppStyles.shadow2,
  },

  timeWraper: {
    flex: 1,
  },

  timeWraperHeading: {
    fontSize: Fonts.size.xSmall,
  },

  timeWraperTiming: {
    fontSize: Fonts.size.xxSmall,
  },

  timeWraperMultiTime: {
    fontSize: Fonts.size.xxSmall,
  },

  timeWraperHours: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.brand.primary,
  },

  paymentView: {
    alignItems: 'center',
  },

  footerPriceNum: {
    fontSize: Fonts.size.medium,
    color: Colors.brand.primary,
  },

  footerPrice: {
    fontSize: Fonts.size.xxSmall,
  },
  mLineHeight20: {
    lineHeight: 20,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  customNavBarStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 999,
  },
});
