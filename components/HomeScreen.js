import React from'react';
import { View , Text, StyleSheet} from'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({navigation}) {

    return(
    <View style={styles.container}>
        <Text style = {styles.resulttext}>Simple applications developed on Mobile programming course</Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Calculator')}><AntDesign name="calculator" size={24} color="black" />  Calculator with history </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('GuessGame')}> <AntDesign name="question" size={24} color="black" />  Guess the number </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Recipe Finder')}><FontAwesome5 name="receipt" size={24} color="black" />     Ingredient based recipe search </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Shopping List')}><Entypo name="shopping-basket" size={24} color="black" />   Shopping list </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Converter')}><FontAwesome name="euro" size={24} color="black" />      Euro converter </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Find on the map')}><FontAwesome5 name="map-marked-alt" size={24} color="black" />   Find the address on the map </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Find the nearby restaurants')}><MaterialIcons name="restaurant" size={24} color="black" />   Find the nearby restaurants </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Shopping List with DB')}><MaterialCommunityIcons name="database-import" size={24} color="black"/>   Shopping list with SQLite DB </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Shopping List with Firebase')}><MaterialCommunityIcons name="firebase" size={24} color="black" />   Shopping list with Firebase </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('Contacts')}><AntDesign name="contacts" size={24} color="black" />   Contacts </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('TextToSpeech')}><MaterialCommunityIcons name="text-to-speech" size={22} color="black" />   Text-To-Speech </Text>
        <Text style={styles.listItem} onPress={() => navigation.navigate('FavAddresses')}><FontAwesome5 name="map-marked-alt" size={24} color="black" />   Favourite addresses </Text>
        <Text style={styles.listItem} ><AntDesign name="codesquareo" size={24} color="black" />    to be updated.. </Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eaeaee",
      marginTop: 10,
      marginBottom:60,
    },
    resulttext: {
      fontWeight: "bold",
      fontSize: 20,
      width: 300,
      margin:10,
      alignSelf: "center",
      color: 'blue'
    },
    listItem: {
      margin:5,
      padding:5,
      backgroundColor:"#FFF",
      width:"90%",
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:10,
      lineHeight: 19,
       //largeRadius,
    }
  });