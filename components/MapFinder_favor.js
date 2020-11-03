import React, { useEffect } from 'react';
import{ View , StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {google} from './keys.js';
import{ Header, Icon } from 'react-native-elements';

export default function MapFavorite({route, navigation}) {
  const [address, SetAddress] = React.useState(route.params);
  const [region, SetRegion] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  });
  const [lat, SetLat] = React.useState(0);
  const [lng, SetLng] = React.useState(0);
  const key = google();

  useEffect(() => {
    GetAddress();
  }, []); 

  const GetAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      SetLat(jsondata.results[0].geometry.location.lat);
      SetLng(jsondata.results[0].geometry.location.lng);
      SetRegion({
        latitude: jsondata.results[0].geometry.location.lat,
        longitude: jsondata.results[0].geometry.location.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      });
    })
    .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
  }
  
return (
  <View style={styles.container}>
    <Header
        leftComponent={<Icon type = "material" name = "arrow-back" onPress = {() => navigation.navigate('FavAddresses')} />}
        centerComponent={{ text:'MAP', style:{ fontSize: 16, color: '#fff' } }}/>
    <MapView 
        provider={PROVIDER_GOOGLE}
        style = {{flex: 1}}
        region={region}
    >
    <Marker
        coordinate={{
          latitude: lat, 
          longitude: lng
        }}
        title={address}
      />
    </MapView>
  </View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 40,
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      backgroundColor: 'white',
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
    }, 
  });