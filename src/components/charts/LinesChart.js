import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { withAuthProvider } from "../../context/authcontext";
import { View, Text, Dimensions } from "react-native";
import firebase from "react-native-firebase";

//https://github.com/JesperLekland/react-native-svg-charts

const LinesChart = props => {
  const [heroData, setHeroData] = useState([]);
  const [heroDates, setHeroDates] =useState([])
  const [heroDataTotal, setHeroDataTotal] = useState(0);

  useEffect(() => {
    props.getHeroData();
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const [scopedUser] = user.email.split(".") || undefined;
    console.log(props.heroData)
    if (props.heroData) {
      const sortedDates = Object.keys(props.heroData).sort()
      const totals = sortedDates.reduce(
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
  
        console.log(totals)
        console.log(totalsArrDates)
        setHeroData(Object.values(totals))
        setHeroDates([...totalsArrDates])
        // debugger;
    }
  }, [props.heroData]);

useEffect(()=>{
    console.log(heroData)
},[heroData])

useEffect(()=>{
  console.log(typeof heroDates)
  console.log(heroDates)
  console.log(heroDates.length)
}, [heroDates])

  return (
    heroDates.length !== 0 && heroData.length !== 0 ?
     <>
      <View style={{alignSelf:'center'}}><Text style={{fontSize: 20, color: '#041D5D'}}>Hero Survey Scores</Text></View>
    <View style={{flex: 1, height: 200, alignItems:'center' }}>
      
                      <LineChart
                      // yAxisLabel={[10,20,30,40,50]}
                      data={{
                        labels: heroDates.sort(),
                        datasets: [{
                          data: heroData
                        }]
                      }}
                      width={Dimensions.get('window').width - 20} // from react-native
                      height={220}
                      chartConfig={{
                        backgroundColor: '#113FB5',
                        backgroundGradientFrom: '#041D5D',
                        backgroundGradientTo: '#1A4CCE',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16
                        }
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                        borderRadius: 16
                      }}
                    /> 
               
    </View>
    </>
    : null
  );
};

export default withAuthProvider(LinesChart);
