// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import _ from 'lodash';
import {Text, ButtonView} from '../../components';
import styles from './styles';
import {SHIFT, strings, WALLET} from '../../constants';
import {Images, AppStyles, Fonts, Colors} from '../../theme';
import {setSelectedTab} from '../../actions/GeneralActions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

const tabsData = [
  {
    id: 0,
    name: strings.MY_SHIFTS,
    icon: Images.MyShifts,
    selectedIcon: Images.MyShiftsSelected,
    onPress: () => {
      Actions.jump('my_shifts', {
        tabs: shiftListTabs.myShifts.tabs,
        activeTabKey: shiftListTabs.myShifts.activeTabKey,
        isComingFromSearchTab: false,
      });
    },
  },
  {
    id: 1,
    name: strings.MY_PAY,
    icon: Images.Wallet,
    selectedIcon: Images.WalletSelected,
    onPress: () => {
      Actions.jump('wallet', {tabs: walletTabs});
    },
  },
  {
    id: 2,
    name: strings.SEARCH,
    icon: Images.Search,
    selectedIcon: Images.SearchSelected,
    onPress: () => {
      Actions.jump('search', {
        tabs: shiftListTabs.search.tabs,
        activeTabKey: shiftListTabs.search.activeTabKey,
      });
    },
  },
  {
    id: 3,
    name: strings.NOTIFICATIONS,
    icon: Images.Notifications,
    selectedIcon: Images.NotificationsSelected,
    onPress: () => {
      Actions.jump('notification_tab');
    },
  },
  {
    id: 4,
    name: strings.PROFILE,
    icon: Images.Profile,
    selectedIcon: Images.ProfileSelected,
    onPress: () => {
      Actions.jump('profile');
    },
  },
];

export const shiftListTabs = {
  myShifts: {
    activeTabKey: SHIFT.status.UPCOMMING,
    tabs: [
      {
        id: 0,
        title: strings.UPCOMING,
        key: SHIFT.status.UPCOMMING,
      },
      {
        id: 1,
        title: strings.PAST,
        key: SHIFT.status.PAST,
      },
    ],
  },
  search: {
    activeTabKey: SHIFT.status.OFFERED,
    tabs: [
      {
        id: 0,
        title: strings.Offers,
        key: SHIFT.status.OFFERED,
      },
      {
        id: 1,
        title: strings.Browse,
        key: SHIFT.status.BROWSE,
      },
      {
        id: 2,
        title: strings.Applied,
        key: SHIFT.status.APPLIED,
      },
    ],
  },
};

export const walletTabs = {
  activeTabKey: WALLET.INVOICE,
  tabs: [
    {
      id: 0,
      title: strings.MONTHLY_EARNINGS,
      key: WALLET.INVOICE,
    },
    {
      id: 1,
      title: strings.PAY_SLIPS,
      key: WALLET.PAY_SLIPS,
    },
  ],
};

class Tabbar extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  handlePressTabs = (tabIndex, onPress) => {
    this.props.setSelectedTab(tabIndex);
    onPress();
  };

  render() {
    const {selectedIndex, unReadNotiCount} = this.props;

    return (
      <View style={styles.container}>
        {tabsData.map((item, index) => {
          let isActive = index === selectedIndex;
          return (
            <ButtonView
              style={[AppStyles.centerInner, styles.btnView]}
              key={item.id}
              onPress={() => {
                this.handlePressTabs(index, item.onPress);
              }}>
              <View style={styles.imageIconSec}>
                {_.isEqual(item.id, 3) && unReadNotiCount > 0 && (
                  <View style={styles.noticationBadge}>
                    <Text style={styles.notificationCountText}>
                      {util.notificationCounter(unReadNotiCount)}
                    </Text>
                  </View>
                )}
                <Image
                  style={{height: 17, width: 17}}
                  source={isActive ? item.selectedIcon : item.icon}
                  resizeMode="contain"
                />
              </View>
              {item.name !== '' && (
                <Text
                  style={AppStyles.mTop5}
                  size={Fonts.size.xxSmall}
                  color={
                    isActive ? Colors.text.quinary : Colors.text.secondary
                  }>
                  {item.name}
                </Text>
              )}
            </ButtonView>
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = ({general, notification}) => ({
  selectedIndex: general.selectedIndex,
  unReadNotiCount: notification.un_read_notification_count,
});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(Tabbar);
