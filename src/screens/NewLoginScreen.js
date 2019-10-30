import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { withAuthProvider } from "../context/authcontext";
import {Actions} from 'react-native-router-flux';
import KS30 from "../images/KS30_login.png";
import Register from './RegisterPage'
import LoginModal from '../components/LoginModal'

const {height, width} = Dimensions.get('window')

const NewLoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [raised, setRaised] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState("")

  showModal = (view) => {
    setViewModal(view)
    setModal(true)
    
  }

  return (
    
      <View style={{ flex: 1 }}>
      <SafeAreaView style={{flex: 1}}>
      
      <Modal
      transparent={true}
      visible={modal}
      onRequestClose={()=> setModal(false)}
      >
      
      { viewModal === "Register" ?
      
        <Register closeModal={() => setModal(false)} />
         :
        viewModal === "Login" ?
        <LoginModal closeModal={()=>setModal(false)}/> : null
      }
      </Modal>
      
        <View style={{flex: 2, alignSelf: "center", marginTop: "5%" }}>
          <Image source={KS30} style={{alignSelf:'center', marginBottom:'5%' }} />
            <Image
              style={{ flex: .9, height: undefined, width: undefined }}
              source={require("../images/water_rocks.jpg")}
              resizeMode="contain"
            />
        </View>
        <View style={{flex: .3, backgroundColor: "#52669c", alignSelf:'center', justifyContent:'center'}}>
          <Text style={{alignSelf:'center', fontSize:20, color: '#fff', paddingRight:5, paddingLeft: 5}}>Let's Get Started</Text>
          </View>
          <View style={{flex: 1,flexDirection: 'row', display: 'flex', justifyContent: 'space-around', alignItems:'center'}}>
            <TouchableOpacity style={styles.buttons} onPress={()=>showModal("Register")}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.imageView}>
            <Image source={require("../images/wild5star.png")}
            style={{ flex: 1, height: undefined, width: undefined }}
            />
            </View>
            <TouchableOpacity style={styles.buttons} onPress={()=>showModal("Login")}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          </SafeAreaView>
      </View>
    
  );
};

export default withAuthProvider(NewLoginScreen);

const styles = StyleSheet.create({
  buttons: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonText: {
    letterSpacing: 1,
    fontWeight: '900',
    color: '#52669c', 
    fontSize:  18
  },
  imageView:{
    height: 60,
    width: 60,
  }
})