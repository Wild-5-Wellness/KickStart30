import React,{useState} from 'react';
import {View, Alert, Modal, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import firebase from 'react-native-firebase';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import sleepTrackingImage from '../../images/sleeptracking.jpg';
import {TrackingScreen} from './TrackingScreen';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import {sleepColor} from '../../components/common/colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, compareAsc} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize'

const SleepTracking = () => {
  const [
    didImplementSleepPractices,
    setDidImplementSleepPractices,
  ] = React.useState();

  const [sleepHygiene, setSleepHygiene] = React.useState("")
  const [error, setError] = React.useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());


  const submitForm = React.useCallback(async () => {
    const sleepRef = scopeRefByUserAndDate('Surveys', 'sleep', date);
    if(didImplementSleepPractices === undefined){
      setError("Please Select an Option")
    }else {
    await firebase
      .database()
      .ref(sleepRef)
      .update({
        didImplementSleepPractices
      });

    Alert.alert('Success!', 'Your sleep hygiene practices have been recorded.', [
      {text: 'OK', onPress: Actions.landing()},
    ]);
  }
  }, [
    didImplementSleepPractices
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
        backgroundImage={sleepTrackingImage}
        color={sleepColor}
        activityTitle="Sleep"
        onSave={submitForm}
      >
        <View
          style={{
            backgroundColor: sleepColor,
            width: '85%',
            alignSelf: 'center',
            height: 90,
            marginVertical: 10
          }}
        >
          <Text
            style={{
              fontSize: RFValue(20),
              color: 'white',
              alignSelf: 'center',
              fontWeight: '700',
            }}
          >
            Practices
          </Text>
          <Text style={{fontSize: RFValue(18), color: 'white', textAlign: 'center'}}>
            Implement 4 or more of the 6 sleep hygiene practices each day for 30
            days
          </Text>
        </View>
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: 50,
              width: '80%',
              backgroundColor: sleepColor,
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
              marginBottom: '5%',
              fontSize: RFValue(20),
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            Did I implement 4 or more of the 6 sleep hygiene practices?
          </Text>
          <RadioForm
            radio_props={[
              {label: 'Yes', value: true},
              {label: 'No', value: false},
            ]}
            initial={false}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={sleepColor}
            selectedButtonColor={sleepColor}
            labelStyle={{fontSize: RFValue(20), color: '#000'}}
            animation={true}
            onPress={value =>{ 
              setError("")
              setDidImplementSleepPractices(value)}}
          />
          <Text style={{color:'red'}}>{error}</Text>
        </View>
      </TrackingScreen>
      </>
  );
};
export default SleepTracking;
