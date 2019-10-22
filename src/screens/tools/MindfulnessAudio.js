import React,{useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native'
import {Icon } from 'native-base'
import { Player } from '@react-native-community/audio-toolkit'

const players = [
    {
      path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/a_moment_of_graditude.mp3",
      name: "A Moment of Graditude",
      duration: 10
    },
    { path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/body_scan.mp3", name: "Body Scan", duration: 15 },
    {
      path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/five_minute_breathing_space.mp3",
      name: "Five Minute Breathing Space",
      duration: 7
    },
    {
      path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/happiness_meditation.mp3",
      name: "Happiness Meditation",
      duration: 12
    },
    {
      path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/intro_to_mindful_meal_meditation.mp3",
      name: "Intro to Mindful Meal Meditation",
      duration: 5
    },
    { path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/mindful_breathing.mp3", name: "Mindful Breathing", duration: 15 },
    {
      path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/mindful_meal_meditation.mp3",
      name: "Mindful Meal Meditation",
      duration: 24
    },
    {
      path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/mindful_moment_with_a_raisen.mp3",
      name: "Mindful Moment With a Raisen",
      duration: 10
    },
    { path: "https://s3-us-west-1.amazonaws.com/wild5wellness.kickstart30/pain_meditation.mp3", name: "Pain Meditation", duration: 13 }
  ].map(track => ({
      player: new Player(track.path, {
        continuesToPlayInBackground: true
    }),
      name: track.name,
      duration: track.duration
  }))

const MindfulnessAudio = () => {
    const [state, setState] = useState({
        activePlayerId: NO_PLAYER,
        isPlaying: null,
        duration: null,
        currentTime: 0,
        completedTracks: [],
        modalVisible: false,
        date1: new Date().toString().slice(0,9),
        user: "",
        date: ""
      })
      const NO_PLAYER = -1;


      return (
        <View style={{ flex: 1, backgroundColor: "#fff", alignItems:'center' }}>
        <SafeAreaView style={{flex: 1}}>
            {players.map(({ player, name, duration }) => {
            // const duration = Math.round(player.getDuration() / 60)
                console.log(player)
                player.on("ended", ()=>{
                    setState(prevState=>({
                        ...prevState,
                        playerDuration: player._duration,
                        activePlayerId: NO_PLAYER,
                        isPlaying: player.isPlaying,
                        completedTracks: [...state.completedTracks, player._playerId]
                    }))
                })
            return (
              <TouchableOpacity
                key={player._playerId + Math.random()}
                style={{
                  height: 50,
                  width: "90%",
                  backgroundColor:state.activePlayerId === player._playerId ? "#32CD32" : state.completedTracks.includes(player._playerId) ? '#333' : "#0AB2E8",
                  marginBottom: "2%",
                  marginTop: "2%"
                }}
                onPress={() => {
                    if(player.isPlaying){
                        player.pause(()=>
                        setState(prevState=>({
                            ...prevState,
                            activePlayerId: NO_PLAYER,
                            isPlaying: player.isPlaying
                        }))
                        )
                    } else {
                        player.play(()=> {
                        setState(prevState=>({
                            ...prevState,
                            activePlayerId: player._playerId,
                            isPlaying: player.isPlaying
                        }))
                    }
                        )
                    }
                    
                }}
              >
            <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ width: "87%" }}>
                    <Text
                      style={{
                        marginLeft: 15,
                        fontSize: 18,
                        alignSelf: "center"
                      }}
                    >
                      {name}
                    </Text>
                  </View>
                  <Icon
                    style={{
                      marginRight: 15,
                      fontSize: 40,
                      alignSelf: "center"
                    }}
                    name={state.activePlayerId !== player._playerId ? "play" : "pause"}
                  />
                </View>
                </View>
              </TouchableOpacity>
            )})}
        </SafeAreaView>
        </View>
      )

}


export default MindfulnessAudio;