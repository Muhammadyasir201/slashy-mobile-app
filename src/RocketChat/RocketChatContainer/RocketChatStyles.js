import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../RCTheme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    flexDirection: 'column',
  },
  chatListWrap: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  chatViewWrap: {
    backgroundColor: Colors.background.secondary,
    flex: 1,
  },
  chatMessageSec: {
    flexDirection: 'row',
    marginBottom: Metrics.smallMargin,
  },
  sendBtnBg: {
    backgroundColor: Colors.whatsappGreen,
    borderRadius: Metrics.borderRadiusXLargeMedium,
    height: 50,
    width: 50,
    marginLeft: Metrics.smallMargin,
  },
  textInputStyle: {
    margin: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  sendBtnSecWrap: {
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: Metrics.borderRadiusXLargeMedium,
    alignItems: 'center',
  },
  stickyDate: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.pictonBlue,
    borderRadius: Metrics.borderRadiusMedium,
    marginBottom: Metrics.smallMargin,
    marginTop: Metrics.baseMargin,
  },
  stickyDateText: {
    color: Colors.grey5,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,
    fontSize: Fonts.size.small,
  },
  sendBtnStyle: {
    height: 17,
    width: 17,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    paddingLeft: Metrics.baseMargin,
    fontSize: Fonts.size.xSmall,
    height: 50,
  },
  titleStyle: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    alignSelf: 'center',
  },
  customNavBarStyle: {
    height: 60,
    backgroundColor: Colors.white,
  },
  sectionListPadding: {
    paddingTop: Metrics.smallMargin,
    paddingLeft: Metrics.smallMargin,
    marginRight: Metrics.baseMargin,
  },
  connectingStatusStyle: {
    position: 'absolute',
    width: '100%',
    top: 0,
    backgroundColor: '#A8A8A8',
  },
  connectingStatusTextStyle: {
    textAlign: 'center',
  },
  noInternetConnSec: {
    backgroundColor: Colors.background.primary,
    padding: 15,
  },
  okBtn: {
    alignSelf: 'flex-end',
  },
  noInternetErrorStyle: {
    fontSize: Fonts.size.medium,
    color: Colors.text.primary,
  },
  okBtnTextStyle: {
    fontSize: Fonts.size.medium,
    color: Colors.whatsappGreen,
  },
});
