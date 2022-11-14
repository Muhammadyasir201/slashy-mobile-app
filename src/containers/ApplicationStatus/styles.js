import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.lightGrey,
  },

  main: {
    flex: 2,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    height: 102,
    width: 107,
    resizeMode: 'contain',
  },

  text1: {
    fontFamily: Fonts.type.Black,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 33,
  },

  text2: {
    fontFamily: Fonts.type.Regular,
    color: Colors.text.secondary,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.8,
    marginTop: 16,
    textAlign: 'center',
    width: 240,
  },
});
