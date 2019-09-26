import React from 'react'
import {View, SafeAreaView, Image, Dimensions, Text} from 'react-native'
import KS30title from "../../images/KS30_578_113.png";
import wild5title from "../../images/wild5_logo_resized4.png";
import Navigation from "../LandingNavigation"
import Navbar from "../Navbar"
import {ProgressRing} from '../charts/ProgressRing'

const {width} = Dimensions.get('window');
const tileSize = width / 2 - 15;

export default InitialHero = (props) => {
  console.log(props.daysTotal)
    return (
        <View style={{ flex: 1, backgroundColor:'#fff' }}>
      <SafeAreaView style={{ flex: 1 }}>
          <Image
            source={KS30title}
            style={{
              width: "80%",
              resizeMode: "contain",
              marginTop: "3%",
              alignSelf: "center"
            }}
          />
          <View style={{ marginTop: "2%", flex: 1 }}>
            <Navigation hero={props.hero} hero2={props.hero2} />
          </View>
          <View style={{height: 100, width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center', top: 90}}>
          {props.day === 0 ? null : <Text style={{fontSize: 22, color: '#041D5D', fontWeight: '800', textAlign:'center'}}>You're on Day {props.day} out of the KickStart30</Text>}
          {/* <ProgressRing 
          value={props.daysTotal}
          radius={tileSize / 2 - 25}
          progressColor={'#041D5D'}
          /> */}
          </View>
          <Image
            source={wild5title}
            style={{
              width: "80%",
              marginTop: "25%",
              resizeMode: "contain",
              marginBottom: "2%",
              alignSelf: "center"
            }}
          />
      </SafeAreaView>
      <Navbar homedisable />
    </View>
    )
}