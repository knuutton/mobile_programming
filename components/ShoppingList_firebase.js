import React, {useEffect} from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import {firebaseConfig} from './keys.js';

// Initialize Firebase
  const config = firebaseConfig() ;
// Initialize Firebase
  firebase.initializeApp(config);

export default function ShoppingList() {
  const [product, setProduct] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [shopList, setShopList] = React.useState([]);

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setShopList(prods);
    });
  }, []);
      
  const AddItem = () => {
    firebase.database().ref('items/').push(
      {'product': product, 'amount': amount}
    );
    setProduct('');
    setAmount('');
  };

  return (
    <View style = {styles.container}>
      <TextInput 
          style = {styles.form}
          placeholder = 'Product'
          value = {product} 
          onChangeText = {product => setProduct(product)}/>
      <TextInput 
          style = {styles.form}
          placeholder='Amount'
          value = {amount} 
          onChangeText = {amount => setAmount(amount)}/>
      <Button title = "Add" onPress = {AddItem} />
      <Text style = {{marginTop: 10, fontSize: 20}}>Shopping list</Text>
      <FlatList
        style = {{margin: '5%'}}
        keyExtractor = {id => id.toString()}
        renderItem = {({item}) => 
          <View style = {styles.listcontainer}><Text>{item.product}, {item.amount} </Text></ View>}
        data={shopList}
      />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  listcontainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  form: {
    width: 200, 
    height: 30, 
    borderColor: 'black', 
    borderWidth: 1,
  },
});