import React, {Component} from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './QRCodeScannerStyles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Images} from '../../theme';

export default function QRCodeScannerView(props) {
  const {setData, onImagePress, btnVisibility, bottomBtnImage, data} = props;

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={(e) => {
          setData(e.data);
        }}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={<></>}
        bottomContent={
          btnVisibility && (
            <TouchableOpacity
              onPress={() => {
                onImagePress(data);
              }}>
              <Image source={bottomBtnImage} />
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}
