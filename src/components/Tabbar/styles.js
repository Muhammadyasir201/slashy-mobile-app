// @flow
import {AppState, StyleSheet, FlatList} from 'react-native';
import {AppStyles, Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    ...AppStyles.shadow1,
    ...AppStyles.pTopBase,
    ...AppStyles.mBottomListBottom,
    ...AppStyles.flexRow,
    ...AppStyles.spaceAround,
  },
  imageIconSec: {
    display: 'flex',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noticationBadge: {
    backgroundColor: Colors.background.red,
    width: 17,
    height: 17,
    borderRadius: Metrics.borderRadiusXLarge,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 999,
  },
  notificationCountText: {
    fontSize: 7,
    color: Colors.text.tertiary,
    fontFamily: Fonts.type.Bold,
  },
});
