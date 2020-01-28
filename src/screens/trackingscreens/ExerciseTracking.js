import React,{useState} from "react";
import {Alert, View, Text, Modal, SafeAreaView, TouchableOpacity} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import firebase from "react-native-firebase";
import {Actions} from "react-native-router-flux";
import exbackground from "../../images/exercise-background.jpg";
import {TrackingScreen} from "./TrackingScreen";
import {withAuthProvider} from "../../context/authcontext";
import {scopeRefByUserAndDate} from "../../utils/firebase";
import {exerciseColor} from "../../components/common/colors";
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, compareAsc} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize'

const exerciseTypes = [
  "Walking",
  "Jogging",
  "Biking",
  "Playing Sports",
  "Swimming",
  "Weight Lifting",
  "Aerobics",
  "Water Aerobics",
  "Other",
];


function ExerciseTracking() {
  const [didFollowFID, setDidFollowFID] = React.useState();
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
    if(compareAsc(format(new Date(), 'MM-DD'), format(new Date(state.date), 'MM-DD')) === 0){
      return "Today"
    } else{
      return format(new Date(state.date.toString()), 'MMM DD YYYY')
    }
  } else{
   return format(new Date(date), 'MMM DD YYYY')
  }  
}

  const submitForm = React.useCallback(async () => {
    const exerciseRef = scopeRefByUserAndDate("Surveys", "exercise", Platform.OS === 'android' ? date : state.date);
    console.log(typeof didFollowFID)
     if(didFollowFID === undefined){
      setError("Please Select an Option")
    } else {
      await firebase
      .database()
      .ref(exerciseRef)
      .update({
        didFollowFID
      });

      Alert.alert("Success!", `Your exercise for ${displayDateText()} has been recorded.`, [
        {text: "OK", onPress: Actions.landing()},
      ]);
    }
   

    
  }, [didFollowFID]);

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
  };

  return (
    <>
    <Modal animationType="slide" transparent={true} visible={state.modalVisible}>
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-end', backgroundColor:'rgba(0,0,0,.8)'}}>
    {state.show &&  <View
        style={{
          height: 210,
          backgroundColor: '#fff',
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
        backgroundImage={exbackground}
        color={exerciseColor}
        activityTitle="Exercise"
        onSave={submitForm}
      >
        {showAndroidDatePicker(state.showAndroid)}
        <View
          style={{
            backgroundColor: exerciseColor,
            alignSelf: "center",
            marginVertical: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: RFValue(26),
              color: "white",
              alignSelf: "center",
              fontWeight: "700",
            }}
          >
            Practices
          </Text>
          <Text style={{fontSize: RFValue(18), color: "white", textAlign: "center"}}>
            Exercise 30 minutes each day for 30 days, aim for at least moderate
            intensity.
          </Text>
        </View>
        <TouchableOpacity
            onPress={() => setState(prevState=>({...prevState,show: Platform.OS === 'ios' ? true : false, modalVisible: Platform.OS === 'ios' ? true : false, showAndroid: Platform.OS === 'android' ? true : false }))}
            style={{
              height: 50,
              width: '80%',
              backgroundColor: exerciseColor,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
              <Text style={{color: '#fff'}}>
              {displayDateText()}
            </Text>
          </TouchableOpacity>
        <View style={{alignItems: "center", marginTop: 10}}>
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Did I exercise today following the FID principles?
          </Text>
          <RadioForm
            radio_props={[
              {label: "Yes", value: true},
              {label: "No", value: false},
            ]}
            initial={false}
            formHorizontal={false}
            buttonColor={exerciseColor}
            selectedButtonColor={exerciseColor}
            animation={true}
            onPress={value =>{ 
              setError("")
              setDidFollowFID(value)}}
            radioStyle={{marginRight: 10}}
          />
          <Text style={{color:'red'}}>{error}</Text>
        </View>
      </TrackingScreen>
    </>
  );
}
export default withAuthProvider(ExerciseTracking);
