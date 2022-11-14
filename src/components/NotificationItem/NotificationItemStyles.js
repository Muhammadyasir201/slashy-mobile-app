import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadius,
    ...AppStyles.shadow2,
    ...AppStyles.flexRow,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.basePadding,
    ...AppStyles.mBottomBase,
  },
  unRead: {
    borderTopColor: Colors.brand.primary,
    borderTopWidth: 5,
  },

  imgView: {
    height: 40,
    width: 40,
  },

  view: {
    flex: 1,
    ...AppStyles.mLeft15,
  },

  applicationText: {
    fontFamily: Fonts.type.Book,
    fontSize: Fonts.size.xxSmall,
    lineHeight: 18,
  },

  notificationTime: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.secondary,
    ...AppStyles.mTop5,
    lineHeight: 15,
  },
});
