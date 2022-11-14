import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: 20,
    flex: 1,
  },
  fab: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: Colors.fab,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  resendParent: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.text.secondary,

    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  errorParent: {
    marginTop: 10,
  },
  loadingParent: {
    position: 'absolute',
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
