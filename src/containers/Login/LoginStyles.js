import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';
import {MESSAGE_TYPES} from '../../constants';

export default StyleSheet.create({
  container: {
    ...AppStyles.flex,
    height: Metrics.screenHeight - 10,
  },
  bgImage: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    position: 'absolute',
    top: 0,
    left: -60,
  },
  loginFormController: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    justifyContent: 'space-between',
    height: Metrics.screenHeight - Metrics.screenHeight * (25 / 100),
  },

  loginFieldsContainer: {
    justifyContent: 'center',
  },

  showPwsdWrap: {
    position: 'absolute',
    bottom: 25,
    right: 0,
    padding: 5,
  },

  policyView: {
    ...AppStyles.flexRow,
    ...AppStyles.centerInner,
    ...AppStyles.pBottom10,
  },

  textUnderLine: {
    color: Colors.brand.primary,
    // ...AppStyles.textUnderLine,
  },

  dontHaveAccount: {
    // display:"flex",
    // flexDirection: "row",
    // justifyContent:"center",
    // alignItems: "center",
    marginTop: 120
  }
});
