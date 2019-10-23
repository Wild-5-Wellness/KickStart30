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
        <View style={{ flex: 1, backgroundColor:'#fff' }}>
      <SafeAreaView style={{ flex: 1 }}>
     {!props.hero && !props.hero2? 
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
            <Navigation hero={props.hero} hero2={props.hero2} />
          </View>
          {props.hero ?<View style={{height: 100, width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center', top:height < 666 && width < 374 ? '10%' : '10%'}}>
           <Text style={{fontSize:height < 666 && width < 374 ? 15 : 20, color: '#041D5D', fontWeight: '800', textAlign:'center'}}>Day {props.day} of the KickStart30</Text>
          </View>  : null}
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
             {props.hero ? <View style={{height: 100, width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center', top:height < 666 && width < 374 ? '32%' : '25%'}}>
              <Text style={{fontSize:height < 666 && width < 374 ? 15 : 20, color: '#041D5D', fontWeight: '800', textAlign:'center'}}>Day {props.day} of the KickStart30</Text>
             </View>  : null}
             <Image
               source={wild5title}
               style={{
                 width: "80%",
                 marginTop: "20%",
                 resizeMode: "contain",
                 marginBottom: "2%",
                 alignSelf: "center"
               }}
             />
              </>
          }
      <Navbar homedisable />
      </SafeAreaView>
    </View>
    )
}