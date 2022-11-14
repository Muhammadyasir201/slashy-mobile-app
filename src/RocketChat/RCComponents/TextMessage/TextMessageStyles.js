import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../RCTheme';

export default StyleSheet.create({
  otherMessages: {
    backgroundColor: Colors.white,
    marginTop: Metrics.smallMargin,
    alignSelf: 'flex-start',
    borderRadius: Metrics.borderRadius - 1,
    paddingTop: Metrics.smallMargin,
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.xsmallMargin,
    flexDirection: 'row',
  },
  otherMessage: {
    marginRight: Metrics.tripleMediumBaseMargin,
    alignSelf: 'flex-start',
  },
  myMessage: {
    backgroundColor: Colors.chatPurple,
    alignSelf: 'flex-end',
    // marginLeft: Metrics.tripleMediumBaseMargin,
  },
  flexWrap: {
    flexWrap: 'wrap',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
  },
  timingsWrap: {
    fontSize: Fonts.size.xxxSmall,
    paddingLeft: Metrics.baseMargin,
    alignSelf: 'flex-end',
  },
  imageSecStyle: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: 'red',
  },
});
