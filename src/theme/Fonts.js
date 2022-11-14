// @flow

import {Platform} from 'react-native';

const type = {
  Black: Platform.select({
    ios: 'Axiforma-Black',
    android: 'Axiforma-Black',
  }),
  BlackItalic: Platform.select({
    ios: 'Axiforma-BlackItalic',
    android: 'Axiforma-BlackItalic',
  }),
  Bold: Platform.select({
    ios: 'Axiforma-Bold',
    android: 'Axiforma-Bold',
  }),
  BoldItalic: Platform.select({
    ios: 'Axiforma-BoldItalic',
    android: 'Axiforma-BoldItalic',
  }),
  Book: Platform.select({
    ios: 'Axiforma-Book',
    android: 'Axiforma-Book',
  }),
  BookItalic: Platform.select({
    ios: 'Axiforma-BookItalic',
    android: 'Axiforma-BookItalic',
  }),
  ExtraBold: Platform.select({
    ios: 'Axiforma-ExtraBold',
    android: 'Axiforma-ExtraBold',
  }),
  ExtraBoldItalic: Platform.select({
    ios: 'Axiforma-ExtraBoldItalic',
    android: 'Axiforma-ExtraBoldItalic',
  }),
  Heavy: Platform.select({
    ios: 'Axiforma-Heavy',
    android: 'Axiforma-Heavy',
  }),
  HeavyItalic: Platform.select({
    ios: 'Axiforma-HeavyItalic',
    android: 'Axiforma-HeavyItalic',
  }),
  Italic: Platform.select({
    ios: 'Axiforma-Italic',
    android: 'Axiforma-Italic',
  }),
  Light: Platform.select({
    ios: 'Axiforma-Light',
    android: 'Axiforma-Light',
  }),
  LightItalic: Platform.select({
    ios: 'Axiforma-LightItalic',
    android: 'Axiforma-LightItalic',
  }),
  Medium: Platform.select({
    ios: 'Axiforma-Medium',
    android: 'Axiforma-Medium',
  }),
  MediumItalic: Platform.select({
    ios: 'Axiforma-MediumItalic',
    android: 'Axiforma-MediumItalic',
  }),
  Regular: Platform.select({
    ios: 'Axiforma-Regular',
    android: 'Axiforma-Regular',
  }),
  SemiBold: Platform.select({
    ios: 'Axiforma-SemiBold',
    android: 'Axiforma-SemiBold',
  }),
  SemiBoldItalic: Platform.select({
    ios: 'Axiforma-SemiBoldItalic',
    android: 'Axiforma-SemiBoldItalic',
  }),
  ThinItalic: Platform.select({
    ios: 'Axiforma-ThinItalic',
    android: 'Axiforma-ThinItalic',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxSmall: 10,
  xxxSmall: 11,
  xii: 12,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  xvi: 16,
  normal: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40,
};

export default {
  type,
  size,
};
