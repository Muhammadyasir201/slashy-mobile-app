import React from 'react';
import {View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import _ from 'lodash';
import {Text} from '..';
import {TIME_FORMAT1} from '../../RCConstants';
import styles from './VideoMessageStyles';
import RCUtils from '../../RCUtils';
import {Colors, Images} from '../../RCTheme';

export default function VideoMessageView(props) {
  const {isMyMsg, item, setVideoModalVisibility} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setVideoModalVisibility();
      }}>
      <View style={[styles.videoView, isMyMsg ? styles.alignToFlexEnd : '']}>
        <View style={styles.playButtonSec}>
          <Image
            style={styles.playButtonImageStyle}
            source={Images.PlayButton}></Image>
        </View>
        <View style={styles.imageAndVideoArrivalTimeSec}>
          <Text
            type={'medium'}
            style={[
              styles.timingsWrap,
              {color: Colors.white},
            ]}>{`${RCUtils.ISOToFormat(item._updatedAt, TIME_FORMAT1)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
