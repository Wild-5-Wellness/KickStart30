import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import heroBackground from '../../images/herobackground.jpeg';
import firebase from 'react-native-firebase';
import {TrackingScreen} from './TrackingScreen';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import {Actions} from 'react-native-router-flux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, compareAsc} from 'date-fns';

const radio_props = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 0},
];

const HeroTracking = () => {
  const [heroDaily, setHeroDaily] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(true);

  const submitForm = React.useCallback(async () => {
    const heroRef = scopeRefByUserAndDate('Surveys', 'heroDaily', date);
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
            'Your HERO exercises for today have been recorded.',
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
        backgroundImage={heroBackground}
        color="#333"
        activityTitle="HERO Exercises"
        onSave={submitForm}>
        <SafeAreaView style={{flex: 1}}>
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
            onPress={() => setModalVisible(true)}
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
              {compareAsc(format(new Date(), 'MM-DD'), format(new Date(date), 'MM-DD')) === 0 ? "Today" : format(new Date(date.toString()), 'YYYY-MM-DD')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 10,
              borderColor: 'lime',
              borderWidth: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
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
              labelStyle={{fontSize: 20, color: '#000'}}
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
