// @flow
import {AppState, StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    backgroundColor: Colors.brand.primary,
    ...AppStyles.pTop30,
    ...AppStyles.pLeft30,
    ...AppStyles.pBottom30,
  },

  tabbarContainer: {
    paddingVertical: 10,
  },

  borderBottom: {
    borderBottomColor: Colors.tintWhite,
    borderBottomWidth: 1,
  },

  tabbarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    paddingVertical: 10,
    fontSize: Fonts.size.medium,
    color: Colors.white,
  },

  horizontalLineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    opacity: 0.3,
  },

  noBorder: {
    borderBottomWidth: 0,
  },
});
