import React from 'react';
import {View, TouchableOpacity, Linking, Platform} from 'react-native';
import styles from './MapComponentStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {strings} from '../../constants';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Text} from '../../components';
export default function MapComponentView(props) {
  const {coordinates} = props;
  const {lat, lng} = coordinates;

  return (
    <View style={styles.MapComponent}>
      <MapView
        style={styles.map}
        minZoomLevel={2}
        provider={PROVIDER_GOOGLE} // remove if not using Google MapComponents
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0321,
          // longitudeDelta: 0.0922,
          // latitudeDelta: 0.0921,
        }}>
        <MapView.Marker
          coordinate={{latitude: lat, longitude: lng}}
          // title={'title'}
          // description={'description'}
          image={Images.MapMarkerIcon}
        />
      </MapView>

      <TouchableOpacity
        style={styles.overlay}
        onPress={() => {
          Platform.OS === 'android'
            ? Linking.openURL(`google.navigation:q=${lat}+${lng}`)
            : Linking.openURL(
                `http://maps.google.com/maps?daddr=${lat}+${lng}`,
              );
        }}>
        <Text style={styles.text}>{strings.Get_Directions}</Text>
      </TouchableOpacity>
    </View>
  );
}
