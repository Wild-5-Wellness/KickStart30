import React, { useState } from "react";
import { View, Dimensions,TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { Actions } from "react-native-router-flux";
import firebase from 'react-native-firebase';
import { Slider } from "react-native-elements";
import { scopeRefByUserAndDate } from '../../utils/firebase'
import {RFValue} from 'react-native-responsive-fontsize'
import {SurveyTitle, SurveyQuestion, SurveySlider, SurveyValue, SurveyBtn, SurveyWrapper} from '../../components/heroSurvey/index'

const screenheight = Dimensions.get("window").height;
const HeroEnth = () => {
  
  const [enthusiasmValue, setEnthusiasmValue] = useState(0)


  submit = () => {
    const heroRef = scopeRefByUserAndDate('HERO')
    firebase
      .database()
      .ref(heroRef)
      .update({
        enthusiasmValue
      });
    Actions.herores();
  }

  feeling = () => {
    if (enthusiasmValue === 0) {
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
          Not at all Enthusiastic
        </Text>
      );
    } else if (enthusiasmValue >= 1 && enthusiasmValue <= 3) {
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
          Mildly Enthusiastic
        </Text>
      );
    } else if (enthusiasmValue >= 4 && enthusiasmValue <= 6) {
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
          Moderately Enthusiastic
        </Text>
      );
    } else if (enthusiasmValue >= 7 && enthusiasmValue <= 9) {
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
          Highly Enthusiastic
        </Text>
      );
    } else if (enthusiasmValue === 10) {
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
          Extremely Enthusiastic
        </Text>
      );
    }
  };

    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
      <SurveyWrapper>
      <SurveyTitle title="Enthusiasm"/>
      <SurveyQuestion question="On average, during the last 7 DAYS, how enthusiastic have you felt?"/>
      <SurveySlider value={enthusiasmValue} onValueChange={setEnthusiasmValue}/>
      <SurveyValue value={enthusiasmValue}/>
      {feeling()}
      <SurveyBtn onPress={() => submit()}/>
      </SurveyWrapper>
      </View>
    );
  }


export { HeroEnth };
