import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderBottomColor: Colors.border.primary,
  },

  shiftListingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  text: {
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.normal,
    lineHeight: 25,
    paddingVertical: 10,
  },
  boldText: {
    fontFamily: Fonts.type.Bold,
  },

  textShowsEnd: {
    color: Colors.text.secondary,
  },
  timeDurationStyle: {
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.Medium,
    textAlign: 'right',
    lineHeight: 25,
    paddingVertical: 0,
  },
  pastDateTimeStyle: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.xSmall,
    textAlign: 'right',
  },
  noneTextStyle: {
    color: Colors.text.red,
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.Medium,
    opacity: 0.3,
    lineHeight: 25,
    paddingVertical: 0,
  },
  shiftDayTextStyle: {
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: '50%',
  },
});
