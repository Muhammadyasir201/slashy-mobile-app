import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    ...AppStyles.borderRadius,
    ...AppStyles.basePadding,
    paddingVertical: 25,
  },

  warningText: {
    fontSize: Fonts.size.medium,
    textAlign: 'center',
    lineHeight: 26,
  },

  warningTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    ...AppStyles.mTop15,
  },

  warningTime: {
    fontSize: Fonts.size.xxLarge,
    paddingLeft: 15,
  },

  text: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.primary,
    textAlign: 'center',
    paddingHorizontal: 7,
    ...AppStyles.mTop10,
  },

  buttonView: {
    flexDirection: 'row',
    ...AppStyles.mTop30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  cancelButton: {
    flex: 1,
    ...AppStyles.mRight10,
    ...AppStyles.shadow2,
  },
  okButton: {
    flex: 1,
    ...AppStyles.shadow2,
  },
});
