import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {Slider} from 'react-native-elements';
import {getScopedUser} from '../utils/firebase';
import firebase from 'react-native-firebase'

const NewSurveyScreen = () => {
  const radio_props = [{label: 'Yes', value: "1"}, {label: 'No', value: "0"}];
  const [question2, setQuestion2] = useState(null);
  const [question4, setQuestion4] = useState(0);
  const [state, setState] = useState({
    question1: '',
    question3: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
  });

  const handleSubmit = () => {
      let data = {
    question1: state.question1,
    question2: question2.toString(),
    question3: state.question3,
    question4: question4.toString(),
    question5: state.question5,
    question6: state.question6,
    question7: state.question7,
    question8: state.question8,
      }
    return (
    firebase.database().ref(`FeedbackSurvey/${getScopedUser()}`).set(data).then(()=> 
    Alert.alert("Success!", "Your exercises for today have been recorded.", [
        {text: "OK", onPress: Actions.landing()},
      ])
    )
    )
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              height: 75,
              width: '100%',
              backgroundColor: '#041D5D',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, color: '#fff', alignSelf: 'center'}}>
              Please Give Us Some Feedback
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              borderColor: 'black',
              borderWidth: 1,
              alignSelf: 'center',
            }}>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Text style={styles.questionText}>
                Are you currently actively following the KickStart30 using the
                workbook?
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={false}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#041D5D'}
                selectedButtonColor={'#041D5D'}
                labelStyle={{fontSize: 14, color: '#000', marginRight: 10}}
                animation={true}
                onPress={value => {
                  setState({...state,question1: value});
                }}
                style={styles.radiobutton}
              />
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                On a Scale of 1-10 (1 not motivated, 10 highly motivated),
                please rate how motivated you are to participate in the
                KickStart30
              </Text>
              <Text
                style={{alignSelf: 'center', color: '#041D5D', fontSize: 20}}>
                {question2}
              </Text>
              <Slider
                thumbTintColor="#041D5D"
                value={question2}
                step={1}
                minimumValue={0}
                maximumValue={10}
                onValueChange={value => setQuestion2(value)}
              />
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                Did having the app on your phone serve as a useful reminder to
                continue your KickStart30 practices?
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={false}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#041D5D'}
                selectedButtonColor={'#041D5D'}
                labelStyle={{fontSize: 14, color: '#000', marginRight: 10}}
                animation={true}
                onPress={value => {
                  setState({...state,question3: value});
                }}
                style={styles.radiobutton}
              />
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                On a scale of 1-10 (1 not at all helpful, 10 very help), was the
                app helpful in tracking your daily wellness-enhancing
                activities?
              </Text>
              <Slider
                thumbTintColor="#041D5D"
                value={question4}
                step={1}
                minimumValue={0}
                maximumValue={10}
                onValueChange={value => setQuestion4(value)}
              />
            </View>
            <View>
              <Text style={styles.questionText}>
                Did the app work as you expected?
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={false}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#041D5D'}
                selectedButtonColor={'#041D5D'}
                labelStyle={{fontSize: 14, color: '#000', marginRight: 10}}
                animation={true}
                onPress={value => {
                  setState({...state,question5: value});
                }}
                style={styles.radiobutton}
              />
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                Did the app improve your experience of doing the KickStart30
                practices?
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={false}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#041D5D'}
                selectedButtonColor={'#041D5D'}
                labelStyle={{fontSize: 14, color: '#000', marginRight: 10}}
                animation={true}
                onPress={value => {
                  setState({...state,question6: value});
                }}
                style={styles.radiobutton}
              />
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                The HERO Exercises are currently only available in the workbook.
                Would you prefer to have the HERO Excercises as part of the
                tracking app?
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={false}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#041D5D'}
                selectedButtonColor={'#041D5D'}
                labelStyle={{fontSize: 14, color: '#000', marginRight: 10}}
                animation={true}
                onPress={value => {
                  setState({...state,question7: value});
                }}
                style={styles.radiobutton}
              />
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                What would you like to see anything added to the app?
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={false}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#041D5D'}
                selectedButtonColor={'#041D5D'}
                labelStyle={{fontSize: 14, color: '#000', marginRight: 10}}
                animation={true}
                onPress={value => {
                  setState({...state,question8: value});
                }}
                style={styles.radiobutton}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity 
            style={styles.submitBtn}
            onPress={()=> handleSubmit()}
            >
              <Text style={{fontSize: 24, color: '#fff', alignSelf: 'center'}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: 20,
    textAlign: 'center',
  },
  radiobutton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  questionView: {
    marginBottom: 10,
  },
  submitBtn: {
    height: 50,
    width: '90%',
    backgroundColor: '#041D5D',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default NewSurveyScreen;
