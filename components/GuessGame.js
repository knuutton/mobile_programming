import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';


export default function GuessGame() {
  
  const [num, setNum] = React.useState('');
  const [infoText, setInfoText] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [randNum, setRandNum] = React.useState(0);
  
  useEffect( () => {
    newGame();
  }, []);

  const newGame = () => {
    setRandNum(Math.floor(Math.random() * 100) + 1);
    setInfoText('Guess a number between 1-100');
    setCount(0);
  };

  const checkGame = () => {
    if (num < randNum) {
      setInfoText('Your guess ' + num + ' is too low');
      setCount(count + 1);
    }
    else if (num > randNum) {
      setInfoText('Your guess ' + num + ' is too high');
      setCount(count + 1);
    }
    else {
      Alert.alert('You guessed the number in ' + (count + 1) + ' guesses')
      newGame();
      setNum('');
    }
  };
  

  return (
    <View style = {styles.container}>
      <View style = {styles.container}>
        <Text style = {styles.resulttext}>{infoText}</Text>
        <TextInput 
          keyboardType = "numeric" 
          style = {styles.form} 
          onChangeText= {num => setNum(num)}
          value={num}/>
        </View>
      <View style={styles.buttons}>
        <Button onPress = {checkGame} title = "Make Guess" />
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

  resulttext: {
    fontSize:22,
    color: 'red'
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

/*export default function App() {
  
  const [num, setNum] = React.useState('');
  const [infoText, setInfoText] = React.useState('');
  const [count, setCount] = React.useState(0);
  
  useEffect( () => {
    newGame();
  }, []);

  const newGame = () => {
    const randNum = (Math.floor(Math .random() * 100) + 1);
    setInfoText('Guess a number between 1-100');
    setCount(0);
  };

  const checkGame = () => {
    if (num < randNum) {
      setInfoText('Your guess ' + num + ' is too low');
      setCount(count + 1);
    }
    else if (num > randNum) {
      setInfoText('Your guess ' + num + ' is too high');
      setCount(count + 1);
    }
    else {
      Alert.alert('You guessed the number in ' + (count + 1) + ' guesses')
      newGame();
      //setRandNum(Math.floor(Math .random() * 100) + 1);
      //setCount(1);
     // setInfoText('Guess a number between 1-100');
    }
  };
  

  return (
    <View style = {styles.container}>
      <View style = {styles.container}>
        <Text style = {styles.resulttext}>{infoText}</Text>
        <TextInput 
          keyboardType = "numeric" 
          style = {styles.form} 
          onChangeText= {num => setNum(num)}
          value={num}/>
        </View>
      <View style={styles.buttons}>
        <Button onPress = {checkGame} title = "Make Guess" />
      </View>
    </View>
  );
  
  };*/