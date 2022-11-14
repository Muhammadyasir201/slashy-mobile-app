import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  MapComponent: {
    flex: 1,
  },
  map: {
    height: 190,
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    right: 0,
    margin: 10,
    backgroundColor: Colors.brand.primary,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  text: {
    color: Colors.text.tertiary,
    fontSize: Fonts.size.xxxxSmall,
  },
});
