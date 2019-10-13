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
     
          
          
            <Navigation hero={props.hero} hero2={props.hero2} />
          : props.hero && props.hero2 ?
          
            <Navigation hero={props.hero} hero2={props.hero2} day={props.day}/>
       
           :
             <>
               <Navigation hero={props.hero} hero2={props.hero2} day={props.day}/>
            </>
    )
}