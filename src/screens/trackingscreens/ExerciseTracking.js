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
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const submitForm = React.useCallback(async () => {
    const exerciseRef = scopeRefByUserAndDate("Surveys", "exercise", date);
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

      Alert.alert("Success!", "Your exercise has been recorded.", [
        {text: "OK", onPress: Actions.landing()},
      ]);
    }
   

    
  }, [didFollowFID]);

  onDateChange = (e, date) => {
    setDate(date);
  };

  return (
    <>
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-end', backgroundColor:'rgba(0,0,0,.8)'}}>
      <View
        style={{
          height: 210,
          backgroundColor: '#fff',
          borderColor: 'red',
          borderWidth: 1,
        }}>
        <DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={false}
          display="default"
          onChange={onDateChange}
        />
      </View>
      <TouchableOpacity
        onPress={()=> setModalVisible(false)}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: '#041D5D',
          borderColor: 'lime',
          borderWidth: 1,
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
            onPress={() => setModalVisible(true)}
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
              {compareAsc(format(new Date(), 'MM-DD'), format(new Date(date), 'MM-DD')) === 0 ? "Today" : format(new Date(date.toString()), 'YYYY-MM-DD')}
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
