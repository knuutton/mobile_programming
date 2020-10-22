import React from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';


export default function GuessGame() {
  
  const [text, setText] = React.useState('');
  
  const speak = () => {
    Speech.speak(text);
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.container}>
        <TextInput  
          style = {styles.form} 
          onChangeText= {text => setText(text)}
          value={text}/>
        </View>
      <View style={styles.buttons}>
        <Button onPress = {speak} title = "Press to hear text" />
      </View>
    </View>
  );
  
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: "#eaeaea",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  form: {
    width:200, 
    height:30, 
    borderColor: 'black', 
    backgroundColor: "white", 
    borderWidth: 1,
  },

  buttons: {
    flex: 2, 
    width: 150,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  }
});