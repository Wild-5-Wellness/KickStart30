import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import firebase from 'react-native-firebase';
import { scopeRefByUserAndDate } from '../../utils/firebase'
import {RFValue} from 'react-native-responsive-fontsize'
import {SurveyTitle, SurveyQuestion, SurveySlider, SurveyValue, SurveyBtn, SurveyWrapper} from '../../components/heroSurvey/index'

const screenheight = Dimensions.get("window").height;
const HeroRes = (props) => {


const [resilienceValue, setResilienceValue] = useState(0)

  const submit = () => {
    const heroRef = scopeRefByUserAndDate('HERO')
    firebase
      .database()
      .ref(heroRef)
      .update({
        resilienceValue
      });
      props.navigation.navigate('Survey',{screen:'Optimism'})
  }

  const feeling = () => {
    if (resilienceValue === 0) {
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
          Not at all Resilient
        </Text>
      );
    } else if (resilienceValue >= 1 && resilienceValue <= 3) {
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
          Mildly Resilient
        </Text>
      );
    } else if (resilienceValue >= 4 && resilienceValue <= 6) {
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
          Moderately Resilient
        </Text>
      );
    } else if (resilienceValue >= 7 && resilienceValue <= 9) {
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
          Highly Resilient
        </Text>
      );
    } else if (resilienceValue === 10) {
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
          Extremely Resilient
        </Text>
      );
    }
  };


    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <SurveyWrapper>
          <SurveyTitle title="Resilience"/>
          <SurveyQuestion question="On average, during the last 7 DAYS, how resilient have you felt?"/>
          <SurveySlider value={resilienceValue} onValueChange={setResilienceValue}/>
          <SurveyValue value={resilienceValue} />
          {feeling()}
          <SurveyBtn title="Next" onPress={() => submit()}/>
        </SurveyWrapper>
        </View>
    );
  }


export { HeroRes };
