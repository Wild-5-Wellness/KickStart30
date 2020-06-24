import React, {useEffect} from 'react'
import {Dimensions} from 'react-native'
import Navigation from "../LandingNavigation"

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