import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {
  Text,
  ShiftsListsItem,
  CustomNavbar,
  ShiftCheckListItem,
  Button,
} from '../../components';
import styles from './ShiftCheckListStyles';
import {Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {shiftListTabs} from '../../components/Tabbar';
import {getNumberOfShifts} from '../../services/generalHelper';

export default function ShiftCheckListView(props) {
  const {
    shift,
    ShiftCheckLists,
    handleClickCheckbox,
    isClicked,
    handleConfirmPress,
    loading,
  } = props;

  return (
    <View style={styles.container}>
      <CustomNavbar title={strings.Shift_Description} />

      <ScrollView contentContainerStyle={styles.scrollSecStyle}>
        <View style={styles.shiftItemSecStyle}>
          <ShiftsListsItem
            shift={shift}
            navigateOnPress={false}
            noOfShifts={
              _.has(shift, 'slots') ? getNumberOfShifts(shift.slots) : 0
            }
          />
        </View>

        <View style={{...AppStyles.mTop10}}>
          <FlatList
            data={ShiftCheckLists}
            renderItem={({item, index}) => {
              return (
                <ShiftCheckListItem
                  ShiftCheckLists={item}
                  keyExtractor={(item, index) => item.id}
                  handleClickCheckbox={handleClickCheckbox}
                  isClicked={isClicked}
                  index={index}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={[AppStyles.mTop40, AppStyles.mBottom40]}>
          <Button
            onPress={handleConfirmPress}
            isLoading={loading}
            background={Colors.brand.primary}
            color={Colors.white}>
            {strings.CONFIRM}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
