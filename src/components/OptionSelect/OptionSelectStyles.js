import {StyleSheet, Platform} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  search: {
    borderBottomWidth: 1,
    borderColor: Colors.tintBlack,
    ...AppStyles.pBottom10, //20
    ...AppStyles.marginVerticalBase,
  },
  searchICon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  fieldIcon: {
    position: 'absolute',
    margin: 5,
    resizeMode: 'contain',
  },
  bulletView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.brand.primary,
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 10,
    marginRight: 7,
    borderRadius: 20,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
    backgroundColor: 'rgba(193, 167, 207, 0.28)',
  },
  doneButton: {
    marginRight: 47,
    marginTop: 21,
  },
  modalParentView: {
    width: Metrics.screenWidth,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inputView: {
    flex: 2,
    zIndex: 900,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalSubParent: {
    backgroundColor: 'white',
    maxHeight: Metrics.screenHeight / 1.75,
    width: Metrics.screenWidth - 50,
    borderRadius: 25,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  modalHeader: {
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 30,
  },
  radioParent: {
    height: 17,
    width: 17,
    borderRadius: 8,

    backgroundColor: Colors.brand.primary,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteRing: {
    backgroundColor: 'white',
    height: 13,
    width: 13,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    height: 9,
    width: 9,
    borderRadius: 5,
    backgroundColor: Colors.brand.primary,
  },
  buttonParent: {
    paddingHorizontal: 40,
    marginTop: 20,
  },
});
