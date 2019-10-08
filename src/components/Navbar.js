import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Text,
  Header,
  Icon,
  Badge
} from "native-base";
import { Actions } from "react-native-router-flux";

const {width, height} = Dimensions.get('window')

const Navbar = (props) => {
 

    return (
      <View>
          <Footer>
            <FooterTab style={{backgroundColor: "#041D5D"}}>
              <Button disabled={props.homedisable} onPress={()=> Actions.landing()}>
                <Icon name={"ios-home"} style={styles.icon}/>
                <Text style={styles.buttons}>Track</Text>
              </Button>
              {/* <Button disabled={this.props.learndisable} onPress={() => Actions.edroadmap()}>
                <Icon name={"ribbon"} />
                <Text>Learn</Text>
              </Button> */}
              {/* <Button onPress={() => Actions.kickstart()}>
            <Icon name={"rocket"} />
              <Text>Kickstart</Text>
            </Button> */}
            <Button disabled={props.feedbackdisable} onPress={() => Actions.feedback()}>
                <Icon name={"clipboard"} style={styles.icon}/>
                
                <Text style={styles.feedback}>Feedback</Text>
              </Button>
            {/* <Button disabled={this.props.questdisable} onPress={() => Actions.quests()}>
                <Icon name={"flame"} />
                <Text>Quest</Text>
              </Button> */}
              <Button disabled={props.statsdisable} onPress={() => Actions.statistics()}>
                <Icon name={"stats"} style={styles.icon}/>
                <Text style={styles.buttons}>Stats</Text>
              </Button>
              {/* <Button onPress={() => Actions.help()}>
        <Icon name={'md-help'} />
          <Text>Help</Text>
        </Button> */}
              <Button disabled={props.faqdisable} onPress={() => Actions.about()}>
                <Icon name={"chatbubbles"} style={styles.icon}/>
                <Text style={styles.buttons}>About</Text>
              </Button>
              <Button disabled={props.settingsdisable} onPress={() => Actions.settings()}>
                <Icon name={"ios-settings"} style={styles.icon}/>
                <Text style={styles.settings}>Settings</Text>
              </Button>
            </FooterTab>
          </Footer>
      </View>
    );
  }


export default Navbar;

const styles = StyleSheet.create({
  icon:{
    color: "#fff",
    fontSize: height < 666 && width < 374 ? 18 : 20
  },
  buttons: {
    color: "#fff",
    fontSize: 10 },
settings: {
  color: "#fff",
fontSize: height < 666 && width < 374 ? 7 : 10
},
feedback: {
    color: "#fff",
  fontSize: height < 666 && width < 374 ? 6 : 9
  
}
})