import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Text, Button, Icon } from "native-base";
import firebase from 'react-native-firebase';
import { Slider } from "react-native-elements";
import { scopeRefByUserAndDate } from '../../utils/firebase'
import {RFValue} from 'react-native-responsive-fontsize'
import {SurveyTitle, SurveyQuestion, SurveySlider, SurveyValue, SurveyBtn, SurveyWrapper} from '../../components/heroSurvey/index'

const screenheight = Dimensions.get("window").height;
const HeroMent = (props) => {
 
const [mentalWellValue, setMentalWellValue] = useState(0)
  
  const submit = () => {
    const heroRef = scopeRefByUserAndDate('HERO')
    firebase
      .database()
      .ref(heroRef)
      .update({
        mentalWellValue
      });
      props.navigation.navigate('Survey',{screen:'HeroScore'})

  }

  const feeling = () => {
    if (mentalWellValue === 0) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
            color: "red"
          }}
        >
          Not at all Good
        </Text>
      );
    } else if (mentalWellValue >= 1 && mentalWellValue <= 3) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
            color: "orange"
          }}
        >
          Mildly Good
        </Text>
      );
    } else if (mentalWellValue >= 4 && mentalWellValue <= 6) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
            color: "#fad859"
          }}
        >
          Moderately Good
        </Text>
      );
    } else if (mentalWellValue >= 7 && mentalWellValue <= 9) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
            color: "#2ecc71"
          }}
        >
          Highly Good
        </Text>
      );
    } else if (mentalWellValue === 10) {
      return (
        <Text
          style={{
            fontSize: RFValue(25),
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
            color: "#52b3d9"
          }}
        >
          Extremely Good
        </Text>
      );
    }
  };

    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
       <SurveyWrapper>
         <SurveyTitle title="Mental Wellness"/>
         <SurveyQuestion question="On average, during the last 7 DAYS, how would you rate your overall
            mental wellness?"/>
            <SurveySlider value={mentalWellValue} onValueChange={setMentalWellValue}/>
            <SurveyValue value={mentalWellValue}/>
            {feeling()}
            <SurveyBtn title="Next" onPress={() => submit()}/>
       </SurveyWrapper>
        </View>
    );
  }


export { HeroMent };
