import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  shiftItemSecStyle: {
    marginBottom: -10,
  },
  scrollSecStyle: {
    ...AppStyles.mLeft15,
    ...AppStyles.mRight15,
    ...AppStyles.mTop5,
  },
});
