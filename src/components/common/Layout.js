import React from 'react';
import PropTypes from 'prop-types';
import {View, SafeAreaView, ScrollView, Text, StyleSheet, Platform} from 'react-native';
import Navbar from '../Navbar';

export function Layout(props) {
  return (
    <View style={styles.flex}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scrollView}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.mainArea}>{props.children}</View>
        </ScrollView>
      </SafeAreaView>
      <Navbar statsdisable/>
    </View>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
    },
  scrollView: {
    flex: 1,
    padding: 10
    },
  title: {
    color: Platform.OS === 'android' ? '#000' : null,
    fontSize: 36,
    marginTop: '10%',
    fontWeight: '900',
  },
  mainArea: {
    paddingTop: '10%',
    paddingBottom: 60
  },
});
