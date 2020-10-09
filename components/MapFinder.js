import React from 'react';
import{ View , Button, StyleSheet, InputAccessoryView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {mapquestapi} from './keys.js';

export default function MapFinder() {
  const inputAccessoryViewID = 'uniqueID';
  const [address, SetAddress] = React.useState('');
  const [region, SetRegion] = React.useState({latitude: 60.170275, longitude: 24.943749, latitudeDelta: 0.1, longitudeDelta: 0.1});
  const key = mapquestapi();
   
  ShowAddress = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + key +'&location=' + address;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      const lat = jsondata.results[0].locations[0].latLng.lat;
      const lng = jsondata.results[0].locations[0].latLng.lng
      SetRegion({latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02});
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }
  
return (
  <View style={styles.container}>
    <MapView 
        provider={PROVIDER_GOOGLE}
        style = {{flex: 1}}
        region={region}>
    <Marker 
        coordinate={{
            latitude: region.latitude, 
            longitude: region.longitude
          }}
        title={address}/>
    </MapView>
    <InputAccessoryView >
      <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={address => SetAddress(address)}
              placeholder = 'Type address'>
          </TextInput>
          <Button onPress = {ShowAddress} title='Show'></Button>
      </View>
    </InputAccessoryView>
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