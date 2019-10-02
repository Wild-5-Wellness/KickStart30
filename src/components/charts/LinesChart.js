import React, {useEffect, useState} from 'react'
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import {withAuthProvider}from '../../context/authcontext'
import { View, Text } from 'react-native'

//https://github.com/JesperLekland/react-native-svg-charts

const LinesChart = (props) => {

    const [heroData, setHeroData] = useState([])

useEffect(()=> {
    props.getHeroData()
    },[])

useEffect(()=>{
console.log(props.heroData)
}, [props.heroData])
  
        // const data = props.data

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