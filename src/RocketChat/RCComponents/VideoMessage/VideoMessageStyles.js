import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../RCTheme';

export default StyleSheet.create({
  videoView: {
    height: 130,
    marginTop: Metrics.smallMargin,
    width: '75%',
    backgroundColor: Colors.videoBackground,
    borderRadius: Metrics.borderRadiusMedium,
  },
  alignToFlexEnd: {
    alignSelf: 'flex-end',
  },
  playButtonSec: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonImageStyle: {
    height: 40,
    width: 40,
  },
  imageAndVideoArrivalTimeSec: {
    position: 'absolute',
    bottom: Metrics.xsmallMargin,
    right: 0,
    marginRight: Metrics.smallMargin,
  },
  timingsWrap: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.grey,
    paddingLeft: Metrics.baseMargin,
    alignSelf: 'flex-end',
  },
});
