import React from 'react';
import {ActivityIndicator, View} from 'react-native';


const Loading  = () => {

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="small" color="#041D5D" />
    </View>
    )
}

export default Loading;