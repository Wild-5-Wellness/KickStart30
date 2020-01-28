import React, {useState} from 'react';
import {View, Modal, Text, TouchableOpacity, SafeAreaView} from 'react-native'
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
  const [type, setType] = useState("")
  const [error, setError] = React.useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
 
  submitForm = async () => {
   

    const socialRef = scopeRefByUserAndDate('Surveys', 'social');

    if(didSociallyConnect === undefined){
      setError("Please Select an Option")
    } else {
    await firebase
      .database()
      .ref(socialRef)
      .update({
        didSociallyConnect,
       type
      });

    // Add error handling here...

    Alert.alert(
      "Success!",
      "Your social interactions for today have been recorded.",
      [{text: "OK", onPress: Actions.landing()}]
    );
    }
  };

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
        backgroundImage={{uri: "social-tracking-bg"}}
        color={socialColor}
        activityTitle="Social Connectedness"
        onSave={submitForm}
      >
        <View
          style={{
            backgroundColor: socialColor,
            width: "85%",
            alignSelf: "center",
            height: 90,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: RFValue(20),
              color: "white",
              alignSelf: "center",
              fontWeight: "700",
            }}
          >
            Practices
          </Text>
          <Text style={{fontSize: RFValue(18), color: "white", textAlign: "center"}}>
            Meet or call a minimum of two friends or family each day for 30
            days.
          </Text>
        </View>
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: 50,
              width: '80%',
              backgroundColor: socialColor,
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
