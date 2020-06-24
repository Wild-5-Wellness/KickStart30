import React from 'react'
import {createStackNavigator } from '@react-navigation/stack'
import SettingsScreen from '../../screens/Settings'


export default function SettingsStack(){
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={({navigation, route}) => ({
                headerShown: false
              })}
            />
            
        </Stack.Navigator>
    )
} 