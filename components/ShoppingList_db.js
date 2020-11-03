import React, {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import{ Input, Button, ListItem, Header, Icon } from 'react-native-elements';

export default function ShoppingList({navigation}) {
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

  const renderItem = ({item}) => (
    <ListItem bottomDivider >
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron 
          name='trash'
          type='font-awesome'
          color='#f50'
          onPress={() => deleteItem(item.id)} />
  </ListItem>
  );

  return (
    <View style = {styles.container}>
      <Header
        leftComponent={<Icon type  ="material" name  = "home" onPress = {() => navigation.navigate('Home')} />}
        centerComponent={{ text:'SHOPPING LIST', style:{ color: '#fff' } }}/>
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
        keyExtractor = {item => item.id.toString()}
        renderItem = {renderItem}
        data={shopList}
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