import React, {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function ShoppingList() {
  const [product, setProduct] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [shopList, setShopList] = React.useState([]);

  const db = SQLite.openDatabase('shoplistdb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoplist (id integer primary key not null, product text, amount text);');
      }, null, updateList);
  }, []);

  const AddItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoplist (product, amount) values (?,?);', 
        [product,  amount]);
    }, null, updateList
  )
    setProduct('');
    setAmount('');
  };

  const updateList = () =>{
    db.transaction(tx => {
      tx.executeSql('select * from shoplist;', [], (_, { rows})  => 
        setShopList(rows._array)
      );
    });
  };

  const deleteItem = (id) => {
    db .transaction(tx  => {
      tx .executeSql('delete from shoplist where id = ?;', [id]);
    }, null, updateList) 
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
        keyExtractor = {item => item.id.toString()}
        renderItem = {({item}) => 
          <View style = {styles.listcontainer}><Text>{item.product}, {item.amount} </Text>
            <Text style = {{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>bought!</Text>
          </ View>}
        data={shopList}
      />
    </View>
  );
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

