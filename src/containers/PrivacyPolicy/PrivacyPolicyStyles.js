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

  bold: {
    fontWeight: 'bold',
  },

  text: {
    fontSize: Fonts.size.sqmall,
    lineHeight: 23,
    marginBottom: 10,
  },
  link: {
    fontSize: Fonts.size.sqmall,
    lineHeight: 23,
  },
  scrollViewSecView: {flex: 1, backgroundColor: Colors.background.secondary},
});
