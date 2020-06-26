import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment';
import {format} from 'date-fns';
import {spliceString} from '../utils/dateSplice';
import {scopeRefByUserHero} from '../utils/heroRef';
import LandingView from '../components/common/LandingView';
import {withAuthProvider} from '../context/authcontext';

function Landing(props) {
  const [hero, setHero] = useState(false);
  const [hero2, setHero2] = useState(false);
  const [initialSurveydate, setInitialSurveyDate] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('rerendered');

  useEffect(() => {
    console.log("propsLANDING". props)
  }, []);
  
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      checkHeroData();
      console.log("navigationLISTENER")
    });

    return unsubscribe;
  }, [props.navigation]);

  const day = () => {
    const date = format(new Date(), 'YYYY-MM-DD');
    const sliceInitialDate = initialSurveydate.slice(0, -6);
    const todaysDate = moment().startOf('day');
    const initialDate = moment(sliceInitialDate);
    const returnedDays = todaysDate.diff(initialDate, 'days');
    // console.log(returnedDays)
    return returnedDays + 1;
  };

  useEffect(() => {
    const date = format(new Date(), 'YYYY-MM-DD-HH-mm');
    const user = firebase.auth().currentUser;
    console.log("checkHEROReRendering?",user);
    const [scopedUser] = user.email.split('.') || undefined;

    setLoading(true);

    firebase
      .database()
      .ref(`HERO/${scopedUser}`)
      .once('value', snap => {
        if (snap.val() !== null && initialSurveydate !== '') {
          const data = Object.keys(snap.val()).sort();
          const dateDiff = spliceString(initialSurveydate, date);
          // console.log("length",data.length)
          // console.log("dataDIFF",dateDiff);
          if (dateDiff === true) {
            setLoading(false);
            setHero2(true);
            return;
          } else {
            if (
              ([31].includes(dateDiff) &&
                [1,].includes(data.length))
            ) {
              setLoading(false);
              setHero2(true);
            } else {
              setHero2(false);
              setLoading(false);
            }
          }
        } else {
          setLoading(false);
        }
      });
  }, [initialSurveydate]);

  const checkHeroData = () => {
    console.log("runningCHECKHERO")
    const heroRef = scopeRefByUserHero('HERO');
    firebase
      .database()
      .ref(heroRef)
      .once('value', snapshot => {
        if (snapshot.val() !== null) {
          console.log("intiailValue",snapshot.val())
          setInitialSurveyDate(snapshot.val());
          setHero(true);
        }else{
          console.log("ELSE", snapshot.val())
          setInitialSurveyDate('')
          setHero(false)
          
        }
      });
  };


  return !loading ? (
    <LandingView hero={hero} hero2={hero2} day={day()} />
  ) : (
    <LoadingIndicator />
  );
}

export default withAuthProvider(Landing);

function LoadingIndicator() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="small" color="#041D5D" />
    </View>
  );
}
