import {StyleSheet} from 'react-native';
import {Images, Colors, Fonts, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    ...AppStyles.flex,
    height: Metrics.screenHeight - 10,
  },
  mainViewSec: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    justifyContent: 'space-between',
    height: Metrics.screenHeight - Metrics.screenHeight * (25 / 100),
  },
  continueBtnStyle: {
    marginTop: Metrics.doubleBaseMargin + 20,
  },
});
