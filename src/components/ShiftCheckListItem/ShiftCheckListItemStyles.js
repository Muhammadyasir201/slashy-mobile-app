import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    ...AppStyles.basePadding,
    ...AppStyles.shadow2,
    ...AppStyles.borderRadius,
    ...AppStyles.mTop10,
  },

  checkboxVIew: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.tabbar.primary,
    marginTop: 2,
    ...AppStyles.mRight20,
    ...AppStyles.centerInner,
  },

  checkbox: {
    height: 14,
    width: 14,
    borderRadius: 50,
    ...AppStyles.centerInner,
    backgroundColor: Colors.white,
  },

  clickedCheckbox: {
    height: 14,
    width: 14,
    borderRadius: 50,
    ...AppStyles.centerInner,
    backgroundColor: Colors.brand.primary,
  },

  textView: {
    flex: 1,
  },

  heading: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.secondary,
  },

  description: {
    fontSize: Fonts.size.xSmall,
    marginTop: 2,
    lineHeight: 18,
  },

  timeScheduleSec: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timingsSec: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 10,
  },
  dayTimeTextStyle: {
    fontSize: Fonts.size.xSmall,
    color: Colors.text.primary,
    lineHeight: 18,
  },
});
