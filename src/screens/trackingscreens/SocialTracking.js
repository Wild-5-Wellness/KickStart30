import React, {useState, useEffect} from 'react';
import {View, Modal, Text, TouchableOpacity, SafeAreaView, Platform} from 'react-native'
import {Alert, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import {TrackingScreen} from './TrackingScreen';
import RadioForm from "react-native-simple-radio-button";
import {socialColor} from '../../components/common/colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, compareAsc} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize'

const SocialTracking = () => {
 

  const [didSociallyConnect, setDidSociallyConnect] = useState()
  const [error, setError] = React.useState("")
  const [state, setState] = useState({
    date: new Date(),
    modalVisible: false,
    show: false,
    showAndroid: false
  })

const [date, setDate] = useState(new Date())

const displayDateText = () => {
   if(Platform.OS === 'ios'){
     if(format(new Date(), 'MM-DD') === format(new Date(state.date), 'MM-DD')){
       return "Today"
     } else{
       return format(new Date(state.date.toString()), 'MMM DD YYYY')
     }
   } else{
    return format(new Date(date), 'MMM DD YYYY')
   }  
}

useEffect(() => {
  console.log(displayDateText())
}, [date])
 
  submitForm = async () => {
   

    const socialRef = scopeRefByUserAndDate('Surveys', 'social', Platform.OS === 'android' ? date : state.date);

    if(didSociallyConnect === undefined){
      setError("Please Select an Option")
    } else {
    await firebase
      .database()
      .ref(socialRef)
      .update({
        didSociallyConnect
      });

    // Add error handling here...

    Alert.alert(
      "Success!",
      `Your social interactions for ${displayDateText()} have been recorded.`,
      [{text: "OK", onPress: Actions.landing()}]
    );
    }
  };

  const showAndroidDatePicker = (state) => {
    console.log("this is happening?", date)
    switch(state){
      case true:
        return (
              <DateTimePicker
                value={date}
                show={state.show}
                mode={'date'}
                is24Hour={false}
                display="default"
                onChange={onDateChangeAndroid}
                />
        )
    }
  }

  const onDateChangeAndroid = (e, date) => {
    if(date === undefined){
      setState(prevState=>({...prevState, showAndroid: false}))
    } else if (date !== undefined){
      setState(prevState=>({...prevState, showAndroid: false}))
      setDate(date)
    }
    
  }

  onDateChange = (e, date) => {
    setState(prevState=>({...prevState, date: date, show: Platform.OS === 'ios' ? true : false}))
  };;

    return (
      <>
           <Modal animationType="slide" transparent={true} visible={state.modalVisible}>
          <SafeAreaView style={{flex: 1, justifyContent: 'flex-end', backgroundColor:'rgba(0,0,0,.8)'}}>
          {state.show &&  <View
        style={{
          height: 210,
          backgroundColor: '#fff'
        }}>
        <DateTimePicker
          value={state.date}
          show={state.show}
          mode={'date'}
          is24Hour={false}
          display="default"
          onChange={onDateChange}
        />
      </View>}
            <TouchableOpacity
              onPress={()=>setState(prevState=>({...prevState, modalVisible: false }))}
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#041D5D',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
      </Modal>
      <TrackingScreen
        backgroundImage={{uri: "social-tracking-bg"}}
        color={socialColor}
        activityTitle="Social Connectedness"
        onSave={submitForm}
      >
        {showAndroidDatePicker(state.showAndroid)}
        <View
          style={{
            backgroundColor: socialColor,
            width: "85%",
            alignSelf: "center",
            height: 100,
            marginVertical: 10,
          }}
        >
          <Text
          allowFontScaling={false}
            style={{
              fontSize: RFValue(20),
              color: "white",
              alignSelf: "center",
              fontWeight: "700",
            }}
          >
            Practices
          </Text>
          <Text allowFontScaling={false} style={{fontSize: RFValue(18), color: "white", textAlign: "center"}}>
            Meet or call a minimum of two friends or family each day for 30
            days.
          </Text>
        </View>
        <View style={{alignItems: "center", marginTop: 10}}>
          <Text
            style={{
              marginBottom: "5%",
              fontSize: RFValue(20),
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Did I socially connect with at least 2 people today?
          </Text>
          <RadioForm
            radio_props={[{label: "Yes", value: 1}, {label: "No", value: 0}]}
            initial={false}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={socialColor}
            selectedButtonColor={socialColor}
            labelStyle={{fontSize: RFValue(20), color: "#000"}}
            animation={true}
            onPress={value => {
              setError("")
              setDidSociallyConnect(Boolean(value));
            }}
          />
             <TouchableOpacity
            onPress={() => setState(prevState=>({...prevState,show: Platform.OS === 'ios' ? true : false, modalVisible: Platform.OS === 'ios' ? true : false, showAndroid: Platform.OS === 'android' ? true : false }))}
            style={{
              height: 30,
              width: '60%',
              backgroundColor: socialColor,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#fff'}}>
              {displayDateText()}
            </Text>
          </TouchableOpacity>
          <Text style={{color:'red'}}>{error}</Text>
        </View>
      </TrackingScreen>
      </>
    );
  }


const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    marginTop: '10%',
    fontWeight: '600',
  },
});



export default SocialTracking;
