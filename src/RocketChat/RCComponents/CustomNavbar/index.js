// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Text, ButtonView, SearchBar} from '../../RCComponents';
import styles from './styles';
import {Images, AppStyles, Colors, Fonts} from '../../RCTheme';

export default class CustomNavbar extends React.Component {
  static propTypes = {
    hasBack: PropTypes.bool,
    openDrawer: PropTypes.bool,
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
    transparentBg: PropTypes.bool,
    leftBtnStyle: PropTypes.object,
    rightBtnStyle: PropTypes.object,
    rightBtnSize: PropTypes.object,
    titleStyle: PropTypes.object,
  };

  static defaultProps = {
    hasBack: true,
    openDrawer: false,
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
    transparentBg: false,
    leftBtnStyle: {},
    rightBtnStyle: {},
    titleStyle: {},
    rightBtnSize: {},
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack, openDrawer) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView
        onPress={renderBack || openDrawer ? leftBtnPress : () => {}}
        style={styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image
            source={leftBtnImage}
            style={[styles.btnImage, this.props.leftBtnStyle]}
          />
        )}

        {renderBack && (
          <Image source={Images.BackButton} style={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderRight(
    rightBtnImage,
    rightBtnPress,
    rightBtnText,
    rightBtnStyle,
    rightBtnSize,
  ) {
    return (
      <ButtonView
        onPress={rightBtnPress}
        style={[styles.btnWrapper, styles.rightBtn]}>
        {!_.isEmpty(rightBtnText) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small"
            color={Colors.texasRose}>
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <Image
            source={rightBtnImage}
            style={rightBtnStyle}
            resizeMode="contain"
          />
        )}
      </ButtonView>
    );
  }

  renderTitle(title, titleColor, titleStyle) {
    return (
      <View style={[AppStyles.flex]}>
        <Text
          color={titleColor || Colors.blue1}
          numberOfLines={1}
          ellipsizeMode="tail"
          size={Fonts.size.font15}
          style={[titleStyle, AppStyles.weight5]}>
          {title || ''}
        </Text>
      </View>
    );
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  render() {
    const {
      hasBack,
      openDrawer,
      title,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnPress,
      rightBtnText,
      rightBtnStyle,
      rightBtnSize,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      transparentBg,
      titleStyle,
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          transparentBg ? styles.transparentBg : styles.PrimaryBg,
          style,
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
        ]}>
        <View style={AppStyles.flexRow}>
          {this.renderLeft(
            leftBtnImage,
            leftBtnPress,
            leftBtnText,
            hasBack,
            openDrawer,
          )}
          {this.renderTitle(title, titleColor, titleStyle)}
          {this.renderRight(
            rightBtnImage,
            rightBtnPress,
            rightBtnText,
            rightBtnStyle,
            rightBtnSize,
          )}
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
