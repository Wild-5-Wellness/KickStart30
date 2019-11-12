import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'


const CustomRadioBtn = props => {
    console.log(props)
return (
    <View style={{width: '50%',alignSelf:'center', marginTop:'5%', marginBottom:'5%' }}>
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <View style={{height: '100%',width:'50%',flexDirection:'row', justifyContent:'space-between', justifyContent:'center'}}>
                <TouchableOpacity
                onPress={()=> props.onPress2()}
                >
                <View style={{
                  height: 25,
                  width: 25,
                  borderColor: '#041D5D',
                  borderWidth: 3,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                >{props.value === '0' ?
                  <View 
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 12,
                    backgroundColor: '#041D5D'
                  }}
                  />
                  : null
                }
                </View>
                </TouchableOpacity>
                <Text style={{alignSelf:'center', marginLeft: 3}}>No</Text>
                </View>
                <View style={{height: '100%',width:'50%',flexDirection:'row', justifyContent:'space-between', justifyContent:'center'}}>
                <TouchableOpacity
                onPress={()=> props.onPress()}
                >
                <View style={{
                  height: 25,
                  width: 25,
                  borderColor: '#041D5D',
                  borderWidth: 3,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                >{props.value === '1' ?
                  <View 
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 12,
                    backgroundColor: '#041D5D'
                  }}
                  />
                  : null
                }
                </View>
                </TouchableOpacity>
                <Text style={{alignSelf:'center', marginLeft: 3}}>Yes</Text>
                </View>
              </View>
              </View>
)
}

export default CustomRadioBtn;