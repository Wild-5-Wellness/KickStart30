import React, { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { Actions } from "react-native-router-flux";
import firebase from 'react-native-firebase';
import { Slider } from "react-native-elements";
import { scopeRefByUserAndDate } from '../../utils/firebase'
import {format} from 'date-fns';

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
            fontSize: 25,
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
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
            fontSize: 25,
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
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
            fontSize: 25,
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
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
            fontSize: 25,
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
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
            fontSize: 25,
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10%",
            color: "#52b3d9"
          }}
        >
          Extremely Happy
        </Text>
      );
    }
  };


    return (
      <View style={{ backgroundColor: "white", height: screenheight }}>
        <View style={{height: 100, marginTop: 10}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            Happiness
          </Text>
        </View>

        <View style={{height: 60}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            On average, during the last 7 DAYS, how happy have you felt?
          </Text>
        </View>

        <View
          style={{
            height: 70,
            alignItems: "stretch",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "10%"
          }}
        >
          <Slider
            value={happyValue}
            step={1}
            minimumValue={0}
            maximumValue={10}
            onValueChange={value => setHappyValue(value)}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            Value: {happyValue}
          </Text>
          <View style={{height: 65}}>
          {feeling()}
          </View>
          <View style={{ alignSelf: "center", marginTop: "10%" }}>
          <TouchableOpacity style={{alignSelf: "center", height: 60, width: 120, borderRadius:28, backgroundColor: "#041D5D", borderWidth: 1, borderColor:'black', justifyContent:'center', flexDirection:'row'}} onPress={() => submit()}>
            <Text style={{color:"#fff", fontSize: 24, fontWeight:'800', alignSelf:'center'}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }


export { HeroHappy };
