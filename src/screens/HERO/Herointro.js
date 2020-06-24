import React from "react";
import { View, Dimensions, Image, TouchableOpacity, SafeAreaView  } from "react-native";
import { Text, Button, Icon } from "native-base";
import HEROlogo from "../../images/herologo.png";
import {RFValue} from 'react-native-responsive-fontsize'

const screenheight = Dimensions.get("window").height;
const HeroIntro = (props) => {
  console.log("HEROINTROProps", props)
  return (
    <View style={{ backgroundColor: "white", flex:1 }}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{ width: "80%", alignSelf: "center", marginTop: "10%" }}>
          <Image
            source={HEROlogo}
            style={{ width: "100%", resizeMode: "contain" }}
          />
        </View>

        <View style={{width: '90%', alignSelf:'center'}}>
          <Text
            style={{
              marginTop: "7%",
              fontSize: RFValue(24),
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            The HERO Wellness Scale is your way to measure and track your wellness goals.
          </Text>
        </View>
        <View>
          <Text
            style={{
              marginTop: "15%",
              fontSize: RFValue(20),
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            Check Your HERO Wellness Score
          </Text>
        </View>
        <View style={{marginTop:'7%'}}>
          <TouchableOpacity style={{alignSelf: "center", height: 60, width: 120, borderRadius:28, backgroundColor: "#041D5D", borderWidth: 1, borderColor:'black', justifyContent:'center', flexDirection:'row'}} onPress={() => props.navigation.navigate('Survey',{screen:"Happiness"})}>
            <Text style={{color:"#fff", fontSize: RFValue(24), fontWeight:'800', alignSelf:'center'}}>Start</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    </View>
  );
};

export default HeroIntro;
