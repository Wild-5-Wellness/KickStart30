import React,{useState} from 'react';
import {ScrollView, View, SafeAreaView, Alert, Modal, Text, TouchableOpacity} from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const submitForm = React.useCallback(async () => {
    const nutritionRef = scopeRefByUserAndDate('Surveys', 'nutrition');
    if(loggedNutritionToday === undefined){
      setError("Please Select an Option")
    }else {
    await firebase
      .database()
      .ref(nutritionRef)
      .update({
        loggedNutritionToday
      });

    Alert.alert('Success!', 'Your nutrition for today has been recorded.', [
      {text: 'OK', onPress: Actions.landing()},
    ]);
  }
  }, [
    loggedNutritionToday
  ]);

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
          backgroundImage={nutriTrackingImage}
          color={nutritionColor}
          activityTitle="Nutrition"
          onSave={submitForm}
        >
          <ScrollView style={{flex: 1}}>
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
            <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: 50,
              width: '80%',
              backgroundColor: nutritionColor,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#fff'}}>
              {compareAsc(format(new Date(), 'MM-DD'), format(new Date(date), 'MM-DD')) === 0 ? "Today" : format(new Date(date.toString()), 'YYYY-MM-DD')}
            </Text>
          </TouchableOpacity>
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
              <Text style={{color:'red'}}>{error}</Text>
            </View>
            <View>
            </View>
          </ScrollView>
        </TrackingScreen>
        </>
   );
};
export default NutritionTracking;
