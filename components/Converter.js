import React, {useEffect}  from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {Picker} from '@react-native-community/picker';

export default function Converter() {

  const [amount, setAmount] = React.useState(0);
  const [rates, setRates] = React.useState([]);
  const [currency, setCurrency] = React.useState('');
  const [result, setResult] = React.useState(0);

  useEffect( () => {
    newApp()
  }, []);

  const newApp = () => {  
    fetch('https://api.exchangeratesapi.io/latest')
    .then((response) => response.json())
    .then((jsondata) => { 
      setRates(jsondata.rates);
    })
    .catch((error) => { 
      Alert.alert('Error', error); 
    }); 
  }

  const convertion = () => {  
    const rate = rates[currency];
    setResult((amount/rate).toFixed(2))
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
          <Text style={styles.text}>{result} euro</Text>
      </View>
      <View style={styles.input}>
          <Text style={styles.text}>Please choose the currency: </Text>
          <Picker selectedValue={currency} onValueChange={value => setCurrency(value)}>
            {
                Object.keys(rates).map((item, index) => <Picker.Item key={index} label={item} value={item} /> )
            }
            </Picker>
            <Text style={styles.text}>Please insert the amount: </Text>
            <TextInput style={styles.textInput} placeholder = 'amount' type = 'numeric' onChangeText = {amount => setAmount(amount)} />
            <Button title="Convert" onPress={convertion} />
        </View> 
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  result: {
    flex: 1,
    marginTop: 10,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  input: {
    flex: 10,
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  textInput: {
    fontSize: 30,
    marginLeft: 10,
    alignSelf: 'center',
  }
});
