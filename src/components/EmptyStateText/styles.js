// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: Metrics.screenHeight / 7,
  },

  description: {
    textAlign: 'center',
    fontSize: Fonts.size.xSmall,
    lineHeight: 20,
    ...AppStyles.mTop20,
  },

  buttonView: {
    alignItems: 'center',
  },

  button: {
    ...AppStyles.mTop15,
    width: 156,
  },
});
