import React,{useState} from 'react';
import {View, Alert, Modal, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import firebase from 'react-native-firebase';
import RadioForm from 'react-native-simple-radio-button';
import {TrackingScreen} from './TrackingScreen';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import {Actions} from 'react-native-router-flux';
import mindTrackingImage from '../../images/mindfultracking1.jpg';
import {mindfulnessColor} from '../../components/common/colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, compareAsc} from 'date-fns';

const types = [
  'Mindfulness',
  'Transcendental',
  'Silent',
  'Qigong',
  'Compassion',
  'Other',
];

const MindfulnessTracking = () => {
  const [didMeditateToday, setDidMeditateToday] = useState();
  const [error, setError] = useState("")
  const [state, setState] = useState({
    date: new Date(),
    modalVisible: false,
    show: false,
    showAndroid: false
  })

const [date, setDate] = useState(new Date())


  const submitForm = React.useCallback(async () => {
    const mindfulnessRef = scopeRefByUserAndDate('Surveys', 'mindfulness', Platform.OS === 'android' ? date : state.date);
    if(didMeditateToday === undefined){
      setError("Please Select an Option")
    }else {
    await firebase
      .database()
      .ref(mindfulnessRef)
      .update({
        didMeditateToday,
      });

    Alert.alert('Success!', 'Your mindfulness for today has been recorded.', [
      {text: 'OK', onPress: Actions.landing()},
    ]);
  }
  }, [didMeditateToday]);

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
          borderColor: 'red',
          borderWidth: 1,
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
        backgroundImage={mindTrackingImage}
        color={mindfulnessColor}
        activityTitle="Mindfulness"
        onSave={submitForm}
      >
        {showAndroidDatePicker(state.showAndroid)}
        <View
          style={{
            marginVertical: 10,
            backgroundColor: mindfulnessColor,
            width: '85%',
            alignSelf: 'center',
            height: 90,
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
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            Practice mindfulness for at least 10 minutes each day for 30 days.
          </Text>
        </View>
        <TouchableOpacity
            onPress={() => setState(prevState=>({...prevState, modalVisible: Platform.OS === 'ios' ? true : false, showAndroid: Platform.OS === 'android' ? true : false }))}
            style={{
              height: 50,
              width: '80%',
              backgroundColor: mindfulnessColor,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#fff'}}>
              {Platform.OS === 'ios' ? compareAsc(format(new Date(), 'MM-DD'), format(new Date(state.date), 'MM-DD')) === 0 ? "Today" : format(new Date(state.date.toString()), 'YYYY-MM-DD') : format(new Date(date), 'MMM DD YYYY')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                marginBottom: '5%',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              Did I mindfully meditate at least 10 mintues today?
            </Text>
            <RadioForm
              radio_props={[
                {label: 'Yes', value: true},
                {label: 'No', value: false},
              ]}
              initial={false}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={mindfulnessColor}
              animation={true}
              onPress={value =>{ 
                setError("")
                setDidMeditateToday(value)}}
            />
            <Text style={{color:'red'}}>{error}</Text>
          </View>
      </TrackingScreen>
    </>
  );
};
export default MindfulnessTracking;
