import React from 'react';
import {View, ScrollView} from 'react-native';
import {CustomNavbar, Text} from '../../components';
import styles from './TermOfUseStyles';
import {strings} from '../../constants';
import {Colors} from '../../theme';

export default function TermOfUseView(props) {
  return (
    <>
      <CustomNavbar title={strings.TERMS_OF_USE} />
      <View style={styles.scrollViewSecView}>
        <ScrollView
          contentContainerStyle={styles.ScrollViewStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.viewStyle}>
            <Text
              style={styles.text}>{`Terms of use will be updated soon.`}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
