import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Navbar from '../components/Navbar';
import LinearGradient from 'react-native-linear-gradient';
import chunk from 'lodash/chunk';
import {withAuthProvider} from '../context/authcontext';
import HEROlogo from '../images/herologo.png';
import wild5title from '../images/wild5_logo_resized4.png';
import KS30title from '../images/KS30_578_113.png';

const {width, height} = Dimensions.get('window');

const navigationItems = [
  {
    title: 'Track Exercise',
    icon: 'bicycle',
    action: () => Actions.exercisetracking(),
    background: ['#a8eb12', '#79c141'],
  },
  {
    title: 'Track Mindfulness',
    icon: 'headset',
    action: () => Actions.mindfulnesstracking(),
    background: ['#00cbea', '#3fb5eb'],
  },
  {
    title: 'Track Sleep',
    icon: 'moon',
    action: () => Actions.sleeptracking(),
    background: ['#e94c7e', '#b92e91'],
  },
  {
    title: 'Track Social',
    icon: 'contacts',
    action: () => Actions.socialtracking(),
    background: ['#db1b63', '#ee3422'],
  },
  {
    title: 'Track Nutrition',
    icon: 'restaurant',
    action: () => Actions.nutritiontracking(),
    background: ['#f66f63', '#f79a2e'],
  },
  {
    title: 'HERO Exercises',
    icon: HEROlogo,
    action: () => Actions.herotracking(),
    background: ['#DD3121', '#0BA2D4', '#70B43C', '#B72B90'],
  },
];

export function Navigation(props) {
  const [bothTrue, setBothTrue] = useState(false);

  useEffect(() => {
    console.log(Dimensions.get('window'));
    if (props.hero && props.hero2) {
      setBothTrue(true);
    }
  }, []);

  const renderItem = React.useCallback((item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        style={
          (index === index % 2) === 0 || index === 0
            ? styles.touchable
            : styles.touchableHERO
        }
        onPress={!props.hero ? null : item.action}>
        <LinearGradient style={styles.item} colors={item.background}>
          {item.title === 'HERO Exercises' ? (
            <Image
              source={require('../images/herologo.png')}
              style={{width: '100%', height: 50}}
              resizeMode="contain"
            />
          ) : (
            <Icon name={item.icon} style={styles.icon} />
          )}
          <Text
            style={
              item.title === 'HERO Exercises' ? styles.titleHERO : styles.title
            }
            allowFontScaling={false}>
            {item.title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      {(!props.hero && !props.hero2) || (props.hero && props.hero2) ? (
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView bounces={false}>
              <Image
                source={KS30title}
                style={{height: 80, width: '90%', alignSelf: 'center'}}
                resizeMode="contain"
              />
              {!props.hero && !props.hero2 ? (
                <Text style={styles.heroText}>
                  Take The Hero Wellness Survey to START
                </Text>
              ) : (
                <Text style={styles.herText2}>
                  Take The Hero Wellness Survey
                </Text>
              )}
              <TouchableOpacity
                style={[styles.touchableHERO3]}
                onPress={() => Actions.herointro()}>
                <LinearGradient
                  style={[styles.itemHERO3]}
                  colors={['#041D5D', '#082774']}>
                  <View style={{flex: .8}}>
                  <Image
                    source={HEROlogo}
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      resizeMode: 'contain',
                    }}
                  />
                  </View>
                  <Text style={styles.titleHERO3}>Survey</Text>
                </LinearGradient>
              </TouchableOpacity>
              {chunk(navigationItems, 2).map((items, index) => (
                <View key={index} style={styles.row}>
                  {items.map(renderItem)}
                </View>
              ))}
              <View
                style={styles.KS30DayTextContainer}>
                {!props.hero ? null : <Text style={styles.KS30DayText}>
                  Day {props.day} of KickStart30
                </Text>}
              </View>
              <Image
                source={require('../images/wild5_logo_resized4.png')}
                style={{
                  height: 50,
                  width: '50%',
                  alignSelf: 'center',
                  marginTop: '2%',
                }}
                resizeMode="contain"
              />
            </ScrollView>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Navbar homedisable />
          </View>
        </SafeAreaView>
      ) : (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 0.8, margin: '2%'}}>
              <Image
                source={KS30title}
                style={{
                  flex: 1,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={{flex: 5}}>
              {chunk(navigationItems, 2).map((items, index) => (
                <View key={index} style={styles.row}>
                  {items.map(renderItem)}
                </View>
              ))}
            </View>
            <View style={styles.KS30DayTextContainer}>
              <Text style={styles.KS30DayText}>
                Day {props.day} of KickStart30
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Image
                source={wild5title}
                style={{
                  flex: 0.5,
                  height: undefined,
                  width: undefined,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Navbar homedisable />
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}

export default withAuthProvider(Navigation);

const styles = StyleSheet.create({
  container: {flex: 1},
  fitImageWithSize: {
    height: 75,
    width: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  touchable: {
    backgroundColor: 'transparent',
    marginBottom: 8,
    marginRight: 5,
    marginLeft: 15,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  touchableHERO: {
    backgroundColor: 'transparent',
    marginBottom: 8,
    marginRight: 15,
    marginLeft: 5,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },
  icon: {color: 'white', fontSize: RFPercentage(10)},
  title: {color: 'white', fontSize: RFPercentage(2)},
  titleHERO: {
    color: 'white',
    fontSize: RFPercentage(2),
    textAlign: 'center',
    marginTop: '3%',
  },
  titleHEROMain: {
    color: '#041D5D',
    fontSize: RFValue(24),
    alignSelf: 'center',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '15%',
  },
  itemHERO3: {
    alignSelf: 'center',
    borderRadius: 5,
    paddingBottom: 10,
    height: 80,
    width: '80%',
  },
  titleHERO3: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  touchableHERO3: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
    width: width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  heroText: {
    alignSelf: 'center',
    color: '#041D5D',
    fontWeight: '700',
    fontSize: RFValue(20),
    marginBottom: 10,
    textAlign: 'center',
  },
  herText2: {
    alignSelf: 'center',
    color: '#041D5D',
    fontWeight: '700',
    fontSize: RFValue(20),
    marginBottom: 10,
  },
  KS30DayText: {
    fontSize: RFValue(20),
    color: '#041D5D',
    fontWeight: '800',
    textAlign: 'center',
  },
  KS30DayTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
