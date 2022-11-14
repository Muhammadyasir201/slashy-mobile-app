// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldIcon: {
    position: 'absolute',
    margin: 5,
    resizeMode: 'contain',
  },
  PhoneInputStylesContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.tintBlack,
    ...AppStyles.pBottom10, //20
    marginVertical: 12,
  },
  PhoneInputStyles: {
    padding: 0,
    borderWidth: 0,
    fontSize: Fonts.size.normal,
  },
  input: {
    borderColor: Colors.grey1,
    borderWidth: 1,
    borderRadius: Metrics.borderRadius,
    padding: 12,
    marginTop: 3,
    fontFamily: Fonts.type.Medium,
    color: Colors.grey5,
    fontSize: Fonts.size.normal,
  },
  buttonOverlay: {
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 25,
    height: 25,
  },
  arrowIcon: {
    width: 18 * 0.58,
    height: 18,
    ...AppStyles.mRight10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
});
