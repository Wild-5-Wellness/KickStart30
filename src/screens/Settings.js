import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TimePickerAndroid,
  Modal,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Linking
} from "react-native";
import { Icon } from "native-base";
import Navbar from "../components/Navbar";
import ToggleSwitch from "toggle-switch-react-native";
import PushNotificationIOS from "../components/common/PushNotificationsIOS";
import appConfig from "../../app.json";
import TimePicker from "../components/common/TimePicker";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";
import {
  exerciseColor,
  mindfulnessColor,
  nutritionColor,
  sleepColor,
  socialColor
} from "../components/common/colors";
import { scopeRefByUser } from "../utils/registration";
import { scopeRefByUserHero } from "../utils/heroRef";
import { format } from 'date-fns'
import {RFValue} from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get("window");

type Props = {};
class Settings extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentPillar: "",
      exerciseReminder: false,
      mindfulnessReminder: false,
      sleepReminder: false,
      socialReminder: false,
      nutritionReminder: false,
      showTimer: false,
      senderId: appConfig.senderID,
      chosenDate: new Date(),
      user: "",
      chosenAndroidTime: "00:00",
      modalVisible: false,
      loading: false,
      error: "",
      deleteCompleted: false,
      exerciseTime: "",
      mindfulnessTime: "",
      sleepTime: "",
      socialTime: "",
      nutritionTime: ""
    };
    this.PushNotificationIOS = new PushNotificationIOS(this.onNotif);
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
      console.log("set State for user failed sleepquest line 52");
    }
    this.getNotifStatus();
  }

  getNotifStatus = () => {
    firebase
      .database()
      .ref(`notifications/${this.state.user}/`)
      .once("value", snap => {
        if (snap.val() !== null) {
          let data = snap.val();
          this.setState({
            exerciseReminder:
              data[`${this.state.user}`].exercise !== undefined
                ? data[`${this.state.user}`].exercise.notifOn
                : false,
              exerciseTime: data[`${this.state.user}`].exercise !== undefined ?
              data[`${this.state.user}`].exercise.timeChosen : "",
            mindfulnessReminder:
              data[`${this.state.user}`].mind !== undefined
                ? data[`${this.state.user}`].mind.notifOn
                : false,
            mindfulnessTime: data[`${this.state.user}`].mind !== undefined ?
            data[`${this.state.user}`].mind.timeChosen : "",
            sleepReminder:
              data[`${this.state.user}`].sleep !== undefined
                ? data[`${this.state.user}`].sleep.notifOn
                : false,
            sleepTime: data[`${this.state.user}`].sleep !== undefined ?
            data[`${this.state.user}`].sleep.timeChosen : "",
            socialReminder:
              data[`${this.state.user}`].social !== undefined
                ? data[`${this.state.user}`].social.notifOn
                : false,
            socialTime: data[`${this.state.user}`].social !== undefined ?
            data[`${this.state.user}`].social.timeChosen : "",
            nutritionReminder:
              data[`${this.state.user}`].nutrition !== undefined
                ? data[`${this.state.user}`].nutrition.notifOn
                : false,
            nutritionTime: data[`${this.state.user}`].nutrition !== undefined ?
            data[`${this.state.user}`].nutrition.timeChosen : ""
          });
        }
      })
      .then()
      .catch();
  };

  androidTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false,
        mode: "default"
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const m = minute < 10 ? `0${minute}` : minute;
        const h = hour < 10 ? `0${hour}` : hour;
        console.log(`time: ${hour}:${minute}`);
        const date = new Date();
        this.setState({ chosenAndroidTime: `${h}:${m}` }, () =>
          this.submitTime(
            new Date(date.setHours(h, m)),
            this.state.currentPillar
          )
        );
      } else if (action === TimePickerAndroid.dismissedAction) {
        if (this.state.currentPillar === "exercise") {
          this.setState({ exerciseReminder: false });
        } else if (this.state.currentPillar === "mind") {
          this.setState({ mindfulnessReminder: false });
        } else if (this.state.currentPillar === "sleep") {
          this.setState({ sleepReminder: false });
        } else if (this.state.currentPillar === "social") {
          this.setState({ socialReminder: false });
        } else if (this.state.currentPillar === "nutrition") {
          this.setState({ nutritionReminder: false });
        }
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };

  setDate = newDate => {
    this.setState({ chosenDate: newDate });
    // schedule notification (this.state.piller, newDate)
  };

  showTimePicker = () => {
    return (
      <TimePicker
        date={this.state.chosenDate}
        onDateChange={this.setDate}
        showTimer={this.state.showTimer}
        onConfirm={() =>
          this.submitTime(this.state.chosenDate, this.state.currentPillar)
        }
        onCancel={this.showTimer(this.state.currentPillar)}
      />
    );
  };

  // You only schedule the notification when the date changes
  // You need to keep track (in state) of which toggle button is being configured at the moment

  showTimer = pillar => {
    return () => {
      if (pillar === "exercise") {
        this.setState({ exerciseReminder: !this.state.exerciseReminder });
      } else if (pillar === "mind") {
        this.setState({ mindfulnessReminder: !this.state.mindfulnessReminder });
      } else if (pillar === "sleep") {
        this.setState({ sleepReminder: !this.state.sleepReminder });
      } else if (pillar === "social") {
        this.setState({ socialReminder: !this.state.socialReminder });
      } else if (pillar === "nutrition") {
        this.setState({ nutritionReminder: !this.state.nutritionReminder });
      }
      this.setState(prevState => ({
        showTimer: false
      }));
    };
  };

  toggleSwitch = pillar => {
    return e => {
      if (pillar === "exercise") {
        this.state.exerciseReminder
          ? this.setState(
              {
                exerciseReminder: false,
                exerciseTime: ""
              },
              () => this.deleteTime(pillar),
              this.PushNotificationIOS.cancel("0")
            )
          : this.setState(
              {
                exerciseReminder: !this.state.exerciseReminder,
                showTimer: true,
                currentPillar: pillar
              },
              () =>
                Platform.OS === "android" ? this.androidTimePicker() : null
            );
      } else if (pillar === "mind") {
        this.state.mindfulnessReminder
          ? this.setState(
              {
                mindfulnessReminder: false,
                mindfulnessTime: ""
              },
              () => this.deleteTime(pillar),
              this.PushNotificationIOS.cancel("1")
            )
          : this.setState(
              {
                mindfulnessReminder: !this.state.mindfulnessReminder,
                showTimer: true,
                currentPillar: pillar
              },
              () =>
                Platform.OS === "android" ? this.androidTimePicker() : null
            );
      } else if (pillar === "sleep") {
        this.state.sleepReminder
          ? this.setState(
              {
                sleepReminder: false,
                sleepTime: ""
              },
              () => this.deleteTime(pillar),
              this.PushNotificationIOS.cancel("2")
            )
          : this.setState(
              {
                sleepReminder: !this.state.sleepReminder,
                showTimer: true,
                currentPillar: pillar
              },
              () =>
                Platform.OS === "android" ? this.androidTimePicker() : null
            );
      } else if (pillar === "social") {
        this.state.socialReminder
          ? this.setState(
              {
                socialReminder: false,
                socialTime: ""
              },
              () => this.deleteTime(pillar),
              this.PushNotificationIOS.cancel("3")
            )
          : this.setState(
              {
                socialReminder: !this.state.socialReminder,
                showTimer: true,
                currentPillar: pillar
              },
              () =>
                Platform.OS === "android" ? this.androidTimePicker() : null
            );
      } else if (pillar === "nutrition") {
        this.state.nutritionReminder
          ? this.setState(
              {
                nutritionReminder: false,
                nutritionTime: ""
              },
              () => this.deleteTime(pillar),
              this.PushNotificationIOS.cancel("4")
            )
          : this.setState(
              {
                nutritionReminder: !this.state.nutritionReminder,
                showTimer: true,
                currentPillar: pillar
              },
              () =>
                Platform.OS === "android" ? this.androidTimePicker() : null
            );
      }
      // this.setState({
      //     showTimer: true,
      //     currentPillar: pillar
      //   })
    };
  };

  deleteTime = pillar => {
    firebase
      .database()
      .ref(`notifications/${this.state.user}/${pillar}`)
      .set(null);
  };

  // openModal = () => {

  //   this.setState({modalVisible: true})
  // }

  submitTime = (date, pillar) => {
    let date1 = format(date, 'h:mm a');
    console.log(date1, typeof date1)
    ;
    this.PushNotificationIOS.scheduleNotif(pillar, date);
    
    const data = {
      notifOn: "",
      timeChosen: date1
    };
    if (pillar === "exercise") {
      this.setState({exerciseTime: date1})
      data.notifOn = this.state.exerciseReminder;
    } else if (pillar === "mind") {
      this.setState({mindfulnessTime: date1})
      data.notifOn = this.state.mindfulnessReminder;
    } else if (pillar === "sleep") {
      this.setState({sleepTime: date1})
      data.notifOn = this.state.sleepReminder;
    } else if (pillar === "social") {
      this.setState({socialTime: date1})
      data.notifOn = this.state.socialReminder;
    } else if (pillar === "nutrition") {
      this.setState({nutritionTime: date1})
      data.notifOn = this.state.nutritionReminder;
    }
    firebase
      .database()
      .ref(`notifications/${this.state.user}/${pillar}`)
      .set(data);
    this.setState(prevState => ({
      showTimer: false,
      currentPillar: ""
    }));
  };

  onRegister = token => {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true }, () =>
      console.log("onRegister setState ran")
    );
  };

  onNotif = notif => {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  };

  handlePerm = perms => {
    Alert.alert("Permissions", JSON.stringify(perms));
  };

  deleteAllData = () => {
    this.setState({ loading: true });
    const delData = firebase.database();
    const heroRef = scopeRefByUser("HERO");
    const surveysRef = scopeRefByUser("Surveys");
    const heroRefInitial = scopeRefByUserHero("HERO");
    delData
      .ref(heroRef)
      .set(null)
      .then(() => console.log("Hero info Deleted"))
      .catch(err => this.setState({ error: err }));
    delData
      .ref(surveysRef)
      .set(null)
      .then(() => console.log("Survey info Deleted"))
      .catch(err => this.setState({ error: err }));
    delData
      .ref(heroRefInitial)
      .set(null)
      .then(() =>
        this.setState({ deleteCompleted: true }, () =>
          this.setState({ loading: false })
        )
      )
      .catch(err => this.setState({ error: err }));
  };

  openLink = (url) => {
    console.log(url)
    Linking.openURL(url)
  }

  render() {
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => null}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: 150,
                width: "80%",
                borderColor: "#041D5D",
                borderWidth: 2,
                borderRadius: 9,
                backgroundColor: "#fff"
              }}
            >
              {!this.state.deleteCompleted ? (
                <>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: RFValue(20),
                      color: "#041D5D",
                      textAlign: "center",
                      marginTop: 15
                    }}
                  >
                    Are you sure you want to delete your KickStart30 data?
                  </Text>
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    {this.state.loading ? (
                      <ActivityIndicator size="small" color="#041D5D" />
                    ) : this.state.error ? (
                      <Text>{this.state.error}</Text>
                    ) : null}
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          height: 50,
                          width: "50%",
                          backgroundColor: "#041D5D",
                          borderRightColor: "#fff",
                          borderRightWidth: 1,
                          justifyContent: "center"
                        }}
                        onPress={() => this.setState({ modalVisible: false })}
                      >
                        <Text
                        allowFontScaling={false}
                          style={{
                            color: "#fff",
                            alignSelf: "center",
                            fontSize: RFValue(22)
                          }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          height: 50,
                          width: "50%",
                          backgroundColor: "#041D5D",
                          borderLeftColor: "#fff",
                          borderLeftWidth: 1,
                          justifyContent: "center"
                        }}
                        onPress={() => this.deleteAllData()}
                      >
                        <Text
                        allowFontScaling={false}
                          style={{
                            color: "#fff",
                            alignSelf: "center",
                            fontSize: RFValue(22)
                          }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <View style={{ flex: 1 }}>
                  <Text
                  allowFontScaling={false}
                    style={{
                      fontSize: RFValue(22),
                      color: "#041D5D",
                      textAlign: "center",
                      marginTop: 20
                    }}
                  >
                    Data Successfully Deleted!
                  </Text>
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <TouchableOpacity
                      style={{
                        height: 50,
                        width: "100%",
                        backgroundColor: "#041D5D",
                        justifyContent: "center"
                      }}
                      onPress={() => this.setState({ modalVisible: false })}
                    >
                      <Text
                      allowFontScaling={false}
                        style={{
                          color: "#fff",
                          alignSelf: "center",
                          fontSize: RFValue(22)
                        }}
                      >
                        Ok
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <View style={{ flex: 1, backgroundColor: "#fff"}}>
          <SafeAreaView style={{flex: 1}}>
          <View style={{ flex: 1}}>
          <ScrollView style={{flex: 1}}>
            {this.state.showTimer && Platform.OS === "ios"
              ? this.showTimePicker()
              : null}
            <View
              style={{
                marginLeft: "5%"
              }}
            >
              <View style={{ alignSelf: "center"}}>
                <Text
                  style={{
                    fontSize: RFValue(36),
                    marginBottom: Platform.OS === "ios" ? 10 : 0,
                    fontWeight: "900",
                    color: "#000"
                  }}
                >
                  Settings
                </Text>
                <Icon />
              </View>
              <Text style={{ fontSize: RFValue(20), color: "#000" }}>Notifications</Text>
              {/* {height < 666 || width < 374 ? (
                <View
                  style={{
                    left: "50%",
                    flex: 1,
                    flexDirection: "column",
                    top: "10%",
                    borderColor:'black',
                    borderWidth:1
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 100,
                      backgroundColor: "#041D5D",
                      justifyContent: "center",
                      borderRadius: 7,
                      marginBottom: 10,
                      zIndex: 1
                    }}
                    onPress={() => firebase.auth().signOut()}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        alignSelf: "center",
                        fontSize: 18
                      }}
                    >
                      Logout
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 100,
                      backgroundColor: "#041D5D",
                      justifyContent: "center",
                      borderRadius: 7,
                      zIndex: 1
                    }}
                    onPress={() => this.setState({ modalVisible: true })}
                  >
                    <View>
                      <Text
                        style={{
                          color: "#fff",
                          alignSelf: "center",
                          fontSize: 17,
                          textAlign: "center",
                          fontWeight: "700"
                        }}
                      >
                        Reset
                      </Text>
                      <Text
                        style={{
                          color: "red",
                          alignSelf: "center",
                          fontSize: 12,
                          textAlign: "center",
                          fontWeight: "700"
                        }}
                      >
                        KickStart30
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null} */}
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: "#000",
                  width: "90%"
                }}
              >
                <View style={{ marginTop: 15, flexDirection: 'row'}}>
                  <View>
                  <Text style={{ fontSize: RFValue(20), color: "#000" }}>Exercise</Text>
                  <ToggleSwitch
                    labelStyle={{ color: "#000", fontWeight: "900" }}
                    size="large"
                    onColor={exerciseColor}
                    offColor="#d5eac5"
                    isOn={this.state.exerciseReminder}
                    onToggle={this.toggleSwitch("exercise")}
                  />
                  </View>
                  <View style={{flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{alignSelf:'center'}}>{this.state.exerciseTime}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row'}}>
                  <View>
                  <Text style={{ fontSize: RFValue(20), color: "#000" }}>
                    Mindfulness
                  </Text>
                  <ToggleSwitch
                    labelStyle={{ color: "#000", fontWeight: "900" }}
                    size="large"
                    onColor={mindfulnessColor}
                    offColor="#cef0fa"
                    isOn={this.state.mindfulnessReminder}
                    onToggle={this.toggleSwitch("mind")}
                  />
                  </View>
                  <View style={{flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{alignSelf:'center'}}>{this.state.mindfulnessTime}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row'}}>
                  <View>
                  <Text style={{ fontSize: RFValue(20), color: "#000" }}>Sleep</Text>
                  <ToggleSwitch
                    labelStyle={{ color: "#000", fontWeight: "900" }}
                    size="large"
                    onColor={sleepColor}
                    offColor="#f1d5e9"
                    isOn={this.state.sleepReminder}
                    onToggle={this.toggleSwitch("sleep")}
                  />
                  </View>
                  <View style={{flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{alignSelf:'center'}}>{this.state.sleepTime}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                  <View>
                  <Text style={{ fontSize: RFValue(20), color: "#000" }}>Social</Text>
                  <ToggleSwitch
                    labelStyle={{ color: "#000", fontWeight: "900" }}
                    size="large"
                    onColor={socialColor}
                    offColor="#fbd6d3"
                    isOn={this.state.socialReminder}
                    onToggle={this.toggleSwitch("social")}
                  />
                  </View>
                  <View style={{flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{alignSelf:'center'}}>{this.state.socialTime}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                  <View>
                  <Text style={{ fontSize: RFValue(20), color: "#000" }}>Nutrition</Text>
                  <ToggleSwitch
                    labelStyle={{ color: "#000", fontWeight: "900" }}
                    size="large"
                    onColor={nutritionColor}
                    offColor="#f4d9d2"
                    isOn={this.state.nutritionReminder}
                    onToggle={this.toggleSwitch("nutrition")}
                  />
                  </View>
                  <View style={{flex: 1, justifyContent:'flex-end'}}>
                  <Text style={{alignSelf:'center'}}>{this.state.nutritionTime}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <Text style={{ fontSize: 20, marginLeft: "5%", marginTop: 20 }}>
            Quests
          </Text> */}
            {/* <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "black",
              width: "90%",
              marginLeft: "5%"
            }}
          > */}
            {/* <TouchableOpacity
              style={{
                marginTop: 15,
                borderRadius: 20,
                width: "45%",
                height: 60,
                backgroundColor: "#E17026",
                justifyContent: "center"
              }}
              onPress={() => Actions.nutritionquestcameraroll()}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  Nutrition Quest{"\n"} Photos
                </Text>
              </View>
            </TouchableOpacity> */}
              <View
                style={{
                  marginHorizontal: 'auto',
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 20
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 100,
                    backgroundColor: "#041D5D",
                    justifyContent: "center",
                    borderRadius: 7
                  }}
                  onPress={() => firebase.auth().signOut()}
                >
                  <Text
                  allowFontScaling={false}
                    style={{ color: "#fff", alignSelf: "center", fontSize: RFValue(18) }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                      height: 60,
                      width: 100,
                      backgroundColor: "#041D5D",
                      justifyContent: "center",
                      borderRadius: 7,
                      zIndex: 1
                    }}
                    onPress={() => this.setState({ modalVisible: true })}
                  >
                    <View>
                      <Text
                      allowFontScaling={false}
                        style={{
                          color: "#fff",
                          alignSelf: "center",
                          fontSize: RFValue(17),
                          textAlign: "center",
                          fontWeight: "700"
                        }}
                      >
                        Reset
                      </Text>
                      <Text
                      allowFontScaling={false}
                        style={{
                          color: "red",
                          alignSelf: "center",
                          fontSize: RFValue(12),
                          textAlign: "center",
                          fontWeight: "700"
                        }}
                      >
                        KickStart30
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={{
                    height: 60,
                    width: 100,
                    backgroundColor: "#041D5D",
                    justifyContent: "center",
                    borderRadius: 7,
                    zIndex: 1
                  }}
                  onPress={()=> Actions.about()}
                  >
                       <Text
                       allowFontScaling={false}
                    style={{ color: "#fff", alignSelf: "center", fontSize: RFValue(18) }}
                  >
                    About
                  </Text>
                  </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={()=> this.openLink('http://bit.ly/KickStart30')} style={{height: 60, width:'90%', backgroundColor:"#041D5D", alignSelf:'center', alignItems:'center', justifyContent:'center',  borderRadius: 7, marginBottom:10}}>
                    <Text style={{ color: "#fff", alignSelf: "center", fontSize: RFValue(18)}}>BUY THE WORKBOOK</Text>
              </TouchableOpacity>
            {/* </View> */}
            </ScrollView>
          </View>
          <Navbar settingsdisable />
          </SafeAreaView>
        </View>
      </>
    )
  }}
  


export default Settings;
