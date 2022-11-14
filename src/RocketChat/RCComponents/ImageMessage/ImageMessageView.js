import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import {Text} from '..';
import {TIME_FORMAT1, CHAT_SERVER} from '../../RCConstants';
import styles from './ImageMessageStyles';
import RCUtils from '../../RCUtils';
import {Colors} from '../../RCTheme';

const ImageProgress = createImageProgress(FastImage);

export default function ImageMessageView(props) {
  const {
    isMyMsg,
    item,
    setImageObjectForImageViewer,
    setImageViewerVisibility,
  } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setImageObjectForImageViewer(item.attachments);
        setImageViewerVisibility();
      }}>
      <View
        style={[
          styles.imageMessageViewStyle,
          isMyMsg ? styles.alignToFlexEnd : '',
        ]}>
        <ImageProgress
          style={styles.imageStyle}
          source={{
            uri: encodeURI(
              `${CHAT_SERVER}${item.attachments[0].image_url}?rc_uid=${RCUtils.getRCId}`,
            ),
          }}
          resizeMode={FastImage.resizeMode.cover}
          indicatorProps={{
            color: Colors.yellow,
          }}
        />
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
