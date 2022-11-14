import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },

  reviews: {
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
    ...AppStyles.mTop5,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
