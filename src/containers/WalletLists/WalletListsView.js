import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  EmptyStateText,
  Button,
  EarningListItem,
  ComfirmationModal,
} from '../../components';
import _ from 'lodash';
import Modal from 'react-native-modal';
import styles from './WalletListsStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings, WALLET, DATE_FORMAT1} from '../../constants';
import {Actions} from 'react-native-router-flux';
import {ISOToFormat} from '../../services/generalHelper';

export default function WalletListsView(props) {
  const {
    tabbar,
    activeTabKey,
    setValue,
    emptyStates,
    modal,
    isModalVisible,
    handleModalVisible,
    onRefresh,
    loading,
    early_payment_requested,
    isOkBtnModalVisible,
    overdue,
    payDay,
    totalEarning,
  } = props;

  function renderCustomNavBar() {
    return (
      <CustomNavbar
        hasBack={false}
        leftBtnPress={() => {
          Actions.drawerOpen();
        }}
        title={strings.MY_PAY}
        leftBtnImage={Images.Drawer}
      />
    );
  }

  function renderTabBarView() {
    return (
      <View style={[AppStyles.flexRow]}>
        {tabbar.tabs.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setValue({activeTabKey: item.key});
              }}
              style={[
                AppStyles.flex,
                AppStyles.paddingHorizontalBase,
                AppStyles.centerInner,
              ]}>
              <View style={activeTabKey === item.key && styles.activeTab}>
                <Text
                  type="Bold"
                  size={Fonts.size.xSmall}
                  color={
                    activeTabKey === item.key
                      ? Colors.brand.primary
                      : Colors.tabbar.primary
                  }
                  style={AppStyles.paddingVerticalBase}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function renderFinancialStats() {
    return (
      activeTabKey === WALLET.INVOICE && (
        <View style={styles.dateWraper}>
          <Image source={Images.CalendarIcon} />

          <View style={[AppStyles.flex, AppStyles.paddingHorizontalBase]}>
            <Text style={[styles.nextPayDayText, styles.mLineHeight20]}>
              {strings.Next_Pay_Day}
            </Text>
            <Text type="Bold" style={styles.data}>
              {ISOToFormat(payDay, DATE_FORMAT1)}
            </Text>
          </View>

          <View>
            <Text style={[styles.monthText, styles.mLineHeight20]}>
              {strings.This_Month}
            </Text>
            <Text type="Bold" style={styles.price}>
              {`${strings.AED} `}
              <Text color={Colors.brand.primary} style={styles.priceNumber}>
                {totalEarning
                  ? `${parseFloat(totalEarning).toFixed(2)}`
                  : `${strings.ZERO}`}
              </Text>
            </Text>
          </View>
        </View>
      )
    );
  }

  function renderListItemAndOverDueButton() {
    return (
      <View style={styles.listSecView}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }>
          <FlatList
            contentContainerStyle={[AppStyles.flex]}
            data={props[activeTabKey]}
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
                  {emptyStates[activeTabKey || 'default'].text}
                </Text>
              </View>
            )}
          />
          {activeTabKey === WALLET.INVOICE && (
            <>
              {!early_payment_requested &&
                props[activeTabKey] &&
                props[activeTabKey].length > 0 && (
                  <Button
                    onPress={
                      early_payment_requested ? () => {} : handleModalVisible
                    }
                    type="Bold"
                    size={Fonts.size.xSmall}
                    background={
                      early_payment_requested
                        ? Colors.background.green
                        : Colors.brand.primary
                    }
                    color={Colors.white}
                    style={styles.btnStyle}>
                    {early_payment_requested
                      ? strings.REQUEST_SENT
                      : strings.REQUEST_EARLY_PAYMENT}
                  </Button>
                )}

              <Button
                onPress={() => {
                  Actions.overdue({
                    overdue: overdue,
                  });
                }}
                type="Bold"
                size={Fonts.size.xSmall}
                color={Colors.text.primary}
                background={Colors.background.primary}
                style={[styles.btnStyle, AppStyles.mBottom25]}>
                {strings.OVERDUE}
              </Button>

              {isModalVisible && (
                <ComfirmationModal
                  isModalVisible={isModalVisible}
                  modal={modal()[WALLET.INVOICE]}
                />
              )}
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  function renderModal() {
    return (
      <ComfirmationModal
        isModalVisible={isOkBtnModalVisible}
        modal={modal()['ok_btn']}
      />
    );
  }

  return (
    <>
      {renderCustomNavBar()}
      {/* tab bar renderer */}
      {renderTabBarView()}

      {/* next day pay card renderer */}
      <View style={styles.financialStatsStyleSec}>
        {renderFinancialStats()}
      </View>

      {/* earning list item with job amount, job duration etc info & overdue button */}
      {loading ? (
        <View style={styles.loaderSecView}>
          <ActivityIndicator
            color={Colors.brand.primary}
            animating
            size="small"
          />
        </View>
      ) : (
        renderListItemAndOverDueButton()
      )}

      {renderModal()}
    </>
  );
}
