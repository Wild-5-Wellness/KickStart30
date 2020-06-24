import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExerciseTracking from '../../screens/trackingscreens/ExerciseTracking';
import MindfulnessTracking from '../../screens/trackingscreens/MindfulnessTracking';
import SleepTracking from '../../screens/trackingscreens/SleepTracking';
import SocialTracking from '../../screens/trackingscreens/SocialTracking';
import NutritionTracking from '../../screens/trackingscreens/NutritionTracking';
import HeroTracking from '../../screens/trackingscreens/HeroTracking';
export default function TrackingStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Exercise" 
      component={ExerciseTracking} 
      />
      <Stack.Screen 
      name="Mindfulness" 
      component={MindfulnessTracking} 
      />
      <Stack.Screen 
      name="Sleep" 
      component={SleepTracking} 
      />
      <Stack.Screen 
      name="Social" 
      component={SocialTracking} 
      />
      <Stack.Screen 
      name="Nutrition" 
      component={NutritionTracking} 
      />
      <Stack.Screen 
      name="Hero" 
      component={HeroTracking} 
      />
    </Stack.Navigator>
  );
}
