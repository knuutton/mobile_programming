import React, {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import{ Input, Button, ListItem, Header, Icon } from 'react-native-elements';

export default function FavAddresses({navigation}) {
  const [address, setAddress] = React.useState('');
  const [addressBook, setAddressBook] = React.useState([]);

  const db = SQLite.openDatabase('addressbookdb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addressbook (id integer primary key not null, address text);');
      }, null, updateList);
  }, []);

  const SaveAddress = () => {
    db.transaction(tx => {
      tx.executeSql('insert into addressbook (address) values (?);', 
        [address]);
    }, null, updateList
  )
    setAddress('');
  };

  const updateList = () =>{
    db.transaction(tx => {
      tx.executeSql('select * from addressbook;', [], (_, { rows})  => 
        setAddressBook(rows._array)
      );
    });
  };

  const deleteAddress = (id) => {
    db .transaction(tx  => {
      tx .executeSql('delete from addressbook where id = ?;', [id]);
    }, null, updateList) 
  };

  const renderItem = ({item}) => (
    <ListItem 
      onLongPress = {() => deleteAddress(item.id)}
      onPress = {() => navigation.navigate('Map', (item.address))}
      >
      <ListItem.Content>
        <ListItem.Title>{item.address}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
  </ListItem>
  );

  return (
    <View style = {styles.container}>
      <Header
        leftComponent={<Icon type  ="material" name  = "home" onPress = {() => navigation.navigate('Home')} />}
        centerComponent={{ text:'My places', style:{fontSize: 16, color: '#fff' } }}/>
      <Input 
          style ={{margin: 5}}
          label='Placefinder'
          placeholder = 'Type in address'
          value = {address} 
          onChangeText = {address => setAddress(address)}/>
      <Button 
        raised icon ={{name: 'save'}} 
        onPress = {SaveAddress}
        title = "Save" />
      <Text style = {{marginTop: 10, fontSize: 20, alignSelf: 'center'}}>Saved addresses</Text>
      <FlatList 
        keyExtractor = {item => item.id.toString()}
        renderItem = {renderItem}
        data={addressBook}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});