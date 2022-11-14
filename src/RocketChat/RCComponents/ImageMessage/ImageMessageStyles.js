import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../RCTheme';

export default StyleSheet.create({
  timingsWrap: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.grey,
    paddingLeft: Metrics.baseMargin,
    alignSelf: 'flex-end',
  },

  imageMessageViewStyle: {
    borderColor: Colors.teaGreen,
    width: '70%',
    minHeight: 150,
    borderRadius: Metrics.borderRadius,
    borderWidth: 5,
    overflow: 'hidden',
    marginTop: Metrics.baseMargin,
  },
  alignToFlexEnd: {
    alignSelf: 'flex-end',
  },
  imageStyle: {
    width: '100%',
    minHeight: 200,
    overflow: 'hidden',
  },
  imageAndVideoArrivalTimeSec: {
    position: 'absolute',
    bottom: Metrics.xsmallMargin,
    right: 0,
    marginRight: Metrics.smallMargin,
  },
});
