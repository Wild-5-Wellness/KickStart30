import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Text, Button, Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import firebase from 'react-native-firebase';
import { Slider } from "react-native-elements";
import { scopeRefByUserAndDate } from '../../utils/firebase'
import {RFValue} from 'react-native-responsive-fontsize'

const screenheight = Dimensions.get("window").height;
const HeroMent = () => {
 
const [mentalWellValue, setMentalWellValue] = useState(0)
  
  submit = () => {
    const heroRef = scopeRefByUserAndDate('HERO')
    firebase
      .database()
      .ref(heroRef)
      .update({
        mentalWellValue
      });
    Actions.heroscore();
  }

  feeling = () => {
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
        <View style={{height: 100, marginTop: 10}}>
          <Text
            style={{
              fontSize: RFValue(30),
              fontWeight: "600",
              textAlign: "center",
              color: "#333"
            }}
          >
            Mental Wellness
          </Text>
        </View>

        <View style={{height: 100}}>
          <Text
            style={{
              fontSize: RFValue(22),
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            On average, during the last 7 DAYS, how would you rate your overall
            mental wellness?
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "stretch",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Slider
            thumbTintColor="#041D5D"
            value={mentalWellValue}
            step={1}
            minimumValue={0}
            maximumValue={10}
            onValueChange={value => setMentalWellValue(value)}
          />
          <Text
            style={{
              fontSize: RFValue(25),
              fontWeight: "600",
              textAlign: "center",
              marginTop: "10%"
            }}
          >
            Value: {mentalWellValue}
          </Text>
          {feeling()}

          <View style={{ alignSelf: "center", marginTop: "10%" }}>
          <TouchableOpacity style={{alignSelf: "center", height: 60, width: 120, borderRadius:28, backgroundColor: "#041D5D", borderWidth: 1, borderColor:'black', justifyContent:'center', flexDirection:'row'}} onPress={() => submit()}>
            <Text style={{color:"#fff", fontSize: RFValue(24), fontWeight:'800', alignSelf:'center'}}>Next</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
    );
  }


export { HeroMent };
