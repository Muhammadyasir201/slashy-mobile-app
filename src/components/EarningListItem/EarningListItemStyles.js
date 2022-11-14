import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  orderWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.background.primary,
    ...AppStyles.mTop5,
    ...AppStyles.mBottom5,
    ...AppStyles.shadow2,
  },

  orderDate: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.secondary,
  },

  orderName: {
    fontSize: Fonts.size.xSmall,
    color: Colors.brand.primary,
    width: 210,
  },

  orderPrice: {
    fontSize: Fonts.size.xSmall,
  },

  orderDuration: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.grey,
  },

  orderHour: {},
  mLineHeight20: {
    lineHeight: 20,
  },
});
