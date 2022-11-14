import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  reviewContainer: {
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.background.primary,
    ...AppStyles.shadow2,
    ...AppStyles.paddingHorizontalBase,
    ...AppStyles.paddingVerticalBase,
  },
  contaier: {
    ...AppStyles.mTop10,
  },
  reviewName: {
    fontSize: Fonts.size.small,
    color: Colors.brand.primary,
  },

  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  ratingNumber: {
    fontSize: Fonts.size.xxxxSmall,
    ...AppStyles.mRight10,
  },

  ratingStar: {
    ...AppStyles.mRight10,
  },

  date: {
    fontSize: Fonts.size.xxxSmall,
  },

  descriptionView: {
    ...AppStyles.mTop5,
  },

  description: {
    fontSize: Fonts.size.xSmall,
  },
});
