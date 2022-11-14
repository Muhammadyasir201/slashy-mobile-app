// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {Button, Text} from '../../components';
import styles from './styles';
import {AppStyles, Colors} from '../../theme';

export default class EmptyStateText extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    containerStyle: PropTypes.object,
    textProps: PropTypes.object,
    image: PropTypes.string,
    button_text: PropTypes.string,
    button_action: PropTypes.func,
  };

  static defaultProps = {
    text: 'No data available',
    containerStyle: {},
    textProps: {},
    image: null,
    button_text: null,
    button_action: null,
  };

  render() {
    const {
      text,
      containerStyle,
      textProps,
      image,
      button_text,
      button_action,
    } = this.props;

    return (
      <View style={styles.container}>
        {!_.isNil(image) && <Image source={image} />}
        {!_.isNil(text) && (
          <Text type="SemiBold" style={styles.description}>
            {text}
          </Text>
        )}

        {!_.isNil(button_text) && !_.isNil(button_action) && (
          <View style={styles.buttonView}>
            <Button
              onPress={() => {
                button_action();
              }}
              color={Colors.white}
              background={Colors.brand.primary}
              type="Bold"
              size="small"
              style={styles.button}>
              {button_text}
            </Button>
          </View>
        )}
      </View>
    );
  }
}
