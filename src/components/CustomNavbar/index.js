// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Text, ButtonView, SearchBar} from '../';
import styles from './styles';
import {Images, AppStyles, Colors} from '../../theme';

export default class CustomNavbar extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    centerImage: PropTypes.number,
    profileImage: PropTypes.object,
    title: PropTypes.string.isRequired,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnImage: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    hasProfile: PropTypes.bool,
    isBigTitle: PropTypes.bool,
  };

  static defaultProps = {
    hasBack: true,
    centerImage: null,
    profileImage: null,
    titleColor: '',
    leftBtnImage: undefined,
    leftBtnPress: Actions.pop,
    leftBtnText: '',
    rightBtnImage: undefined,
    rightBtnPress: () => {},
    rightBtnText: '',
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    hasProfile: false,
    isBigTitle: false,
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView onPress={leftBtnPress} style={styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image source={leftBtnImage} size={styles.btnImage} />
        )}
        {renderBack && (
          <Image source={Images.BackButton} size={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderRight(rightBtnImage, rightBtnPress, rightBtnText) {
    return (
      <ButtonView
        onPress={rightBtnPress}
        style={[styles.btnWrapper, styles.rightBtn]}>
        {!_.isEmpty(rightBtnText) && (
          <Text
            type="Medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small">
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <Image source={rightBtnImage} size={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderTitle(title, titleColor, isBigTitle) {
    return (
      <>
        {title && (
          <View style={[AppStyles.alignItemsCenter]}>
            <Text
              color={titleColor || Colors.black}
              type="Medium"
              numberOfLines={1}
              ellipsizeMode="tail"
              size={isBigTitle ? 'xLarge' : 'medium'}>
              {title || ''}
            </Text>
          </View>
        )}
      </>
    );
  }

  renderCenterImage(centerImage) {
    return <Image style={styles.centerImage} source={centerImage} />;
  }
  renderProfileImage(profileImage) {
    return <Image style={styles.profileImage} source={profileImage} />;
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  render() {
    const {
      hasBack,
      centerImage,
      profileImage,
      title,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnPress,
      rightBtnText,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      hasProfile,
      isBigTitle,
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          style,
          hasBorder && styles.borderBottom,
          hasSearch && styles.searchHeader,
          hasProfile && styles.profileHeader,
        ]}>
        <View style={AppStyles.flexRow}>
          {this.renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack)}
          <View style={[AppStyles.flex, AppStyles.centerInner]}>
            {!_.isNil(profileImage) && this.renderProfileImage(profileImage)}
            {!_.isNil(centerImage) && this.renderCenterImage(centerImage)}
            {!_.isNil(title) && this.renderTitle(title, titleColor, isBigTitle)}
          </View>
          {this.renderRight(rightBtnImage, rightBtnPress, rightBtnText)}
        </View>

        {hasSearch && (
          <View style={AppStyles.centerInner}>
            {this.renderSearch(onSearchText, isSearching)}
          </View>
        )}
      </View>
    );
  }
}
