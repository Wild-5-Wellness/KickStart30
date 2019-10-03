import React, {useEffect, useState} from 'react'
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import {withAuthProvider}from '../../context/authcontext'
import { View, Text } from 'react-native'
import firebase from 'react-native-firebase'

//https://github.com/JesperLekland/react-native-svg-charts

const LinesChart = (props) => {

    const [heroData, setHeroData] = useState([])
    const [heroDataTotal, setHeroDataTotal] = useState(0)

useEffect(()=> {
    props.getHeroData()
    },[])

useEffect(()=>{
    const user = firebase.auth().currentUser;
    const [scopedUser] = user.email.split(".") || undefined;
    let mappedHero;
    props.heroData !== undefined ? mappedHero = Object.values(props.heroData)
    .reduce((acc,{optimismValue, resilienceValue, enthusiasmValue, happyValue, mentalWellValue}) => {
        acc.push(Number(optimismValue), Number(resilienceValue),Number(enthusiasmValue), Number(happyValue), Number(mentalWellValue))
        return setHeroData([...heroData,acc]);
    }, [])  
    : props.heroData
}, [props.heroData])

useEffect(()=> {
    console.log(...heroData)
    console.log(heroData.map(num => typeof num))
    console.log(heroData.map(num => console.log(typeof num)))
const totalScore = heroData.reduce((tot, val)=> {
tot + val;
return tot;
    
},0)
setHeroDataTotal(totalScore)
},[heroData])
  

        const contentInset = { top: 20, bottom: 20 }

        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
            <Text>chart</Text>
                {/* <YAxis
                    data={ null }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    // formatLabel={ value => `${value}` }
                /> */}
                {/* <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={ null }
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={ contentInset }
                >
                    <Grid/>
                </LineChart> */}
            </View>
        )
    }

export default withAuthProvider(LinesChart);