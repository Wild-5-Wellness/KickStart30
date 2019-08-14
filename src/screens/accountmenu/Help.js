import React from "react";
import { View } from "react-native";
import { Accordion } from 'native-base'
import Navbar from "../../components/Navbar";
import { aboutData }from '../../components/common/aboutData'

const Help = () => {
  return (
    <View
      style={{height: "100%", display: 'flex', marginTop: "10%"}}
    >
      <Accordion dataArray={aboutData} expanded={4} headerStyle={{ backgroundColor: "#fff" }}
            contentStyle={{ backgroundColor: "#fff", color: "#000" }}/>
      <View style={{justifyContent: 'flex-end'}}>
        <Navbar faqdisable/>
      </View>
    </View>
  );
};

export default Help;
