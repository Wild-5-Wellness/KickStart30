import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import chunk from 'lodash/chunk';
import {withAuthProvider} from '../context/authcontext';
import HEROlogo from '../images/herologo.png';

const {width} = Dimensions.get('window');

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
  {
    title: "Today's Progress",
    icon: 'stats',
    action: () => {
      props.getTrackingData();
      Actions.progress();
    },
    background: ['#0b2261', '#762e73'],
  },
];

export function Navigation(props) {
  const renderItem = React.useCallback((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.touchable}
        onPress={item.action}
      >
        <LinearGradient style={styles.item} colors={item.background}>
          {item.title === 'HERO Exercises' ? (
            <Image
              source={item.icon}
              style={{width: '100%', height: 65, resizeMode: 'contain'}}
            />
          ) : (
            <Icon name={item.icon} style={styles.icon} />
          )}
          <Text style={styles.title}>{item.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      {chunk(navigationItems, 2).map(items => (
        <View style={styles.row}>{items.map(renderItem)}</View>
      ))}
    </View>
  );
}

export default withAuthProvider(Navigation);

const styles = StyleSheet.create({
  container: {flex: 1},
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  touchable: {
    marginBottom: 10,
    width: (1 / 2) * width - 20,
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
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 110,
  },
  icon: {color: 'white', fontSize: 60},
  title: {color: 'white', fontSize: 18},
});
