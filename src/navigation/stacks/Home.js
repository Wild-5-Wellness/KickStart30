import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../../screens/Landing';
import SurveyStack from '../stacks/Survey'
import {Head} from '../../components/Head'


const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Landing}
        options={({navigation, route}) => ({
          headerShown: false
        })}
      />
      
    </Stack.Navigator>
  );
}
