import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HeroIntro from '../../screens/HERO/Herointro'
import {
    HeroEnth,
    HeroHappy,
    HeroMent,
    HeroOpt,
    HeroRes,
    HeroScore,
  } from '../../screens/HERO';

export default function SurveyStack(){
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="HeroIntro" component={HeroIntro}/>
            <Stack.Screen name="Happiness" component={HeroHappy}/>
            <Stack.Screen name="Enthusiasm" component={HeroEnth}/>
            <Stack.Screen name="Resilience" component={HeroRes}/>
            <Stack.Screen name="Optimism" component={HeroOpt}/>
            <Stack.Screen name="MentalWellness" component={HeroMent}/>
            <Stack.Screen 
                name="HeroScore" 
                component={HeroScore} 
                options={({navigation, route}) => ({
                    headerShown: false
                    })}/>
        </Stack.Navigator>
    )
}