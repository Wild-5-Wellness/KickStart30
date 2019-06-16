import React, {Component} from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import { Text, } from 'native-base';
import BarGraph from '../../components/charts/BarGraph';
import firebase from 'firebase';
import progbackground from '../../images/progbackground.jpg'

// var firebaseConfig = {
//     apiKey: "AIzaSyC93k0KGpd8myVQxCTgWPw6Qk9NzNA6b_o",
//     authDomain: "wild5-5ca8b.firebaseapp.com",
//     databaseURL: "https://wild5-5ca8b.firebaseio.com",
//     projectId: "wild5-5ca8b",
//     storageBucket: "wild5-5ca8b.appspot.com",
//     messagingSenderId: "714885268112"
//   }

// firebase.initializeApp(firebaseConfig)


// gotData = (data) => {
//     console.log(data);
// }
// function gotData(data) {
//     console.log(data)
// }

// errData = (err) => {
//     console.log('error')
//     console.log(err)
// }
// function errData(err){
//     console.log('error')
//     console.log(err);
// }

const screenheight = Dimensions.get('window').height;
class Progress extends Component {
    constructor(){
    super();


    this.state = {
        data: [],
        exval: 0,
        mindval: 0,
        socval: 0,
        sleepval: 0,
        nutrval: 0,
    }
    
    }


    componentWillMount(){
        var user = firebase.auth().currentUser;
            if (user) {
                var res = user.email.split(".");
                var userEm = res[0].toString();
                this.setState({
                    user: userEm
                })
            } else {
                console.log('noperz')
            }
        var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var dateTime = date;
                this.setState({
                    date: dateTime
                })
            }
        
        componentDidMount(){
            var database = firebase.database();
            var ref = database.ref(`Surveys/${this.state.user}/${this.state.date}`);
            ref.on('value', this.gotData, this.errData)
        }

        gotData = (data) => {
            newData = data.val();
            this.setState({
                data: newData
            })
            console.log(this.state.data);
            this.renderGraph();
        }

        errData = (err) => {
            console.log('error')
            console.log(err)
        }

        renderGraph = () => {
            let exval = this.exercisecalc();
            let mindval = this.mindcalc();
            let sleepval = this.sleepcalc();
            let socval = this.soccalc();
            let nutrval = this.nutrcalc();
            this.setState({
                exval,
                mindval,
                sleepval,
                socval,
                nutrval
            })
            console.log(this.state);
        }

        exercisecalc = () => {
            let i = 0;
            let test = this.state.data;
            if (test.Exduration >= 30){
                i = i+1;
            }
            if (test.Exintensity === 'moderate' || test.Exintensity === 'high'){
                i = i+1;
            }
            if (test.Extype){
                i = i+1;
            }
            return i;
        }

        mindcalc = () => {
            let i = 0;
            let test = this.state.data;
            if (test.mindprac){
                i = i + 1;
            }
            if (test.mindtype && test.mindtype !== 'None'){
                i = i + 1;
            }
            if (i === 2){
                return i = 3;
            } else if (i === 1){
                return i = 1.5;
            } else return i;
        }

        sleepcalc = () => {
            let i = 0;
            let test = this.state.data;
            if (test.slcaffeine){
                i = i + 1;
            }
            if (test.slelectronics){
                i = i + 1;
            }
            if (test.slnapping){
                i = i + 1;
            }
            if (test.slregulartime){
                i = i + 1;
            }
            if (test.slsleepmask){
                i = i + 1;
            }
            if (test.slwarmbath){
                i = i + 1;
            }
            if (i >= 4){
                return i = 3;
            } else if (i >=2 && i <=3){
                return i = 2
            } else if (i === 1){
                return i = 1;
            } else return i;
        }

        soccalc = () => {
            let i = 0;
            let test = this.state.data;
            if (test.socfamilycall){
                i = i + 1;
            }
            if (test.socfriendcall){
                i = i + 1;
            }
            if (test.socfamilyinperson){
                i = i + 1;
            }
            if (test.socfriendinperson){
                i = i + 1;
            }
            if (i >= 2){
                return i = 3;
            } else {
                return i;
            }
        }

        nutrcalc = () => {
            let i = 0;
            let test = this.state.data;
            if (test.nutrlogged){
                i = i + 1;
            }
            if (test.MIND){
                i = i + 1;
            }
            if (test.breakfast){
                i = i + 1;
            }
            if (test.nutrlunch){
                i = i + 1;
            }
            if (test.nutrdinner){
                i = i + 1;
            }
            if (i === 5){
                return i = 3;
            } else if (i === 3 || i === 4){
                return i = 2;
            } else if (i === 2){
                return i = 1;
            } else return i;
        }
        maxSkill = () => {
            let {exval, mindval, nutrval, socval, sleepval} = this.state;
            if (exval > mindval && exval > nutrval && exval > socval && exval > sleepval){
               return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color:'green'}}>Exercise</Text>
            }
            else if (mindval > exval && mindval > nutrval && mindval > socval && mindval > sleepval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'blue'}}>Mindfulness</Text>
            }
            else if (nutrval > mindval && nutrval > exval && nutrval > socval && nutrval > sleepval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'orange'}}>Nutrition</Text>
            }
            else if (socval > mindval && socval > nutrval && socval > socval && exval > sleepval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'red'}}>Social Connectedness</Text>
            }
            else if (sleepval > mindval && sleepval > nutrval && sleepval > socval && sleepval > exval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'purple'}}>Sleep</Text>
            }
            else if (sleepval === mindval && sleepval === nutrval && sleepval === socval && sleepval === exval){
                return <Text style={{fontSize: 20, alignSelf:'center', fontWeight:'600'}}>Flying Colors!</Text>
            } else return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600'}}>Well-Rounded</Text>
        }
        minSkill = () => {
            let {exval, mindval, nutrval, socval, sleepval} = this.state;
            if (exval < mindval && exval < nutrval && exval < socval && exval < sleepval){
               return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color:'green'}}>Exercise</Text>
            }
            else if (mindval < exval && mindval < nutrval && mindval < socval && mindval < sleepval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'blue'}}>Mindfulness</Text>
            }
            else if (nutrval < mindval && nutrval < exval && nutrval < socval && nutrval < sleepval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'orange'}}>Nutrition</Text>
            }
            else if (socval < mindval && socval < nutrval && socval < socval && exval < sleepval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'red'}}>Social Connectedness</Text>
            }
            else if (sleepval < mindval && sleepval < nutrval && sleepval < socval && sleepval < exval){
                return <Text style={{fontSize: 15, alignSelf:'center', fontWeight:'600', color: 'purple'}}>Sleep</Text>
            }
            else if (sleepval === mindval && sleepval === nutrval && sleepval === socval && sleepval === exval){
                return <Text style={{fontSize: 20, alignSelf:'center', fontWeight:'600'}}>Amazing work!</Text>
            } else return "More than one principle"
        }

    render(){
        return (
            <View style={{backgroundColor:'white', height: screenheight}}>
                <ImageBackground source={progbackground} style={{height: '100%', width: '100%'}}>
                <View><Text style={{fontSize: 15, marginTop:'10%', alignSelf:'center', fontWeight:'600'}}>You can earn 3 points a day in every wellness principle</Text></View>

                {this.state.exval ? <BarGraph exval={this.state.exval} mindval={this.state.mindval} nutrval={this.state.nutrval} sleepval={this.state.sleepval} socval={this.state.socval} /> : <Text style={{fontSize: 15, marginTop: '15%', alignSelf:'center', fontWeight:'600'}}>No data to show today :S</Text>}

                <View>
                    <View>
                       {this.state.exval ? <Text style={{fontSize: 15, marginTop: '15%', alignSelf:'center', fontWeight:'600'}}>Today's best principle: {this.maxSkill()}</Text>: <Text style={{fontSize: 15, marginTop: '15%', alignSelf:'center', fontWeight:'600'}}>Today's best principle: None</Text>}
                       {this.state.exval ? <Text style={{fontSize: 15, marginTop: '10%', alignSelf:'center', fontWeight:'600'}}>Today's least practiced principle: {this.minSkill()}</Text>: <Text style={{fontSize: 15, marginTop: '15%', alignSelf:'center', fontWeight:'600'}}>Today's best principle: None</Text>}
                    </View>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

export default Progress;