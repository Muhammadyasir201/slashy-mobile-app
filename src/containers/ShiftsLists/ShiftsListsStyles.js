import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },

  onGoingJobSecContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.brand.primary,
    paddingVertical: 10,
    borderRadius: Metrics.borderRadius,
    ...AppStyles.marginHorizontalBase,
    ...AppStyles.paddingHorizontalBase,
  },

  onGoingText: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
    opacity: 0.51,
  },

  onGoingcategoryText: {
    fontSize: Fonts.size.xSmall,
    color: Colors.white,
    paddingTop: 2,
  },

  onGoingTime: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
    opacity: 0.75,
    textAlign: 'right',
  },

  onGoingDate: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.white,
    opacity: 0.75,
    marginTop: 2,
    textAlign: 'right',
    paddingTop: 2,
  },

  categoryItemText: {
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: Metrics.smallMargin - 3,
    fontSize: Fonts.size.xxSmall,
    borderColor: Colors.tabbar.primary,
    color: Colors.text.secondary,
  },

  activeTab: {
    color: Colors.brand.primary,
    borderBottomColor: Colors.brand.primary,
    borderBottomWidth: 3,
  },

  selectedItemStyle: {
    backgroundColor: Colors.brand.primary,
    borderColor: Colors.brand.primary,
  },
  loadingStyle: {
    height: Metrics.screenHeight - (Metrics.screenHeight * 40) / 100,
    justifyContent: 'center',
  },
  listItemSecStyle: {
    ...AppStyles.mLeft20,
    ...AppStyles.mRight20,
    ...AppStyles.mTop5,
    ...AppStyles.mBottom10,
  },
  rolesSectView: {
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: Colors.tabbar.primary,
    marginLeft: Metrics.smallMargin,
  },
});
