import { StyleSheet } from 'react-native';
import { AppStyles, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  code: {
    ...AppStyles.mTop10,
  },

  recoveryText: {
    fontSize: Fonts.size.medium,
    ...AppStyles.mTop10,
    textAlign: 'center',
  },

  inputTextView: {
  },

  button: {
    ...AppStyles.mTop35,
  },

  getACode: {
    ...AppStyles.mTop5,
  },

  resendCode: {
    color: Colors.brand.primary,
    ...AppStyles.mTop5,
  },
});
