import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {QRCodeScanner, CustomNavbar} from '../../components';
import styles from './QRCodeStyles';
import {SHIFT} from '../../constants';
import {Images, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';

export default function QRCodeView(props) {
  const {isTimeIn, onPress, loading} = props;

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator
          color={Colors.brand.primary}
          animating
          size="small"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={
          isTimeIn
            ? SHIFT.shiftAttendanceStatus.TIME_IN
            : SHIFT.shiftAttendanceStatus.TIME_OUT
        }
      />
      <QRCodeScanner bottomBtnImage={Images.TickIcon} onImagePress={onPress} />
    </View>
  );
}
