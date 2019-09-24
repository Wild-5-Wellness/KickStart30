import React, {useState} from 'react';
import {View} from 'react-native'
import {Text, Picker, Icon} from 'native-base';
import {Alert, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import {TrackingScreen} from './TrackingScreen';
import RadioForm from "react-native-simple-radio-button";
import {socialColor} from '../../components/common/colors'


const SocialTracking = () => {
 

  const [didSociallyConnect, setDidSociallyConnect] = useState(false)
  const [type, setType] = useState("")

 
  submitForm = async () => {
   

    const socialRef = scopeRefByUserAndDate('Surveys', 'social');

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
  };

    return (
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
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              alignSelf: "center",
              fontWeight: "700",
            }}
          >
            Practices
          </Text>
          <Text style={{fontSize: 18, color: "white", textAlign: "center"}}>
            Meet or call a minimum of two friends or family each day for 30
            days.
          </Text>
        </View>
        <View style={{alignItems: "center", marginTop: 10}}>
          <Text
            style={{
              marginBottom: "5%",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Did I Socially Connect With at Least 2 People Today
          </Text>
          <RadioForm
            radio_props={[{label: "Yes", value: 1}, {label: "No", value: 0}]}
            initial={false}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={socialColor}
            selectedButtonColor={socialColor}
            labelStyle={{fontSize: 20, color: "#000"}}
            animation={true}
            onPress={value => {
              setDidSociallyConnect(Boolean(value));
            }}
          />
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>
          What social contacts did you make?
        </Text>
        <Picker
              style={{
                width:(Platform.OS === 'ios') ? undefined : '90%',
                marginLeft: 5, marginRight: 5}}
              selectedValue={type}
              onValueChange={type => setType(type)}
              mode="dropdown"
              placeholder="Type of SocialConnectedness"
              placeholderStyle={{color: '#000'}}
              placeholderIconColor="#000"
              iosIcon={
                <Icon
                  name="ios-arrow-dropdown"
                  style={{color: '#000', fontSize: 25}}
                />
              }
              textStyle={{color: '#000'}}
            >
         
                <Picker.Item label="Called Friend" value="called friend" />
                <Picker.Item label="Met Friend in Person" value="met friend in person" />
                <Picker.Item label="Called Family" value="called family" />
                <Picker.Item label="Met Family in Person" value="met family in person" />
            </Picker>
      </TrackingScreen>
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
