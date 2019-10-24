import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Navbar from '../../components/Navbar'

const ToolsMenu = () => {

    return (

        <View style={{flex: 1, backgroundColor:'#fff'}}>
        <SafeAreaView style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style={{height: 65, width: '85%', borderRadius: 10, justifyContent:'center', backgroundColor:'#0AB2E8'}} onPress={()=>Actions.mindfulnessaudio()}>
                <Text style={{alignSelf:'center', color:'#fff', fontSize:24}}>Mindfulness Tracks</Text>
            </TouchableOpacity>
            <View style={{flex: 1,justifyContent: 'flex-end'}}>
            <Navbar />
            </View>
        </SafeAreaView>
        </View>
    )
}


export default ToolsMenu;