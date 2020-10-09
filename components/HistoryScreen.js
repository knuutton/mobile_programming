import React from'react';
import{ View , Text, StyleSheet, FlatList} from'react-native';

export default function HistoryScreen({route}) {
    const {history} = route.params;
    return(
    <View style={styles.container}>
        <Text style = {styles.resulttext}>History</Text>
        <FlatList data = {history} renderItem = {({item}) => 
        <Text style = {{fontSize: 18, color: 'black'}}> {item} </Text > } />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#eaeaee",
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    resulttext: {
      fontSize: 18,
      color: 'blue'
    },
  
  });