import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, Linking} from 'react-native';

export default function App() {
  const [ingr, setIngr] = useState('');
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + ingr;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
        setRecipe(jsondata.results);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }

  const Item = ({ item }) => {
    const url = item.href
    return (
      <View style={styles.listItem}>
          <Image source={{uri:item.thumbnail}}  style={{width:60, height:60, borderRadius:5}} />
          <View style={{alignItems:"center",flex:1}}>
              <Text style={{fontWeight:"bold"}} onPress={() => Linking.openURL(url)}>{item.title}</Text>
          </View>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bigBlue}> Please insert ingredients: </Text>
        <TextInput
          style={styles.textInput}
          value={ingr} 
          placeholder="onions,garlic,etc"
          onChangeText={(ingr) => setIngr(ingr)} />
        <Button title="Find" onPress={getRecipe} />
        <FlatList 
        style={styles.results}
        data={recipe} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => <Item item={item}/>} />  
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  textInput: {
    fontSize: 18,
    width: 300,
    margin: 10,
    alignSelf: "center",
    backgroundColor:"#FFEFD5",
  },
  bigBlue: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: 10,
  },
  listItem:{
    margin:5,
    padding:5,
    backgroundColor:"#FFF",
    width:"90%",
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});