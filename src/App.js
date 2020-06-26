import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import {View, ActivityIndicator} from 'react-native'
import firebase from 'react-native-firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Theme} from './context/ThemeProvider'
import AuthProvider from "./context/authcontext";
import TabNavigator from './navigation/TabNavigator'
import TrackingStack from './navigation/stacks/Tracking'
import SurveyStack from './navigation/stacks/Survey';
import AuthStack from './navigation/stacks/Auth'
import AboutStack from './navigation/stacks/About'




const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const Stack = createStackNavigator();

  const dateDifference =  async () => {
    const checkDate = await
      firebase
      .database()
      .ref(`UserInfo/${getScopedUser()}`)
      .once('value', snap => {
        if (snap.val() !== null) {
          let date = snap.val().date;
          const todaysDate = moment().startOf('day');
          const initialDate = moment(date);
          const returnedDays = todaysDate.diff(initialDate, 'days');
          console.log('inital/todays', todaysDate, initialDate);
          console.log('number of days since signup', returnedDays);
          this.setState({daysSinceSignUp: returnedDays});
        }
      })

      const checkSurveyComplete = await 
      firebase
      .database()
      .ref(`FeedbackSurvey/${getScopedUser()}`)
      .once('value', snap => {
        if (snap.val() !== null) {
          this.setState({isSurveyComplete: true});
        } else {
          this.setState({isSurveyComplete: false});
        }
      })
    
      return Promise.all([checkDate, checkSurveyComplete]);
  
  };


  useEffect(()=>{
    unsubscribe = firebase.auth().onAuthStateChanged(user => {
         if (user) {
          setUser(user)
          setLoading(false);
        } else{
          setUser(null)
          setLoading(false);
         }
        });
        return () => {
         unsubscribe();
        }
      
  },[user])

  if(loading){
    return <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large"/>
    </View>
  }
 
    return (
      <NavigationContainer>
        <Theme>
      <AuthProvider>
      <Stack.Navigator>
          {
            user !== null ?
            <>
          <Stack.Screen 
          name="Home" 
          component={TabNavigator}
          options={({navigation, route}) => ({
            headerShown: false
          })}
          />
          <Stack.Screen name="Tracking" component={TrackingStack}/>
          <Stack.Screen name="Survey" component={SurveyStack}/>
          <Stack.Screen name="About" component={AboutStack}/>
          </>
          :
          <Stack.Screen 
          name="Auth" 
          component={AuthStack}
          options={({navigation, route}) => ({
            headerShown: false
          })}
          />
          }
        </Stack.Navigator>
      </AuthProvider>
        </Theme>
      </NavigationContainer>
    );
  
}




// 
export default App;
