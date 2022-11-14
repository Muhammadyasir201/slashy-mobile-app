import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  loaderSecView: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollViewStyle: {
    ...AppStyles.basePadding,
  },
  emptyCard: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
    overflow: 'hidden',
    borderRadius: Metrics.borderRadius,
  },
});
