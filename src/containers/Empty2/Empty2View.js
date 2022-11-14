import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import styles from './Empty22Styles';
import {Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';

export default function Empty2View(props) {
  return (
    <View>
      {/* <Text style={{color: 'black'}}>{strings.how}</Text> */}
      <Text style={{color: 'black'}}>Empty2 Screen</Text>
    </View>
  );
}
