import React, {useEffect} from 'react';
import{ View , Button, StyleSheet, InputAccessoryView, Text} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {mapquestapi} from './keys.js';

export default function MapFinder() {
  const inputAccessoryViewID = 'uniqueID';
  const [location, setLocation] = React.useState(null);
  const [address, SetAddress] = React.useState('');
  const [region, SetRegion] = React.useState({latitude: 0, longitude: 0, latitudeDelta: 1, longitudeDelta: 1});
  const [marker, SetMarker] = React.useState('');
  const key = mapquestapi();
  
  useEffect(() => {
      getLocation();
    }, []); 
  
  const getLocation = async () => {
    //Check permission
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('No permission to access location');
    }
    else{
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;
        SetRegion({latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02});
    }
};

let text = 'Waiting for location...';
    if (location) {
        text = '';
}
  
ShowAddress = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + key + '&location=' + address;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      const lat = jsondata.results[0].locations[0].latLng.lat;
      const lng = jsondata.results[0].locations[0].latLng.lng;
      SetMarker(jsondata.results[0].locations[0].street)
      SetRegion({latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02});
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }
  
return (
  <View style={styles.container}>
      <Text>{text}</Text>
    <MapView 
        provider={PROVIDER_GOOGLE}
        style = {{flex: 1}}
        region={region}>
    <Marker 
        coordinate={{
            latitude: region.latitude, 
            longitude: region.longitude
          }}
        title={marker}/>
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