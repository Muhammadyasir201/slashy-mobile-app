// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.white,
    paddingTop: Metrics.statusBarHeight,
    paddingHorizontal: Metrics.smallMargin,
    height: Metrics.navBarHeight,
    justifyContent: 'center',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  btnImage: {
    width: 20,
    height: 20,
  },
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: 'flex-start',
    minWidth: 80,
  },
  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
  profileHeader: {
    height: Metrics.navBarHeight + 110,
  },
  profileImage: {
    height: 110,
    width: 110,
    borderRadius: 100,
  },

  titleFont: {
    fontSize: Fonts.size.xLarge,
    ...AppStyles.mTop5,
  },

  centerImage: {
    height: 29,
    width: 66
  }
});
