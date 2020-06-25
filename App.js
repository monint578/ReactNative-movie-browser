import React from 'react';
import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
Button
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/HomePage';
import DetailsPage from './screens/DetailsPage';
import BrowsePage from './screens/BrowsePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name='Home'  component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='DetailsPage' component={DetailsPage} 
          options={{ 
            title: 'Go back', 
            headerStyle: {backgroundColor: 'teal'}, 
            headerTitleStyle: {color: 'whitesmoke'},
            headerTintColor: 'whitesmoke',
          }}/>
        <Stack.Screen name='BrowsePage' component={BrowsePage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
