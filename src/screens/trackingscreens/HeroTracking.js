import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import heroBackground from "../../images/herobackground.jpeg";
import firebase from "react-native-firebase";
import {TrackingScreen} from "./TrackingScreen";
import {scopeRefByUserAndDate} from "../../utils/firebase";
import {Actions} from "react-native-router-flux";

const radio_props = [{label: "Yes", value: 1}, {label: "No", value: 0}];

const HeroTracking = () => {
  const [heroDaily, setHeroDaily] = React.useState("");
  const [error, setError] = React.useState("")


  const submitForm = React.useCallback(async () => {
    const heroRef = scopeRefByUserAndDate("Surveys", "heroDaily");
    if(heroDaily === ""){
      setError("Please Select an Option")
    } else {
    firebase
      .database()
      .ref(heroRef)
      .update({
        HeroDailyScore: heroDaily,
      })
      .then(() =>
        Alert.alert(
          "Success!",
          "Your Hero exercises for today have been recorded.",
          [
            {
              text: "OK",
              onPress: () => Actions.landing(),
              style: "ok",
            },
          ]
        )
      );
        }
  })
  
  return (
    <TrackingScreen
      backgroundImage={heroBackground}
      color="#333"
      activityTitle="Hero Exercises"
      onSave={submitForm}
    >
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: 110,
            width: "100%",
            alignSelf: "center",
            marginTop: 15,
          }}
        >
          <Image
            source={require('../../images/hero_logo_track.png')}
            style={{flex: 1,height: undefined, width: undefined}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            height: 230,
            width: "100%",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Did I Complete My HERO Exercises Today?
          </Text>
          <RadioForm
            radio_props={radio_props}
            initial={false}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={"#DD3121"}
            labelStyle={{fontSize: 20, color: "#000"}}
            animation={true}
            onPress={value =>{ 
              setError("")
              setHeroDaily(value)}}
          />
        <Text style={{color:'red'}}>{error}</Text>
        </View>
      </SafeAreaView>
    </TrackingScreen>
  );
};

export default HeroTracking;
