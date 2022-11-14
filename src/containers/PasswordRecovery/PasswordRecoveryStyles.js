import {StyleSheet} from 'react-native';
import {AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  recoveryText: {
    fontSize: Fonts.size.medium,
    ...AppStyles.mTop10,
  },

  description: {
    fontSize: Fonts.size.xSmall,
    textAlign: 'center',
    ...AppStyles.mTop10,
  },

  inputTextView: {
    width: '100%',
    marginTop: 10,
  },

  button: {
    ...AppStyles.mTop40,
  },
});
