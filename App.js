import React from 'react';
import { StyleSheet} from 'react-native';
import HomeScreen from './components/HomeScreen';
import Calculator from './components/Calculator';
import HistoryScreen from './components/HistoryScreen';
import GuessGame from './components/GuessGame';
import Recipelist from './components/RecipeList';
import ShoppingList from './components/ShoppingList';
import ShoppingListDB from './components/ShoppingList_db';
import ShoppingListFirebase from './components/ShoppingList_firebase_UI';
import Converter from './components/Converter';
import RestFinder from './components/MapFinder_google';
import MapFinder from './components/MapFinder_loc';
import Contacts from './components/Contacts';
import TextToSpeech from './components/TextToSpeech';
import FavAddresses from './components/FavAddresses';
import MapFinderFavor from './components/MapFinder_favor';


import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Home" component={HomeScreen} />
          <Stack.Screen name = "Calculator" component={Calculator} />
          <Stack.Screen name = "History" component={HistoryScreen} />
          <Stack.Screen name = "GuessGame" component={GuessGame} />
          <Stack.Screen name = "Recipe Finder" component={Recipelist} />
          <Stack.Screen name = "Shopping List" component={ShoppingList} />
          <Stack.Screen name = "Converter" component={Converter} />
          <Stack.Screen name = "Find on the map" component={MapFinder} />
          <Stack.Screen name = "Find the nearby restaurants" component={RestFinder} />
          <Stack.Screen name = "Shopping List with DB" component={ShoppingListDB} options = {{headerMode: 'none', headerShown: false,}} />
          <Stack.Screen name = "Shopping List with Firebase" component={ShoppingListFirebase} options = {{headerMode: "none", headerShown: false,}} />
          <Stack.Screen name = "Contacts" component={Contacts} />
          <Stack.Screen name = "TextToSpeech" component={TextToSpeech} />
          <Stack.Screen name = "FavAddresses" component={FavAddresses} options = {{headerMode: 'none', headerShown: false,}} />
          <Stack.Screen name = "Map" component={MapFinderFavor} options = {{headerMode: 'none', headerShown: false,}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
