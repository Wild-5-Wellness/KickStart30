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
    checkHeroData();
  }, []);

  useEffect(() => {
    console.log('got a mount');
    return () => console.log('got an unmount');
  }, []);

  const day = () => {
    const date = format(new Date(), 'YYYY-MM-DD');
    // const year = Number(date.slice(0,4))
    //   const month = Number(date.slice(5,7))
    //   const day = Number(date.slice(8,10))
    // const year2 = Number(initialSurveydate.slice(0,4))
    // const month2 = Number(initialSurveydate.slice(5,7))
    // const day2 = Number(initialSurveydate.slice(8,10))
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
    // console.log(user);
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

  checkHeroData = () => {
    const heroRef = scopeRefByUserHero('HERO');
    firebase
      .database()
      .ref(heroRef)
      .once('value', snapshot => {
        if (snapshot.val() !== null) {
          setInitialSurveyDate(snapshot.val());
          setHero(true);
        }
      });
  };

  onNotif = notif => {
    // console.log(notif);
    Alert.alert(notif.title, notif.message);
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
