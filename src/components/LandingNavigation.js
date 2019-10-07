import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import chunk from "lodash/chunk";
import { withAuthProvider } from "../context/authcontext";
import HEROlogo from "../images/herologo.png";

const { width } = Dimensions.get("window");

const navigationItems = [
  {
    title: "Track Exercise",
    icon: "bicycle",
    action: () => Actions.exercisetracking(),
    background: ["#a8eb12", "#79c141"]
  },
  {
    title: "Track Mindfulness",
    icon: "headset",
    action: () => Actions.mindfulnesstracking(),
    background: ["#00cbea", "#3fb5eb"]
  },
  {
    title: "Track Sleep",
    icon: "moon",
    action: () => Actions.sleeptracking(),
    background: ["#e94c7e", "#b92e91"]
  },
  {
    title: "Track Social",
    icon: "contacts",
    action: () => Actions.socialtracking(),
    background: ["#db1b63", "#ee3422"]
  },
  {
    title: "Track Nutrition",
    icon: "restaurant",
    action: () => Actions.nutritiontracking(),
    background: ["#f66f63", "#f79a2e"]
  },
  {
    title: "HERO Exercises",
    icon: HEROlogo,
    action: () => Actions.herotracking(),
    background: ["#DD3121", "#0BA2D4", "#70B43C", "#B72B90"]
  }
];

export function Navigation(props) {
  const [bothTrue, setBothTrue] = useState(false);

  useEffect(() => {
    if (props.hero && props.hero2) {
      setBothTrue(true);
    }
  }, []);

  const renderItem = React.useCallback((item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        style={!props.hero ? styles.touchableHERO : styles.touchable}
        onPress={!props.hero ? null : item.action}
      >
        <LinearGradient
          style={styles.item}
          colors={ item.background}
        >
          {item.title === "HERO Exercises" ? (
            <Image
              source={item.icon}
              style={{ width: "100%", height: 65, resizeMode: "contain" }}
            />
          ) : (
            <Icon name={item.icon} style={styles.icon} />
          )}
          <Text style={styles.title}>{item.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      { !props.hero && !props.hero2 || props.hero && props.hero2 ?
      <>
      {!props.hero && !props.hero2 ?<Text style={styles.heroText}>Take The Hero Wellness Survey to START</Text> : <Text style={{alignSelf:'center', color: '#041D5D', fontWeight:'700', fontSize:20, marginBottom:10}}>Take The Hero Wellness Survey</Text>}
      <TouchableOpacity
      style={[styles.touchableHERO3]}
      onPress={() => Actions.herointro()}
    >
      <LinearGradient
        style={styles.itemHERO3}
        colors={["#041D5D", "#082774"]}
      >
          <Image
            source={HEROlogo}
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              resizeMode: "contain"
            }}
          />
          <Text style={styles.titleHERO3}>Survey</Text>
      </LinearGradient>
    </TouchableOpacity>
         {chunk(navigationItems, 2).map((items, index) => (
           <View key={index} style={styles.row}>
             {items.map(renderItem)}
           </View>
         ))}
         </>
         : 
         <>
         {chunk(navigationItems, 2).map((items, index) => (
          <View key={index} style={styles.row}>
            {items.map(renderItem)}
          </View>
        ))}
        </>
         }
    </View>
  );
}

export default withAuthProvider(Navigation);

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  touchable: {
    backgroundColor: "transparent",
    marginBottom: 10,
    width: (1 / 2) * width - 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  touchableHERO: {
    opacity: 0.50,
    backgroundColor: "transparent",
    marginBottom: 10,
    width: (1 / 2) * width - 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  item: {
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    height: 110
  },
  itemHERO: {
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    height: 250,
    width: 300
  },
  icon: { color: "white", fontSize: 60 },
  title: { color: "white", fontSize: 18 },
  titleHERO: { color: "white", fontSize: 28, textAlign: "center" },
  titleHEROMain: {
    color: "#041D5D",
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "15%"
  },
  itemHERO2: {
    justifyContent: "center"
  },
  itemHERO3: {
    alignSelf:'center',
    borderRadius: 5,
    paddingBottom: 10,
    height: 100,
    width: "80%",
  },
  titleHERO3: { color: "white", fontSize: 22, textAlign: "center", fontWeight:'700' },
  touchableHERO3:{
    alignSelf:'center',
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 10,
    width: width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  heroText: {
    alignSelf:'center', 
    color: '#041D5D', 
    fontWeight:'700', 
    fontSize:20, 
    marginBottom:10, 
    textAlign:'center'
  }
});
