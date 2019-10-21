import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux'

const ToolsMenu = () => {

    return (

        <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity style={{height: 45, width: '85%', borderRadius: 10, justifyContent:'center'}} onPress={()=>Actions.mindfulnessaudio()}>
                <Text style={{alignSelf:'center'}}>Mindfulness Tracks</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </View>
    )
}


export default ToolsMenu;