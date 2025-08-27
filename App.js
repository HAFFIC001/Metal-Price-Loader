import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Metals' }} />
        <Stack.Screen name="Detail" component={Detail} options={({route}) => ({ title: route.params.metal })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
