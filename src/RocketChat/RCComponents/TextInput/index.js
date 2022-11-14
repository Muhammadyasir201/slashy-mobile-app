// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  ViewPropTypes,
  View,
  Image,
} from 'react-native';
import {Text, ButtonView} from '../../RCComponents';
import {Colors, AppStyles, Images, Fonts} from '../../RCTheme';
import styles from './styles';

export default class TextInput extends React.PureComponent {
  static propTypes = {
    label: ViewPropTypes.style,
    labelColor: PropTypes.object,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    textFiledStyle: PropTypes.style,
    labelStyle: PropTypes.style,
  };

  static defaultProps = {
    error: '',
    label: '',
    containerStyle: {},
    onPress: null,
    multiline: false,
    labelColor: {},
    textFiledStyle: {},
    labelStyle: {},
  };

  focus() {
    this.myRef.focus();
  }

  blur() {
    this.myRef.blur();
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      onPress,
      multiline,
      labelColor,
      labelStyle,
      textFiledStyle,
      ...rest
    } = this.props;
    return (
      <View style={[containerStyle, styles.w100]}>
        <Text
          color={labelColor ? labelColor : Colors.black}
          size={Fonts.size.font14}
          style={[AppStyles.mTop10, labelStyle]}>
          {label}
        </Text>

        <View>
          <RNTextInput
            ref={(ref) => {
              this.myRef = ref;
            }}
            style={[
              styles.input,
              multiline ? styles.multilineInput : {},
              textFiledStyle && textFiledStyle,
            ]}
            blurOnSubmit={false}
            selectionColor={Colors.blue}
            multiline={multiline}
            {...rest}
          />
          {!_.isNull(onPress) && (
            <ButtonView onPress={onPress} style={styles.buttonOverlay}>
              <Image
                source={Images.arrow_right_grey}
                style={styles.arrowIcon}
              />
            </ButtonView>
          )}
        </View>

        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="medium"
            size="small"
            color={Colors.red}
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
