import React, { useEffect, useState } from "react";
import { LineChart, YAxis, XAxis, Grid } from "react-native-svg-charts";
import { withAuthProvider } from "../../context/authcontext";
import { View, Text } from "react-native";
import firebase from "react-native-firebase";

//https://github.com/JesperLekland/react-native-svg-charts

const LinesChart = props => {
  const [heroData, setHeroData] = useState([]);
  const [heroDates, setHeroDates] =useState()
  const [heroDataTotal, setHeroDataTotal] = useState(0);

  useEffect(() => {
    props.getHeroData();
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const [scopedUser] = user.email.split(".") || undefined;

    if (props.heroData) {
      const totals = Object.keys(props.heroData).reduce(
        (totalsByDate, date) => {
          return {
            ...totalsByDate,
            [date]: Object.values(props.heroData[date]).reduce(
              (total,
              number) => total + number,
              0
            )
          };
        },
        {}
      );
        const totalsArrDates = []
        for(num in totals){
          totalsArrDates.push(num)
        }
        console.log(typeof totalsArrDates)
        // setHeroData(totalsArr)
        setHeroDates([...totalsArrDates])
    }
  }, [props.heroData]);

useEffect(()=>{
    console.log(heroData)
},[heroData])

useEffect(()=>{
  debugger;
  console.log(typeof heroDates)
  console.log(heroDates)
}, [heroDates])

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={{ height: 200, flexDirection: "row" }}>
      <Text>chart</Text>
      <YAxis
                    data={ [9,8,3,4,5] }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
      <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={ [3,4,5,6,7,7] }
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={ contentInset }
                >
                    <Grid/>
                </LineChart>
    </View>
  );
};

export default withAuthProvider(LinesChart);
