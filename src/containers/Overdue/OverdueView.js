import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  CustomNavbar,
  EarningListItem,
  EmptyStateText,
  Text,
} from '../../components';
import styles from './OverdueStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';

import {strings} from '../../constants';

export default function OverdueView(props) {
  const {overdueShiftsList, _handleRefresh, loading} = props;

  return (
    <View style={styles.container}>
      <CustomNavbar title={strings.OVERDUE} hasBack={true} />

      {loading ? (
        <View style={styles.loaderSecView}>
          <ActivityIndicator
            color={Colors.brand.primary}
            animating
            size="small"
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={_handleRefresh} />
          }>
          <FlatList
            onRefresh={_handleRefresh}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            data={overdueShiftsList}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => <EarningListItem listItem={item} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyCard}>
                <Text
                  size={Fonts.size.xSmall}
                  type="Bold"
                  color={Colors.text.grey}
                  textAlign="center"
                  style={AppStyles.lHeight20}>
                  {strings.NO_OVERDUE_EARNINGS_FOUND}
                </Text>
              </View>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}
