import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './TabNavComponent'
import HomeStack from '../stacks/Home'
import StatsStack from '../stacks/Stats'
import SettingsStack from '../stacks/Settings'

const Tab = createBottomTabNavigator();
export default function TabNavigator(){
    return (
        <Tab.Navigator initialRouteName={'Track'} tabBar={props=> <TabBar {...props}/>}>
            <Tab.Screen name="Track" component={HomeStack}/>
            <Tab.Screen name="Stats" component={StatsStack}/>
            <Tab.Screen name="Settings" component={SettingsStack}/>
        </Tab.Navigator>
    )
}