import React from 'react';
import _ from 'lodash';
import styles from './VideoPlayerStyles';
import VideoPlayer from 'react-native-video-player';
import {View} from 'react-native';

export default function VideoPlayerView(props) {
  return (
    <VideoPlayer
      video={{
        uri:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      videoWidth={1600}
      videoHeight={900}
      thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
    />
  );
}
