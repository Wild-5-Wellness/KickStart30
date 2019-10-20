import React from 'react';
import {View, Alert} from 'react-native';
import {Text, Content, Container, Picker, Icon} from 'native-base';
import firebase from 'react-native-firebase';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import sleepTrackingImage from '../../images/sleeptracking.jpg';
import {TrackingScreen} from './TrackingScreen';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import {sleepColor} from '../../components/common/colors'

const SleepTracking = () => {
  const [
    didImplementSleepPractices,
    setDidImplementSleepPractices,
  ] = React.useState();

  const [sleepHygiene, setSleepHygiene] = React.useState("")
  const [error, setError] = React.useState("")

  // const [noElectronics, setNoElectronics] = React.useState(false);
  // const [sleepMask, setSleepMask] = React.useState(false);
  // const [regularTime, setRegularTime] = React.useState(false);
  // const [noNapping, setNoNapping] = React.useState(false);
  // const [warmBath, setWarmBath] = React.useState(false);
  // const [noCaffeine, setNoCaffeine] = React.useState(false);

  // const [
  //   toggleNoElectronics,
  //   toggleSleepMask,
  //   toggleRegularTime,
  //   toggleNoNapping,
  //   toggleWarmBath,
  //   toggleNoCaffeine,
  // ] = [
  //   [noElectronics, setNoElectronics],
  //   [sleepMask, setSleepMask],
  //   [regularTime, setRegularTime],
  //   [noNapping, setNoNapping],
  //   [warmBath, setWarmBath],
  //   [noCaffeine, setNoCaffeine],
  // ].map(([value, updater]) => () => updater(!value));



  const submitForm = React.useCallback(async () => {
    const sleepRef = scopeRefByUserAndDate('Surveys', 'sleep');
    if(didImplementSleepPractices === undefined){
      setError("Please Select an Option")
    }else {
    await firebase
      .database()
      .ref(sleepRef)
      .update({
        didImplementSleepPractices
       
      });

    Alert.alert('Success!', 'Your sleep for today has been recorded.', [
      {text: 'OK', onPress: Actions.landing()},
    ]);
  }
  }, [
    didImplementSleepPractices
  ]);

  return (
    <Container>
      <TrackingScreen
        backgroundImage={sleepTrackingImage}
        color={sleepColor}
        activityTitle="Sleep"
        onSave={submitForm}
      >
        <View
          style={{
            backgroundColor: sleepColor,
            width: '85%',
            alignSelf: 'center',
            height: 90,
            marginTop: 10
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              alignSelf: 'center',
              fontWeight: '700',
            }}
          >
            Practices
          </Text>
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            Implement 4 or more of the 6 sleep hygiene practices each day for 30
            days
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              marginBottom: '5%',
              fontSize: 20,
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            Did I Implement 4 or More of the 6 Sleep Hygiene Practices?
          </Text>
          <RadioForm
            radio_props={[
              {label: 'Yes', value: true},
              {label: 'No', value: false},
            ]}
            initial={false}
            formHorizontal={false}
            labelHorizontal={true}
            buttonColor={sleepColor}
            selectedButtonColor={sleepColor}
            labelStyle={{fontSize: 20, color: '#000'}}
            animation={true}
            onPress={value =>{ 
              setError("")
              setDidImplementSleepPractices(value)}}
          />
          <Text style={{color:'red'}}>{error}</Text>
        </View>
        <Content>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            Which sleep hygiene practices did you implement today?
          </Text>
          <Picker
                selectedValue={sleepHygiene}
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setSleepHygiene(itemValue)
                }
                mode="dropdown"
                placeholder="Sleep Hygiene Practice"
                placeholderStyle={{color: '#000'}}
                placeholderIconColor="#000"
                iosIcon={
                  <Icon
                    name="ios-arrow-dropdown"
                    style={{color: '#000', fontSize: 25}}
                  />
                }
                >
                <Picker.Item label="No Electronics 90 minutes before bed" value="No Electronics 90 minutes before bed" />
                <Picker.Item label="Sleep mask or blackout shades" value="Sleep mask or blackout shades" />
                <Picker.Item label="Regular bedtime" value="Regular bedtime" />
                <Picker.Item label="No Napping" value="No Napping" />
                <Picker.Item label="Warm bath/shower prior to bed" value="Warm bath/shower prior to bed" />
                <Picker.Item label="Avoid caffeine 10 hours before bed" value="Avoid caffeine 10 hours before bed" />
              </Picker>
        </Content>
      </TrackingScreen>
    </Container>
  );
};
export default SleepTracking;
