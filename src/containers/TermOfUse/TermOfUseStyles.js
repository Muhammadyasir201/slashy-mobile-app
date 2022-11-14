import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  ScrollViewStyle: {
    ...AppStyles.basePadding,
  },

  viewStyle: {
    backgroundColor: Colors.background.primary,
    borderRadius: Metrics.borderRadius,
    ...AppStyles.basePadding,
  },

  text: {
    fontSize: Fonts.size.sqmall,
    lineHeight: 23,
  },

  scrollViewSecView: {flex: 1, backgroundColor: Colors.background.secondary},
});
