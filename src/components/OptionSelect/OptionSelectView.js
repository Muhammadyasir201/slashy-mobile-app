import React from 'react';
import {
  ActivityIndicator,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {Text, Button} from '..';
import _ from 'lodash';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './OptionSelectStyles';

export default function OptionSelectView(props) {
  const {
    setOpen,
    selectedValue,
    setSelectedValue,
    placeholder,
    open,
    icon,
    error,
    list,
    multiple,
    dataLoading,
    title,
    subtitle,
  } = props;

  const isError =
    !_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error);
  return (
    <>
      {dataLoading && (
        <ActivityIndicator
          color={Colors.brand.primary}
          style={AppStyles.mTop10}
        />
      )}
      {!dataLoading && (
        <TouchableOpacity onPress={setOpen}>
          <View style={[styles.search, isError && AppStyles.mBottom5]}>
            <RnImage
              source={icon}
              style={styles.fieldIcon}
              resizeMode={'contain'}
              height={17}
              width={17}
            />
            <View onPress={setOpen} style={styles.inputView}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                color={
                  selectedValue?.value
                    ? Colors.text.primary
                    : Colors.text.secondary
                }
                size={Fonts.size.xiv}
                style={[AppStyles.mRight10, AppStyles.flex, AppStyles.pLeft30]}>
                {selectedValue.value || placeholder}
              </Text>
              <RnImage source={Images.DownArraowIcon} />
            </View>
            <Modal visible={open} transparent={true} animationType="slide">
              <View style={styles.modalParentView}>
                <View
                  style={[
                    styles.modalSubParent,
                    multiple && {paddingBottom: 20},
                  ]}>
                  <View style={styles.modalHeader}>
                    <Text
                      color={Colors.brand.primary}
                      size={Fonts.size.xviii}
                      type="Bold"
                      textAlign="center">
                      {title}
                    </Text>
                    {subtitle !== '' && (
                      <Text
                        size={Fonts.size.xxSmall}
                        textAlign="center"
                        style={AppStyles.mTop10}>
                        {subtitle}
                      </Text>
                    )}
                  </View>
                  {/* LIST */}
                  <ScrollView
                    horizontal={!multiple}
                    contentContainerStyle={[
                      AppStyles.mTop20,
                      AppStyles.pBottom20,
                      {
                        justifyContent: 'center',
                        width: '100%',
                      },
                    ]}>
                    {list.map((item) => {
                      let isSelected = false;
                      if (!multiple) {
                        isSelected = selectedValue?.key === item.key;
                      } else {
                        for (
                          let index = 0;
                          index < selectedValue.length;
                          index++
                        ) {
                          const element = selectedValue[index];
                          if (element?.key === item.key) {
                            isSelected = true;
                            break;
                          }
                        }
                      }
                      return (
                        <TouchableOpacity
                          key={util.generateGuid()}
                          onPress={() => setSelectedValue(item)}
                          style={[
                            AppStyles.flexRow,
                            AppStyles.alignItemsCenter,
                            {marginVertical: 15, marginHorizontal: 30},
                          ]}>
                          <View
                            style={[
                              styles.radioParent,
                              !isSelected && {backgroundColor: '#C5C2CB'},
                            ]}>
                            <View style={styles.whiteRing}>
                              <View
                                style={[
                                  styles.radioSelected,
                                  !isSelected && {backgroundColor: '#C5C2CB'},
                                ]}
                              />
                            </View>
                          </View>
                          <Text style={{marginBottom: 2}} size={Fonts.size.xvi}>
                            {item.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                  {multiple && (
                    <View style={styles.buttonParent}>
                      <Button
                        indicatorColor="white"
                        onPress={setOpen}
                        background={Colors.brand.primary}
                        color={Colors.white}
                        type="Bold"
                        size="xSmall">
                        Submit
                      </Button>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </View>
          {isError && (
            <Text type="Normal" size="small" color={Colors.red}>
              {error}
            </Text>
          )}
        </TouchableOpacity>
      )}

      {multiple && (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedValue.map((item) => {
              return (
                <View style={styles.bulletView}>
                  <Text color={Colors.brand.primary}>{item.value}</Text>
                  <TouchableOpacity
                    style={[
                      ,
                      {
                        padding: 3,
                        paddingBottom: 0,
                        paddingLeft: 10,
                      },
                    ]}
                    onPress={() => setSelectedValue(item)}>
                    <RnImage
                      source={Images.SmallCrossPurple}
                      style={{height: 8, width: 8}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </>
  );
}
