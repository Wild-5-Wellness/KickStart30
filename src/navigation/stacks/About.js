import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Help from '../../screens/accountmenu/Help';
;
export default function AboutStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
     <Stack.Screen name="About" component={Help}/>
    </Stack.Navigator>
  );
}
