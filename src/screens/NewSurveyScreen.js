import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Keyboard,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {CheckBox} from 'react-native-elements';
import {Slider} from 'react-native-elements';
import {getScopedUser} from '../utils/firebase';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import CustomRadioBtn from '../components/common/CustomRadioBtn'

const radio_props = [{label: 'Yes', value: '1'}, {label: 'No', value: '0'}];

const NewSurveyScreen = () => {
  const [question2, setQuestion2] = useState(null);
  const [question4, setQuestion4] = useState(null);
  const [state, setState] = useState({
    question1: '',
    question3: '',
    question5: '',
    question5Text: '',
    question6: '',
    question6Text: '',
    question7: '',
    question8: '',
    question8Text: '',
  });

  const handleSubmit = () => {
    console.log(state);
    let data = {
      question1: state.question1,
      question2: String(question2),
      question3: state.question3,
      question4: String(question4),
      question5: state.question5,
      question5Text: state.question5Text,
      question6: state.question6,
      question6Text: state.question6Text,
      question7: state.question7,
      question8: state.question8,
      question8Text: state.question8Text,
    };
    return firebase
      .database()
      .ref(`FeedbackSurvey/${getScopedUser()}`)
      .set(data)
      .then(() => {
        setState({})
        Alert.alert(
          'Success!',
          'Your exercises for today have been recorded.',
          [{text: 'OK', onPress: Actions.landing()}],
        )
      }
      );
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
              borderColor: 'black',
              borderWidth: 1,
              alignSelf: 'center',
            }}>
            <View style={{marginTop: 10, marginBottom: 10}}>
              <Text style={styles.questionText}>
                Are you currently actively following the KickStart30 using the
                workbook?
              </Text>
              <CustomRadioBtn value={state.question1} onPress={()=> setState({...state,question1: '1'})} onPress2={()=> setState({...state,question1: '0'})}/>
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
              <CustomRadioBtn value={state.question3} onPress={()=> setState({...state,question3: '1'})} onPress2={()=> setState({...state,question3: '0'})}/>
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                On a scale of 1-10 (1 not at all helpful, 10 very help), was the
                app helpful in tracking your daily wellness-enhancing
                activities?
              </Text>
              <Text
                style={{alignSelf: 'center', color: '#041D5D', fontSize: 20}}>
                {question4}
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
              <CustomRadioBtn value={state.question5} onPress={()=> setState({...state,question5: '1'})} onPress2={()=> setState({...state,question5: '0'})}/>
              {state.question5 === "0" ?
              <TextInput
                style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                placeholder="Tell us why..."
                value={state.question5Text}
                onChangeText={value => setState({...state,question5Text: value})}
                onSubmitEditing={Keyboard.dismiss}
              />
              :null}
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                Did the app improve your experience of doing the KickStart30
                practices?
              </Text>
              <CustomRadioBtn value={state.question6} onPress={()=> setState({...state,question6: '1'})} onPress2={()=> setState({...state,question6: '0'})}/>
              <View>
                <TextInput
                  style={{
                    textAlignVertical: 'top',
                    height: 200,
                    width: '90%',
                    borderWidth: 1,
                    borderColor: 'black',
                    fontSize: 22,
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Tell us why..."
                  value={state.question6Text}
                  onChangeText={value => setState({...state,question6Text: value})}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                The HERO Exercises are currently only available in the workbook.
                Would you prefer to have the HERO Excercises as part of the
                tracking app?
              </Text>
              <CustomRadioBtn value={state.question7} onPress={()=> setState({...state,question7: '1'})} onPress2={()=> setState({...state,question7: '0'})}/>
            </View>
            <View style={styles.questionView}>
              <Text style={styles.questionText}>
                What would you like to see anything added to the app?
              </Text>
              <CustomRadioBtn value={state.question8} onPress={()=> setState({...state,question8: '1'})} onPress2={()=> setState({...state,question8: '0'})}/>
              {state.question8 === '1' ? (
                <View>
                  <TextInput
                    style={{
                      textAlignVertical: 'top',
                      height: 200,
                      width: '90%',
                      borderWidth: 1,
                      borderColor: 'black',
                      fontSize: 22,
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Tell us..."
                    value={state.question8Text}
                    onChangeText={value => setState({...state, question8Text: value})}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
              ) : null}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => handleSubmit()}>
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
    borderColor: 'black',
    borderWidth: 1
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
  textInput: {
    textAlignVertical: 'top',
    height: 200,
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default NewSurveyScreen;
