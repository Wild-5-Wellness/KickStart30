import React,{useState} from 'react';
import {ScrollView, View, SafeAreaView, Alert, Modal, Text, TouchableOpacity, Platform} from 'react-native';
import firebase from 'react-native-firebase';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import nutriTrackingImage from '../../images/nutritracking.jpg';
import {TrackingScreen} from './TrackingScreen';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import { nutritionColor } from '../../components/common/colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, compareAsc} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize'

const NutritionTracking = () => {
  const [loggedNutritionToday, setLoggedNutritionToday] = useState();
  const [error, setError] = useState("")
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

  const submitForm = React.useCallback(async () => {
    const nutritionRef = scopeRefByUserAndDate('Surveys', 'nutrition', Platform.OS === 'android' ? date : state.date);
    if(loggedNutritionToday === undefined){
      setError("Please Select an Option")
    }else {
    await firebase
      .database()
      .ref(nutritionRef)
      .update({
        loggedNutritionToday
      });

    Alert.alert('Success!', `Your nutrition for ${displayDateText()} has been recorded.`, [
      {text: 'OK', onPress: Actions.landing()},
    ]);
  }
  }, [
    loggedNutritionToday
  ]);

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
          backgroundImage={nutriTrackingImage}
          color={nutritionColor}
          activityTitle="Nutrition"
          onSave={submitForm}
        >
          {showAndroidDatePicker(state.showAndroid)}
            <View
              style={{
                backgroundColor: nutritionColor,
                width: '100%',
                alignSelf: 'center',
                marginVertical: 10
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '700',
                }}
              >
                Practices
              </Text>
              <Text style={{fontSize: RFValue(16), color: 'white', textAlign: 'center', paddingBottom:5}}>
                Log your daily meals/snacks/beverages/alcohol each day for 30
                days, follow the MIND diet principles as closely as you can
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text
                style={{
                  color: '#000',
                  marginBottom: '5%',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Did I log my meals, snacks, and beverages, including alcohol
                today?
              </Text>
              <RadioForm
                radio_props={[
                  {label: 'Yes', value: true},
                  {label: 'No', value: false},
                ]}
                initial={false}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={nutritionColor}
                selectedButtonColor={nutritionColor}
                labelStyle={{fontSize: RFValue(20), color: '#000'}}
                animation={true}
                onPress={value =>{ 
                  setError("")
                  setLoggedNutritionToday(value)}}
              />
            <TouchableOpacity
            onPress={() => setState(prevState=>({...prevState, show: Platform.OS === 'ios' ? true : false, modalVisible: Platform.OS === 'ios' ? true : false, showAndroid: Platform.OS === 'android' ? true : false }))}
            style={{
              height: 30,
              width: '60%',
              backgroundColor: nutritionColor,
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
            <View>
            </View>
        </TrackingScreen>
        </>
   );
};
export default NutritionTracking;
