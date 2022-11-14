import React from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from '..';
import _ from 'lodash';
import styles from './ComfirmationModalStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import Modal from 'react-native-modal';

export default function ComfirmationModalView(props) {
  const {isModalVisible, modal} = props;

  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={styles.container}>
        <Text type="Bold" style={styles.warningText}>
          {modal.headerText}
        </Text>

        {modal.isTimerVisible === true && (
          <>
            <View style={styles.warningTimeView}>
              <Image source={Images.Warning} />
              <Text type="SemiBold" style={styles.warningTime}>
                {modal.timer}
              </Text>
            </View>
            <Text style={styles.text}>{modal.timeDescription}</Text>
          </>
        )}

        <Text style={[styles.text]}>{modal.description}</Text>
        <View style={styles.buttonView}>
          {!_.isEmpty(modal.negativeButtonText) && (
            <Button
              onPress={modal.negativeButtonAction}
              size={Fonts.size.xSmall}
              color={Colors.black}
              type="Bold"
              background={modal.negativeButtonColor}
              style={styles.cancelButton}>
              {modal.negativeButtonText}
            </Button>
          )}
          <Button
            onPress={modal.positiveButtonAction}
            size={Fonts.size.xSmall}
            color={Colors.white}
            type="Bold"
            background={modal.positiveButtonColor}
            style={styles.okButton}>
            {modal.positiveButtonText}
          </Button>
        </View>
      </View>
    </Modal>
  );
}
