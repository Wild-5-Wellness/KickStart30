import React, { Component } from "react";
import { ScrollView, View, Dimensions, ImageBackground, SafeAreaView } from "react-native";
import {
  Input,
  Form,
  Item,
  Label,
  Text,
  ListItem,
  CheckBox,
  Body
} from "native-base";
import { ModButton } from "../../components/common";
import firebase from "firebase";
import RadioForm from "react-native-simple-radio-button";
import { Actions } from "react-native-router-flux";
import nutritracking from "../../images/nutritracking.jpg";
import { BlurredBackgroundImage } from "../../components/common/BlurredBackgroundImage";

class NutritionTracking extends Component {
  state = {
    logged: false,
    MIND: false,
    breakmed: false,
    lunchmed: false,
    dinnermed: false,
    nutritionDaily: ""
  };
  checkBox = type => {
    if (type === "break") {
      this.setState({
        breakmed: !this.state.breakmed
      });
    } else if (type === "lunch") {
      this.setState({
        lunchmed: !this.state.lunchmed
      });
    } else if (type === "dinner") {
      this.setState({
        dinnermed: !this.state.dinnermed
      });
    }
  };

  submitForm() {
    // console.log(this.state);
    const {
      nutritionDaily,
      logged,
      MIND,
      breakmed,
      lunchmed,
      dinnermed,
      user,
      date
    } = this.state;
    firebase
      .database()
      .ref(`Surveys/${user}/${date}`)
      .update({
        nutritionDaily: nutritionDaily,
        nutrlogged: logged,
        nutrMIND: MIND,
        nutrbreakfast: breakmed,
        nutrlunch: lunchmed,
        nutrdinner: dinnermed
      });
    Actions.landing();
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user) {
      var res = user.email.split(".");
      var userEm = res[0].toString();
      this.setState({
        user: userEm
      });
    } else {
      console.log("noperz");
    }
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var dateTime = date;
    this.setState({
      date: dateTime
    });
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1}}>
        <View style={{ flex: 1 }}>
          <BlurredBackgroundImage
            style={{ paddingHorizontal: 10 }}
            source={nutritracking}
            blurRadius={20}
          >
            <ScrollView style={{ flex:1, padding: 30 }}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  marginTop: "-5%",
                  marginBottom: "10%",
                  fontWeight: "600"
                }}
              >
                Track your{" "}
                <Text
                  style={{ color: "orange", fontSize: 30, fontWeight: "600" }}
                >
                  Nutrition
                </Text>
              </Text>
              <View
                style={{
                  backgroundColor: "#E27027",
                  width: "85%",
                  alignSelf: "center",
                  height: 140
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    alignSelf: "center",
                    fontWeight: "700"
                  }}
                >
                  Program Expectations
                </Text>
                <Text
                  style={{ fontSize: 18, color: "white", textAlign: "center" }}
                >
                  Log your daily meals/snacks/beverages/alcohol each day for 30
                  days, follow the MIND diet principles as closely as you can
                </Text>
              </View>
              <View style={{alignItems:'center', marginTop: 10}}>
            <Text  style={{
                marginBottom: "5%",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "600"
              }}>Did I Log My Meals, Snacks, and Beverages, Including Alcohol Today?</Text>
            <RadioForm
              radio_props={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" }
              ]}
              initial={false}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"#f5bd68"}
              selectedButtonColor={"#f5bd68"}
              labelStyle={{fontSize: 20, color: '#000'}}
              animation={true}
              onPress={value => {
                this.setState({ nutritionDaily: value });
              }}
            />
          </View>
              <View style={{ alignSelf: "center", marginTop: 10, alignItems:'center' }}>
                <Text
                  style={{
                    marginBottom: "5%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "600"
                  }}
                >
                  Did you log your meals/snacks/beverages/alcohol?
                </Text>
                <RadioForm
                  radio_props={[
                    { label: "No", value: false },
                    { label: "Yes", value: true }
                  ]}
                  initial={false}
                  formHorizontal={false}
                  labelHorizontal={true}
                  buttonColor={"#f5bd68"}
                  selectedButtonColor={"#f5bd68"}
                  animation={true}
                  onPress={value => {
                    this.setState({ logged: value });
                  }}
                />
              </View>

              <View style={{ alignSelf: "center", marginTop: "10%", alignItems:'center' }}>
                <Text
                  style={{
                    marginBottom: "5%",
                    fontSize: 15,
                    textAlign: "center",
                    fontWeight: "600"
                  }}
                >
                  Did you implement MIND diet principles?
                </Text>
                <RadioForm
                  radio_props={[
                    { label: "No", value: false },
                    { label: "Yes", value: true }
                  ]}
                  initial={false}
                  formHorizontal={false}
                  labelHorizontal={true}
                  buttonColor={"#dd7435"}
                  selectedButtonColor={"#f5bd68"}
                  animation={true}
                  onPress={value => {
                    this.setState({ MIND: value });
                  }}
                />
              </View>

              <View style={{ marginTop: "10%" }}>
                <Text
                  style={{
                    marginBottom: "5%",
                    fontSize: 15,
                    textAlign: "center",
                    fontWeight: "600"
                  }}
                >
                  Did you practice Mind Meal Meditation?
                </Text>
                <ListItem onPress={() => this.checkBox("break")}>
                  <CheckBox
                    color="#f44336"
                    checked={this.state.breakmed}
                    onPress={() => this.checkBox("break")}
                  />
                  <Body>
                    <Text>Breakfast</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => this.checkBox("lunch")}>
                  <CheckBox
                    color="#f44336"
                    checked={this.state.lunchmed}
                    onPress={() => this.checkBox("lunch")}
                  />
                  <Body>
                    <Text>Lunch</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => this.checkBox("dinner")}>
                  <CheckBox
                    color="#f44336"
                    checked={this.state.dinnermed}
                    onPress={() => this.checkBox("dinner")}
                  />
                  <Body>
                    <Text>Dinner</Text>
                  </Body>
                </ListItem>
              </View>
              <View style={{}}>
                <ModButton
                  color={"black"}
                  onPress={() => this.submitForm()}
                  label="Submit"
                >
                  Submit
                </ModButton>
              </View>
            </ScrollView>
          </BlurredBackgroundImage>
        </View>
      </SafeAreaView>
    );
  }
}
export default NutritionTracking;
