// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../RCTheme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    justifyContent: 'center',
    paddingHorizontal: Metrics.smallMargin,
    height: Metrics.navBarHeight,
  },
  transparentBg: {
    backgroundColor: 'transparent',
  },
  PrimaryBg: {
    backgroundColor: Colors.background.primary,
  },
  btnImage: {
    width: 22,
    height: 15,
    tintColor: Colors.appPrimaryColor,
    justifyContent: 'center',
  },
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    minWidth: 50,
    paddingVertical: 0,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
});
