// import React, { Component } from 'react'
import { Text, View, AlertIOS } from 'react-native'
import PushNotification from 'react-native-push-notifications';
// const PushNotification = require('react-native-push-notifications')

class PushNotificationsIOS {
    constructor(onRegister, onNotification) {
        this.configure(onNotification);
    
        this.lastId = 0;
      }
    
      configure = (onRegister, onNotification) => {
        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister: onRegister, //this._onRegister.bind(this),
    
          // (required) Called when a remote or local notification is opened or received
          onNotification: onNotification, //this._onNotification,
    
          // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        //  senderID: gcm,
    
          // IOS ONLY (optional): default: all - Permissions to register.
          permissions: {
            alert: true,
            badge: true,
            sound: true
          },
    
          // Should the initial notification be popped automatically
          // default: true
          popInitialNotification: true,
    
          /**
            * (optional) default: true
            * - Specified if permissions (ios) and token (android and ios) will requested or not,
            * - if not, you must call PushNotificationsHandler.requestPermissions() later
            */
          requestPermissions: true,
        });
      }

    
      scheduleNotif = (pillar) =>{
        // AlertIOS.alert('schedulerunning')
        this.lastId++;


        let config = {
          date: new Date(Date.now() + (30 * 1000)), // in 30 secs
           /* Android Only Properties */
           // id: ''+this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
           // ticker: "My Notification Ticker", // (optional)
           // autoCancel: true, // (optional) default: true
           // largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
           // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
           // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
           // subText: "This is a subText", // (optional) default: none
           // color: "blue", // (optional) default: system default
           // vibrate: true, // (optional) default: true
           // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
           // tag: 'some_tag', // (optional) add tag to message
           // group: "group", // (optional) add group to message
           // ongoing: false, // (optional) set whether this is an "ongoing" notification
     
           /* iOS only properties */
           alertAction: 'view', // (optional) default: view
           // category: null, // (optional) default: null
           // userInfo: null, // (optional) default: null (object containing additional notification data)
     
           /* iOS and Android properties */
           // title: "Scheduled Notification", // (optional)
           message: "Hello",
           number: '10',
        
       };

      if(pillar === "exercise"){
        config.date = new Date(Date.now() + (30 * 1000));
        config.message = 'Have you Exercised today?';
      } else if (pillar === "mind"){
        config.date = new Date(Date.now() + (30 * 1000));
        config.message = 'Have you Practiced mindfulness today?';
      } else if (pillar === "sleep"){
        config.date = new Date(Date.now() + (30 * 1000));
        config.message = 'Have you tracked your sleep today?';
      } else if (pillar === "social"){
        config.date = new Date(Date.now() + (30 * 1000));
        config.message = 'Have you reached out to 2 people today?';
      } else if (pillar === "nutrition"){
        config.date = new Date(Date.now() + (30 * 1000));
        config.message = 'Did you track your today?';
      }
      PushNotification.localNotificationSchedule(config);
    }
    
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default PushNotificationsIOS
