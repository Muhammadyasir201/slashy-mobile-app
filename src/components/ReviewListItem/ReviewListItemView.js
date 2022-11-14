import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './ReviewListItemStyles';
import {Colors, Fonts, AppStyles} from '../../theme';
import {strings, DATE_FORMAT6} from '../../constants';
import {Rating} from 'react-native-ratings';
import {ISOToFormat} from '../../services/generalHelper';

export default function ReviewListItemView(props) {
  const {reviewItemObj} = props;
  return (
    <View style={[styles.contaier]}>
      <View style={styles.reviewContainer}>
        <View>
          <Text type="Bold" style={styles.reviewName}>
            {`${reviewItemObj.role} @${reviewItemObj.venue}`}
          </Text>
        </View>

        <View style={styles.ratingView}>
          <Text style={styles.ratingNumber}>
            {reviewItemObj.rating.toFixed(1)}
          </Text>
          <Rating
            style={styles.ratingStar}
            startingValue={reviewItemObj.rating}
            imageSize={10}
            readonly={true}
          />
          <Text style={styles.date}>
            {`${ISOToFormat(reviewItemObj.created_at, DATE_FORMAT6)}`}
          </Text>
        </View>

        <View style={styles.descriptionView}>
          <Text style={styles.description}>{reviewItemObj.review}</Text>
        </View>
      </View>
    </View>
  );
}
