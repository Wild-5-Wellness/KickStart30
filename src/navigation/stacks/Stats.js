import React from 'react'
import {createStackNavigator } from '@react-navigation/stack'
import Statistics from '../../screens/Statistics'



export default function StatsStack(){
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Stats" 
            component={Statistics}
            options={({navigation, route}) => ({
                headerShown: false
              })}
            />
        </Stack.Navigator>
    )
}