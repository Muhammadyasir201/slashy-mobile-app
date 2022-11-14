// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  ViewPropTypes,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, ButtonView} from '..';
import {Colors, AppStyles, Images} from '../../theme';
import styles from './styles';
import TextInputMask from 'react-native-text-input-mask';

export default class PhoneInput extends React.PureComponent {
  static propTypes = {
    label: ViewPropTypes.style,
    error: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    multiline: PropTypes.bool,
    icon: PropTypes.number,
    rightImageIcon: PropTypes.number,
    isPassword: PropTypes.bool,
  };

  static defaultProps = {
    error: '',
    label: '',
    containerStyle: {},
    onPress: null,
    multiline: false,
    icon: '',
    isPassword: false,
    rightImageIcon: null,
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
      icon,
      rightImageIcon,
      isPassword,
      ...rest
    } = this.props;
    const isError =
      !_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error);
    return (
      <>
        <View
          style={[
            styles.PhoneInputStylesContainer,
            isError && AppStyles.mBottom5,
          ]}>
          <Image
            source={icon}
            style={styles.fieldIcon}
            resizeMode={'contain'}
            height={17}
            width={17}
          />

          <TextInputMask
            ref={(ref) => {
              this.myRef = ref;
            }}
            style={[
              styles.PhoneInputStyles,
              icon && {paddingLeft: 40},
              isPassword && {paddingRight: 40},
              multiline ? styles.multilineInput : {},
            ]}
            blurOnSubmit={false}
            selectionColor={Colors.blue}
            affineFormats={[]}
            customNotations={[]}
            affinityCalculationStrategy={'WHOLE_STRING'}
            mask={'+971 [00] [000] [0000]'}
            keyboardType="numeric"
            placeholderTextColor="grey"
            {...rest}
          />
          <TouchableOpacity style={styles.buttonOverlay} onPress={onPress}>
            <Image source={rightImageIcon} />
          </TouchableOpacity>
        </View>

        {isError && (
          <Text type="Normal" size="small" color={Colors.red}>
            {error}
          </Text>
        )}
      </>
    );
  }
}
