import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {CustomNavbar, Text, ReviewListItem} from '../../components';
import styles from './ReviewScreenStyles';
import {Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';

export default function ReviewScreenView(props) {
  const {reviewList, loading, onRefresh} = props;
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
        title={`${reviewList.length} ${
          reviewList.length > 1 ? `${strings.REVIEW}s` : strings.REVIEW
        }`}
      />

      <View style={styles.reviews}>
        <FlatList
          data={reviewList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({index, item}) => {
            return <ReviewListItem reviewItemObj={item} />;
          }}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }
        />
      </View>
    </View>
  );
}
