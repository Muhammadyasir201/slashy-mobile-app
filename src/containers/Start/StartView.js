import React from 'react';
import styles from './StartStyles';
import {View, Image} from 'react-native';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import {Text} from '../../components';
import {strings} from '../../constants';
import Video from 'react-native-video';
import LogoAnimation from '../../assets/videos/LogoAnimation.mp4';

export default function StartView(props) {
  const {navigate} = props;
  return (
    <View style={styles.container}>
      <Video
        source={LogoAnimation}
        paused={false}
        playInBackground={false}
        style={styles.video}
        resizeMode="cover"
        onEnd={() => {
          navigate();
        }}
      />
    </View>
  );
}
