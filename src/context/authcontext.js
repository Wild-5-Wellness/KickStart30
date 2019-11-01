import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import {getScopedUser} from '../utils/firebase';
import {setState} from 'expect/build/jestMatchersObject';
import moment from 'moment';
const {Consumer, Provider} = React.createContext();

export default class AuthProvider extends Component {
  state = {
    user: '',
    ready: false,
    authenticated: null,
    isConnected: false,
    daysSinceSignUp: '',
    isSurveyComplete: false,
    loading: false
  };

  unsubscribe;

   componentDidMount() {
    this.unsubscribe =  firebase.auth().onAuthStateChanged(user => {
      Actions.reset('loading')
      if (user) {
      this.dateDifference().then(()=> {
          if (
            this.state.daysSinceSignUp >= 10 &&
            this.state.isSurveyComplete === false
          ) {
            console.log(Actions.currentScene)
            Actions.reset('newsurveyscreen');
          } else if(Actions.currentScene !== 'landing') {
            Actions.reset('landing');
          }
        
      })
      } else {
        console.log(user,"user is not")
        this.setState({loading: false})
        Actions.reset('newlogin');
      }
    
    });
  
    // NetInfo.fetch().then(state => {
    //   this.setState({isConnected: true})
    // })
  }

  componentWillUnmount() {
    // console.log("unmounting")
    this.unsubscribe();
  }

  setHeroCompleted = () => {
    this.setState({
      heroCompleted: true,
    });
  };

  dateDifference =  async () => {
    const checkDate = await
      firebase
      .database()
      .ref(`UserInfo/${getScopedUser()}`)
      .once('value', snap => {
        if (snap.val() !== null) {
          let date = snap.val().date;
          const todaysDate = moment().startOf('day');
          const initialDate = moment(date);
          const returnedDays = todaysDate.diff(initialDate, 'days');
          console.log('inital/todays', todaysDate, initialDate);
          console.log('number of days since signup', returnedDays);
          this.setState({daysSinceSignUp: returnedDays});
        }
      })

      const checkSurveyComplete = await 
      firebase
      .database()
      .ref(`FeedbackSurvey/${getScopedUser()}`)
      .once('value', snap => {
        if (snap.val() !== null) {
          this.setState({isSurveyComplete: true});
        } else {
          this.setState({isSurveyComplete: false});
        }
      })
    
      return Promise.all([checkDate, checkSurveyComplete]);
  
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

  // getUser = () => {
  //   var user = firebase.auth().currentUser;
  //   if (user) {
  //     var res = user.email.split('.');
  //     var userEm = res[0].toString();
  //     this.setState({
  //       user: userEm,
  //     });
  //   } else {
  //     console.log('noperz');
  //   }
  //   var today = new Date();
  //   var date =
  //     today.getFullYear() +
  //     '-' +
  //     (today.getMonth() + 1) +
  //     '-' +
  //     today.getDate();
  //   var dateTime = date;
  //   this.setState({
  //     date: dateTime,
  //   });
  // };

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
