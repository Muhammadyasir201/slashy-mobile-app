import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },

  titleOfSectionList: {
    marginVertical: 10,
    fontSize: Fonts.size.xSmall,
    color: Colors.text.secondary,
  },
});
