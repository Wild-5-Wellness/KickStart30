import React from "react";
import { View, Platform, SafeAreaView, Text } from "react-native";
import { Accordion, Icon } from 'native-base'
import { aboutData }from '../../components/common/aboutData'
import {RFValue} from 'react-native-responsive-fontsize'

const Help = () => {

  const _renderHeader = (item, expanded) => {
    return (
      <View style={{
        borderColor:'#fff',
        borderTopWidth: 1,
        height: 60,
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#041D5D" }}>
      <Text style={{ fontWeight: "600", color: '#fff' }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: RFValue(18), color:'#fff' }} name="remove-circle" />
          : <Icon style={{ fontSize: RFValue(18), color:'#fff' }} name="add-circle" />}
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flex: 1, backgroundColor:'#fff'}}>
    <SafeAreaView style={{flex:1}}>
      <Accordion dataArray={aboutData} expanded={3} renderHeader={_renderHeader}
            contentStyle={{ backgroundColor: "#fff", color: "#000", lineHeight: Platform.OS === 'ios' ? 23 : null, margin:0 }}/>
        </SafeAreaView>
    </View>
    </SafeAreaView>
  );
};

export default Help;