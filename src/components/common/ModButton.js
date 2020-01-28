import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
const ModButton = ({color, onPress, label, style}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, style, {backgroundColor: color}]}
  >
    <Text style={styles.buttonLabel}>{label}</Text>
  </TouchableOpacity>
);

export {ModButton};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    alignSelf: 'stretch',
  },
  buttonLabel: {
    color: 'white',
    fontSize: RFValue(20),
    fontWeight: '500',
    padding: 15,
    alignSelf: 'center',
  },
});
