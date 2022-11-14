import React from 'react';
import _ from 'lodash';
import styles from './TextMessageStyles';
import {View, Image} from 'react-native';
import RCUtils from '../../RCUtils';
import {TIME_FORMAT1} from '../../RCConstants';

import {Text} from '../../RCComponents';
import {Colors, Images} from '../../../theme';

export default function TextMessageView(props) {
  const {isMyMsg, item, vendorAvatar} = props;
  return (
    <>
      {isMyMsg && (
        <>
          <View style={[styles.otherMessages, styles.myMessage]}>
            <Text
              style={styles.flexWrap}
              color={Colors.white}>{`${item.msg}`}</Text>
            <Text style={styles.timingsWrap} color={Colors.white}>
              {`${RCUtils.ISOToFormat(
                item._updatedAt.$date ? item._updatedAt.$date : item._updatedAt,
                TIME_FORMAT1,
              )}`}
            </Text>
          </View>
        </>
      )}
      {!isMyMsg && (
        <View style={{flexDirection: 'row'}}>
          {/* {!vendorAvatar && ( //todo
            <View style={styles.imageSecStyle}>
              <Image resizeMode={'cover'} source={Images.BackButton} />
            </View>
          )} */}
          <View style={[styles.otherMessages, styles.otherMessage]}>
            <Text style={styles.flexWrap}>{`${item.msg}`}</Text>
            <Text style={styles.timingsWrap}>
              {`${RCUtils.ISOToFormat(
                item._updatedAt.$date ? item._updatedAt.$date : item._updatedAt,
                TIME_FORMAT1,
              )}`}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
