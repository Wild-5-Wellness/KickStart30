import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Navbar from '../../components/Navbar'

const ToolsMenu = () => {

    return (

        <View style={{flex: 1, backgroundColor:'#fff'}}>
        <SafeAreaView style={{flex: 1, alignItems:'center'}}>
            <TouchableOpacity style={{height: 45, width: '85%', borderRadius: 10, justifyContent:'center', backgroundColor:'blue'}} onPress={()=>Actions.mindfulnessaudio()}>
                <Text style={{alignSelf:'center', color:'#fff'}}>Mindfulness Tracks</Text>
            </TouchableOpacity>
            <View style={{flex: 1,justifyContent: 'flex-end'}}>
            <Navbar />
            </View>
        </SafeAreaView>
        </View>
    )
}


export default ToolsMenu;