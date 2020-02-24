import React, { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { Actions } from "react-native-router-flux";
import firebase from 'react-native-firebase';
import { Slider } from "react-native-elements";
import { scopeRefByUserAndDate } from '../../utils/firebase'
import {format} from 'date-fns';
import {RFValue} from 'react-native-responsive-fontsize'
import {SurveyTitle, SurveyQuestion, SurveySlider, SurveyValue, SurveyBtn, SurveyWrapper} from '../../components/heroSurvey/index'

const screenheight = Dimensions.get("window").height;
const HeroHappy = () => {
  
const [happyValue, setHappyValue] = useState(0)
const [date, setDate] =  useState(format(new Date(), 'YYYY-MM-DD'))




  

  submit = () => {
    const heroRef = scopeRefByUserAndDate('HERO')
    firebase
      .database()
      .ref(heroRef)
      .update({
        happyValue
      });
    Actions.heroenth();
  }

  feeling = () => {
    if (happyValue === 0) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "8%",
            color: "red"
          }}
        >
          Not at all Happy
        </Text>
      );
    } else if (happyValue >= 1 && happyValue <= 3) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "8%",
            color: "orange"
          }}
        >
          Mildly Happy
        </Text>
      );
    } else if (happyValue >= 4 && happyValue <= 6) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "8%",
            color: "#fad859"
          }}
        >
          Moderately Happy
        </Text>
      );
    } else if (happyValue >= 7 && happyValue <= 9) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "8%",
            color: "#2ecc71"
          }}
        >
          Highly Happy
        </Text>
      );
    } else if (happyValue === 10) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "8%",
            color: "#52b3d9"
          }}
        >
          Extremely Happy
        </Text>
      );
    }
  };


    return (
      <View style={{ backgroundColor: "white", flex: 1}}>
        <SurveyWrapper>
        <SurveyTitle title="Happiness"/>
        <SurveyQuestion question="On average, during the last 7 DAYS, how happy have you felt?"/>
          <SurveySlider
            value={happyValue}
            onValueChange={setHappyValue}
          />
          <SurveyValue value={happyValue}/>
          {feeling()}
          <SurveyBtn onPress={() => submit()}/>
          </SurveyWrapper>
          </View>
    );
  }


export { HeroHappy };
