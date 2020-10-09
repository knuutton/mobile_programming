import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function ShoppingList() {
  const [unit, setUnit] = React.useState('');
  const [shopList, setShopList] = React.useState([]);

  const Add = () => {
    setShopList([...shopList, unit]);
    setUnit('');
  };

  const Clear = () => {
    setShopList([]);
    setUnit('');
  };

  return (
    <View style = {styles.container}>
      <View style = {styles.container}>
          <TextInput 
            style = {styles.form} 
            value = {unit} 
            onChangeText = {unit => setUnit(unit)}/>
      </View>
      <View style={styles.buttons} >
          <Button title = "Add" onPress = {Add} />
          <Button title = "Clear" onPress = {Clear} />
      </View>
      <View style={styles.listcontainer}>
        <Text style = {{fontSize: 18, color: 'red'}}>Shopping List</Text>
        <FlatList data = {shopList} renderItem = {({item}) => 
        <Text style = {{fontSize: 18, color: 'black'}}> {item} </Text > } />
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

