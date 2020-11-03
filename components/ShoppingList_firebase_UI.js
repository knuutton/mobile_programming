import React, {useEffect} from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import {firebaseConfig} from './keys.js';
import{ Header } from 'react-native-elements';
import{ Input, Button, ListItem, Icon } from 'react-native-elements';

// Initialize Firebase
  const config = firebaseConfig() ;
// Initialize Firebase
  firebase.initializeApp(config);

export default function ShoppingList() {
  const [product, setProduct] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [shopList, setShopList] = React.useState([]);
  //var db = firebase.database().ref('items/');

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
  
  const renderItem = ({item, id}) => (
    <ListItem bottomDivider >
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
  </ListItem>
);

  return (
    <View style = {styles.container}>
      <Header
        leftComponent={{ icon:'menu', color: '#fff' }}
        centerComponent={{ text:'SHOPPING LIST', style:{ color: '#fff' } }}
        rightComponent={{ icon:'home', color: '#fff' }}/>
      <Input 
          style ={{margin: 5}}
          label='Product'
          placeholder = 'Product'
          value = {product} 
          onChangeText = {product => setProduct(product)}/>
      <Input
          style ={{margin: 5}} 
          label='Amount'
          placeholder='Amount'
          value = {amount} 
          onChangeText = {amount => setAmount(amount)}/>
      <Button 
        raised icon ={{name: 'save'}} 
        onPress = {AddItem}
        title = "Add" />
      <Text style = {{marginTop: 10, fontSize: 20, alignSelf: 'center'}}>Shopping list</Text>
      <FlatList
        keyExtractor = { id => id.toString()}
        data={shopList}
        renderItem = {renderItem}
      />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 

});