import React from'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';


export default function Calculator({navigation}) {
    const [result, setResult] = React.useState(0);
    const [number1, setNumber1] = React.useState('');
    const [number2, setNumber2] = React.useState('');
    const [history, setHistory] = React.useState([]);
  
    const Summarize = () => {
      const res = parseFloat(number1) + parseFloat(number2);
      const stringCalc = number1 + ' + ' + number2 + ' = ' + res.toFixed(2);
      setHistory([stringCalc, ...history]);
      setResult(res);
    };
  
    const Substract = () => {
      const res = parseFloat(number1) - parseFloat(number2);
      const stringCalc = number1 + ' - ' + number2 + ' = ' + res.toFixed(2);;
      setHistory([stringCalc, ...history]);
      setResult(res);
    };
    
    return (
      <View style = {styles.container}>
        <View style = {styles.container}>
            <Text style = {styles.resulttext}>Result: {result.toFixed(2)} </Text>
            <TextInput 
              keyboardType = "numeric" 
              style = {styles.form} 
              value = {String(number1.replace(/,/g, '.'))} 
              onChangeText = {number1 => setNumber1(number1)}/>
            <TextInput 
              keyboardType = "numeric" 
              style = {styles.form} 
              value = {String(number2.replace(/,/g, '.'))} 
              onChangeText = {number2 => setNumber2(number2)}/>
        </View>
        <View style={styles.buttons} >
            <Button title = "+" onPress = {Summarize} />
            <Button title = "-" onPress = {Substract} />
            <Button title = "History" onPress = {() => navigation.navigate('History', {history}) } />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#eaeaea",
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  
    resulttext: {
      fontSize: 18,
      color: 'blue'
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
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
    }
  });