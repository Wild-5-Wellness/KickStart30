import React from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";
import {Icon} from 'native-base'
import { Actions } from "react-native-router-flux";

const {width, height} = Dimensions.get('window')

const Navbar = (props) => {
 
const {homedisable,feedbackdisable,statsdisable,toolsdisabled,settingsdisable} = props
    return (
        <View style={{height: 50, width:'100%', flexDirection: 'row', backgroundColor:'#041D5D'}}>
                <TouchableOpacity disabled={homedisable} style={[styles.touchable, {backgroundColor: homedisable ? "#c7ccc4" : "#041D5D", borderRadius:homedisable ? 6 : null}]}
                onPress={()=> Actions.landing()}
                >
                <Icon name={"ios-home"} style={styles.icon}/>
                <Text style={styles.buttons} >Track</Text>
                </TouchableOpacity>
            <TouchableOpacity disabled={statsdisable} style={[styles.touchable, {backgroundColor: statsdisable ? "#c7ccc4" : "#041D5D", borderRadius:statsdisable ? 6 : null}]}
            onPress={() => Actions.statistics()}
            >
                <Icon name={"stats"} style={styles.icon}/>
                <Text style={styles.buttons}>Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={settingsdisable} style={[styles.touchable, {backgroundColor: settingsdisable ? "#c7ccc4" : "#041D5D", borderRadius:settingsdisable ? 6 : null}]}
            onPress={() => Actions.settings()}
            >
            <Icon name={"ios-settings"} style={styles.icon}/>
                <Text style={styles.buttons}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
  }


export default Navbar;

const styles = StyleSheet.create({
  icon:{
    color: "#fff",
    fontSize:  20
  },
  buttons: {
    color: "#fff",
    fontSize: 11 },
touchable:{
  flex: 1, justifyContent:'center', alignItems:'center'
}
})