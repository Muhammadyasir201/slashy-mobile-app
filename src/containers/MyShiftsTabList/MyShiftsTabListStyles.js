import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  activeTab: {
    color: Colors.brand.primary,
    borderBottomColor: Colors.brand.primary,
    borderBottomWidth: 3,
  },
  loadingStyle: {
    height: Metrics.screenHeight - (Metrics.screenHeight * 40) / 100,
    justifyContent: 'center',
  },
  listItemSecStyle: {
    ...AppStyles.mLeft20,
    ...AppStyles.mRight20,
    ...AppStyles.mTop5,
    ...AppStyles.mBottom10,
  },
});
