import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Platform
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import heroBackground from '../../images/herobackground.jpeg';
import firebase from 'react-native-firebase';
import {TrackingScreen} from './TrackingScreen';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import {Actions} from 'react-native-router-flux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, compareAsc} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize'

const radio_props = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 0},
];

const HeroTracking = () => {
  const [heroDaily, setHeroDaily] = useState('');
  const [error, setError] = useState('');
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
    const heroRef = scopeRefByUserAndDate('Surveys', 'heroDaily', Platform.OS === 'android' ? date : state.date);
    if (heroDaily === '') {
      setError('Please Select an Option');
    } else {
      firebase
        .database()
        .ref(heroRef)
        .update({
          HeroDailyScore: heroDaily,
        })
        .then(() =>
          Alert.alert(
            'Success!',
            `Your HERO exercises for ${displayDateText()} have been recorded.`,
            [
              {
                text: 'OK',
                onPress: () => Actions.landing(),
                style: 'ok',
              },
            ],
          ),
        );
    }
  });

  const onDateChange = (e, date) => {
    console.log("date running")
    setState(prevState=>({...prevState, date: date}))
  };

  const onDateChangeAndroid = (e, date) => {
    if(date === undefined){
      setState(prevState=>({...prevState, showAndroid: false}))
    } else if (date !== undefined){
      setState(prevState=>({...prevState, showAndroid: false}))
      setDate(date)
    }
    
  }

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

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={state.modalVisible}>
          <SafeAreaView style={{flex: 1, justifyContent: 'flex-end', backgroundColor:'rgba(0,0,0,.8)'}}>
            {state.show &&<View
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
        backgroundImage={heroBackground}
        color="#333"
        activityTitle="HERO Exercises"
        onSave={submitForm}>
        <SafeAreaView style={{flex: 1}}>
          {showAndroidDatePicker(state.showAndroid)}
          <View
            style={{
              height: 110,
              width: '100%',
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <Image
              source={require('../../images/hero_logo_track.png')}
              style={{flex: 1, height: undefined, width: undefined}}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            onPress={() => setState(prevState=>({...prevState, show: Platform.OS === 'ios' ? true : false, modalVisible: Platform.OS === 'ios' ? true : false, showAndroid: Platform.OS === 'android' ? true : false }))}
            style={{
              height: 50,
              width: '80%',
              backgroundColor: '#333',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#fff'}}>
              {displayDateText()}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 10
            }}>
            <Text
              style={{
                fontSize: RFValue(20),
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Did I complete my HERO exercises today?
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={false}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={'#DD3121'}
              labelStyle={{fontSize: RFValue(20), color: '#000'}}
              animation={true}
              onPress={value => {
                setError('');
                setHeroDaily(value);
              }}
            />
            <Text style={{color: 'red'}}>{error}</Text>
          </View>
        </SafeAreaView>
      </TrackingScreen>
    </>
  );
};

export default HeroTracking;
