import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/NewLoginScreen';
import RegisterScreen from '../../screens/RegisterPage';
export default function AuthStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={({navigation, route}) => ({
        headerShown: false
      })}
      />
      <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={({navigation, route}) => ({
        headerShown: false
      })}
      />
    </Stack.Navigator>
  );
}
