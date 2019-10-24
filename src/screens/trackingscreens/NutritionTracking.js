import React from 'react';
import {ScrollView, View, SafeAreaView, Alert} from 'react-native';
import {Text, Picker, Icon} from 'native-base';
import firebase from 'react-native-firebase';
import RadioForm from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';
import nutriTrackingImage from '../../images/nutritracking.jpg';
import {TrackingScreen} from './TrackingScreen';
import {scopeRefByUserAndDate} from '../../utils/firebase';
import { nutritionColor } from '../../components/common/colors'

const NutritionTracking = () => {
  const [loggedNutritionToday, setLoggedNutritionToday] = React.useState();

  const [
    implementedMINDDietPrinciples,
    setImplementedMINDDietPrinciples,
  ] = React.useState(true);

  const [mealMeditation, setMealMeditation] = React.useState("");
  const [error, setError] = React.useState("")

  // const [lunchMeditation, setLunchMeditation] = React.useState(false);
  // const [dinnerMeditation, setDinnerMeditation] = React.useState(false);

  // const [
  //   toggleBreakfastMeditation,
  //   toggleLunchMeditation,
  //   toggleDinnerMeditation,
  // ] = [
  //   [breakfastMeditation, setBreakfastMeditation],
  //   [lunchMeditation, setLunchMeditation],
  //   [dinnerMeditation, setDinnerMeditation],
  // ].map(([value, updater]) => () => updater(!value));

  const submitForm = React.useCallback(async () => {
    const nutritionRef = scopeRefByUserAndDate('Surveys', 'nutrition');
    if(loggedNutritionToday === undefined){
      setError("Please Select an Option")
    }else {
    await firebase
      .database()
      .ref(nutritionRef)
      .update({
        loggedNutritionToday,
        implementedMINDDietPrinciples,
        mealMeditation
      });

    Alert.alert('Success!', 'Your nutrition for today has been recorded.', [
      {text: 'OK', onPress: Actions.landing()},
    ]);
  }
  }, [
    loggedNutritionToday,
    implementedMINDDietPrinciples,
    mealMeditation
  ]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1}}>
        <TrackingScreen
          backgroundImage={nutriTrackingImage}
          color={nutritionColor}
          activityTitle="Nutrition"
          onSave={submitForm}
        >
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                backgroundColor: nutritionColor,
                width: '100%',
                alignSelf: 'center',
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
                Log your daily meals/snacks/beverages/alcohol each day for 30
                days, follow the MIND diet principles as closely as you can
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text
                style={{
                  color: '#000',
                  marginBottom: '5%',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Did I Log My Meals, Snacks, and Beverages, Including Alcohol
                Today?
              </Text>
              <RadioForm
                radio_props={[
                  {label: 'Yes', value: true},
                  {label: 'No', value: false},
                ]}
                initial={false}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={nutritionColor}
                selectedButtonColor={nutritionColor}
                labelStyle={{fontSize: 20, color: '#000'}}
                animation={true}
                onPress={value =>{ 
                  setError("")
                  setLoggedNutritionToday(value)}}
              />
              <Text style={{color:'red'}}>{error}</Text>
            </View>
            <View>
              <Picker
                selectedValue={mealMeditation}
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setMealMeditation(itemValue)
                }
                mode="dropdown"
                placeholder="Nutrition"
                placeholderStyle={{color: '#000'}}
                placeholderIconColor="#000"
                iosIcon={
                  <Icon
                    name="ios-arrow-dropdown"
                    style={{color: '#000', fontSize: 25}}
                  />
                }
                >
                <Picker.Item label="Did I Implement MIND diet principles?" value="Did I Implement MIND diet principles?" />
                <Picker.Item label="Did I practice mindful meal meditation?" value="Did I practice mindful meal meditation?" />
              </Picker>
            </View>
          </ScrollView>
        </TrackingScreen>
      </View>
    </SafeAreaView>
  );
};
export default NutritionTracking;
