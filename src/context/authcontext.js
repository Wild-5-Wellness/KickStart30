import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'react-native-firebase';
import {getScopedUser} from '../utils/firebase';
import moment from 'moment';

const {Consumer, Provider} = React.createContext();

export default class AuthProvider extends Component {
  constructor(props){
    super()
    this.state = {
      user: '',
      ready: false,
      authenticated: null,
      isConnected: false,
      daysSinceSignUp: '',
      isSurveyComplete: false,
      loading: false
    };
  }

  componentDidMount(){
    console.log("AUTHcontextprops",this.props)

  }


  setHeroCompleted = () => {
    this.setState({
      heroCompleted: true,
    });
  };

  

  LoadingIndicator = () => {
    console.log("loading is running 87")
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="small" color="#041D5D" />
      </View>
    );
  }

  isSurveyComplete = () => {
    firebase
      .database()
      .ref(`FeedbackSurvey/${getScopedUser()}`)
      .once('value', snap => {
        if (snap.val() !== null) {
          this.setState({isSurveyComplete: true});
        } else {
          this.setState({isSurveyComplete: false});
        }
      });
  };

  getTrackingData = () => {
    const ref = scopeRefByUserAndDate('Surveys');

    firebase
      .database()
      .ref(ref)
      .on('value', this.gotData, this.errData);
  };

  getPrincipleData = () => {
    firebase
      .database()
      .ref(`Surveys/${getScopedUser()}`)
      .on('value', this.gotPrincData, this.errData);
  };

  getHeroData = () => {
    var database = firebase.database();
    var ref = database.ref(`HERO/${getScopedUser()}`);
    ref.on('value', this.gotHeroData, this.errData);
  };

  gotData = data => {
    newData = data.val();
    this.setState(
      {
        ran: true,
        trackdata: newData || {},
      },
      () => {
        this.setState({
          ready: true,
        });
      },
    );
  };

  gotPrincData = data => {
    newData = data.val();
    this.setState(
      {
        princData: newData || {},
      },
      () => {
        this.setState({
          ready1: true,
        });
      },
    );
  };

  gotHeroData = data => {
    newData = data.val();
    this.setState(
      {
        heroData: newData || {},
      },
      () => {
        this.setState({
          ready2: true,
        });
      },
    );
    // console.log(this.state.heroData);
  };

  errData = err => {
    console.log(err);
  };

  render() {
    return (
      <Provider
        value={{
          getUser: this.getUser,
          getTrackingData: this.getTrackingData,
          getPrincipleData: this.getPrincipleData,
          getHeroData: this.getHeroData,
          ...this.state,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}
export function withAuthProvider(C) {
  return props => <Consumer>{value => <C {...value} {...props} />}</Consumer>;
}
