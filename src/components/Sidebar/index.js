// @flow
import React from 'react';
import PropTypes, {array} from 'prop-types';
import {
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Share,
} from 'react-native';
import {Text, ButtonView} from '..';
import styles from './styles';
import {appVersion, strings} from '../../constants';
import {Images, AppStyles, Fonts, Colors} from '../../theme';
import {setSelectedTab} from '../../actions/GeneralActions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {userSignOutRequest} from '../../actions/UserActions';
import Rate, {AndroidMarket} from 'react-native-rate';

class Sidebar extends React.PureComponent {
  tabsData = [
    [
      {
        id: 0,
        name: strings.RATE_APP,
        onPress: () => {
          const options = {
            AppleAppID: '1536775728',
            GooglePackageName: 'com.slashy',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: true,
            fallbackPlatformURL: 'https://www.slashyapp.com',
          };
          Rate.rate(options, (success) => {
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
              this.setState({rated: true});
            }
          });
        },
      },
      {
        id: 1,
        name: strings.SHARE_APP,
        onPress: () => {
          this.onShare();
        },
      },
    ],
    [
      {
        id: 2,
        name: strings.PRIVACY_POLICY,
        onPress: () => {
          Actions.privacyPolicy();
        },
      },
      {
        id: 3,
        name: strings.TERMS_OF_USE,
        onPress: () => {
          Actions.termOfUse();
        },
      },
      {
        id: 4,
        name: strings.CHANGE_PASSWORD,
        onPress: () => {
          Actions.changePassword();
        },
      },
    ],
    [
      {
        id: 5,
        name: strings.LOGOUT,
        icon: Images.logout,
        onPress: () => {
          this.setValue({isLoading: true});
          this.props.userSignOutRequest((response) => {
            console.log({response});
            this.setValue({isLoading: false});
            response && Actions.reset('login');
          });
        },
      },
    ],
  ];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  static propTypes = {};

  static defaultProps = {};

  setValue = (key) => {
    this.setState(key);
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: `Install this app : ${
          Platform.OS === 'android'
            ? strings.androidAppLink
            : strings.iosAppLink
        }`,
        url:
          Platform.OS === 'android'
            ? strings.androidAppLink
            : strings.iosAppLink,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {isLoading} = this.state;
    console.log({user: this.props.user});
    return (
      <ImageBackground
        source={Images.slashBG}
        style={styles.image}
        resizeMode="contain">
        <SafeAreaView style={[AppStyles.flex, AppStyles.spaceBetween]}>
          <Image source={Images.SlashyIconDrawer} resizeMode="contain" />

          <View>
            {this.tabsData.map((item, index) => {
              let isLastItem = index === util.arrayLastIndex(this.tabsData);

              return (
                <View
                  style={[
                    styles.tabbarContainer,
                    !isLastItem && styles.borderBottom,
                  ]}>
                  {item.map((menuItem) => {
                    if (
                      menuItem.name == strings.CHANGE_PASSWORD &&
                      this.props.user?.onboarding_status !== 'approved'
                    ) {
                      return <></>;
                    }
                    
                    return (
                      <TouchableOpacity
                        style={styles.tabbarView}
                        onPress={menuItem.onPress}>
                        <Image
                          source={menuItem.icon}
                          style={menuItem.icon ? [AppStyles.mRight10] : []}
                        />
                        {menuItem.name === strings.LOGOUT && isLoading ? (
                          <ActivityIndicator
                            color={Colors.white}
                            animating
                            size="small"
                          />
                        ) : (
                          <Text style={styles.text}>{menuItem.name}</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
            <Text textAlign="center" color={Colors.tintWhite}>
              {appVersion}
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({general, user}) => ({
  selectedIndex: general.selectedIndex,
  user: user.data,
});

const actions = {setSelectedTab, userSignOutRequest};

export default connect(mapStateToProps, actions)(Sidebar);
