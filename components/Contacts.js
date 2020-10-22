import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';
//import * as Permissions from 'expo-permissions';


export default function ShoppingList() {
  
  //const[hasContactsPermission, setPermission] = useState(null);
  const[contact, setContact] = useState({});
  
  const getContacts = async() => {
    const {status} = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const {data} = await Contacts.getContactsAsync({
        fields:[Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0 ) {
        setContact(data);
        console.log(data)
      }
    }
  }
  
  return (
    <View style = {styles.container}> 
       <View >
          <View style={styles.buttons} >
              <Button title = "get contacts" onPress = {getContacts} />
          </View>
          <View style={styles.listcontainer}>
            <Text style = {{fontSize: 18, color: 'red'}}>Contacts</Text>
            <FlatList data = {contact} renderItem = {
              ({item}) => {
                if(item.phoneNumbers && item.phoneNumbers.length > 0) {
                  return ( <Text style = {{fontSize: 18, color: 'black'}}> {item.name}, {item.phoneNumbers[0].number} </Text >)
                }     
              }
            }/>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  listcontainer: {
    flex: 4,
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    width:200, 
    height:30, 
    borderColor: 'black', 
    borderWidth: 1,
  },

  buttons: { 
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  }
});