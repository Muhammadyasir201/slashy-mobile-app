import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  description: {
    textAlign: 'center',
    fontSize: Fonts.size.xxSmall,
    color: Colors.black,
    lineHeight: 20,
    marginTop: 5,
  },

  inputWraper: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...AppStyles.mTop35,
    alignItems: 'center',
    marginHorizontal: 45,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.primary,
  },

  emailIcon: {
    marginRight: 10,
  },

  input: {
    width: Metrics.screenWidth - 130,
    paddingLeft: 8,
  },
  heading: {
    lineHeight: 25,
  },
});
