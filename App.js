import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import gasto from './src/pages/Gasto';
import novogasto from './src/pages/Novogasto';
import detalhes from './src/pages/Detalhes';

const Stack = createStackNavigator();

export default function App() {






  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gasto">





        <Stack.Screen
          name="Gasto"
          component={gasto}
          options={{
            headerTintColor: "#1967d2",
          }}
        />


        <Stack.Screen
          name="NovoGasto"
          component={novogasto}
          options={{
            headerTintColor: "#1967d2",
          }}
        />

        <Stack.Screen
          name="Detalhes"
          component={detalhes}
          options={{
            headerTintColor: "#1967d2",
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>

  );
}


