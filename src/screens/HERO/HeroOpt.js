import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import firebase from 'react-native-firebase';
import { Slider } from "react-native-elements";
import { scopeRefByUserAndDate } from '../../utils/firebase'
import {RFValue} from 'react-native-responsive-fontsize'
import {SurveyTitle, SurveyQuestion, SurveySlider, SurveyValue, SurveyBtn, SurveyWrapper} from '../../components/heroSurvey/index'

const screenheight = Dimensions.get("window").height;
const HeroOpt = (props) => {
 

 const [optimismValue, setOptimismValue] = useState(0)

  const submit = () => {
    const heroRef = scopeRefByUserAndDate('HERO')
    firebase
      .database()
      .ref(heroRef)
      .update({
        optimismValue
      });
      props.navigation.navigate('Survey',{screen:'MentalWellness'})
  }

  const feeling = () => {
    if (optimismValue === 0) {
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
          Not at all Optimistic
        </Text>
      );
    } else if (optimismValue >= 1 && optimismValue <= 3) {
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
          Mildly Optimistic
        </Text>
      );
    } else if (optimismValue >= 4 && optimismValue <= 6) {
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
          Moderately Optimistic
        </Text>
      );
    } else if (optimismValue >= 7 && optimismValue <= 9) {
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
          Highly Optimistic
        </Text>
      );
    } else if (optimismValue === 10) {
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
          Extremely Optimistic
        </Text>
      );
    }
  };


    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <SurveyWrapper>
          <SurveyTitle title="Optimism"/>
          <SurveyQuestion question="On average, during the last 7 DAYS, how optimistic have you felt?"/>
          <SurveySlider value={optimismValue} onValueChange={setOptimismValue}/>
          <SurveyValue value={optimismValue}/>
          {feeling()}
          <SurveyBtn title="Next" onPress={() => submit()}/>
        </SurveyWrapper>
        </View>
    );
  }


export { HeroOpt };
