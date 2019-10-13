import React, {useEffect} from 'react'
import {View, SafeAreaView, Image, Text, ScrollView, Dimensions} from 'react-native'
import KS30title from "../../images/KS30_578_113.png";
import wild5title from "../../images/wild5_logo_resized4.png";
import Navigation from "../LandingNavigation"
import Navbar from "../Navbar"

const { width, height} = Dimensions.get('window')
export default LandingView = (props) => {

  useEffect(()=>{
    console.log(Dimensions.get('window'))
    console.log(Dimensions.get('screen'))
  },[])

    return (
       
     !props.hero && !props.hero2? 
     <ScrollView bounces={false}>
          <Image
            source={KS30title}
            style={{
              width: "80%",
              resizeMode: "contain",
              marginTop: "3%",
              alignSelf: "center"
            }}
          />
          <View style={{ flex: 1 }}>
            <Navigation hero={props.hero} hero2={props.hero2} />
          </View>
          <Image
            source={wild5title}
            style={{
              width: "80%",
              marginTop: "15%",
              resizeMode: "contain",
              marginBottom: "2%",
              alignSelf: "center"
            }}
          />
          </ScrollView> 
          : props.hero && props.hero2 ?
          <ScrollView bounces={false}>
          <Image
            source={KS30title}
            style={{
              width: "80%",
              resizeMode: "contain",
              marginTop: "3%",
              alignSelf: "center"
            }}
          />
          <View style={{ flex: 1 }}>
            <Navigation hero={props.hero} hero2={props.hero2} day={props.day}/>
          </View>
          <Image
            source={wild5title}
            style={{
              width: "80%",
              marginTop: "5%",
              resizeMode: "contain",
              marginBottom: "2%",
              alignSelf: "center"
            }}
          />
          </ScrollView> 
           :
             <>
               <Navigation hero={props.hero} hero2={props.hero2} day={props.day}/>
            </>
    )
}