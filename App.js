import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AllScreen from './screens/AllScreen';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import RecentScreen from './screens/RecentScreen';
import AddScreen from './screens/AddScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function Tabs ({navigation}){

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size}) => {
        let iconName;
        if (route.name === 'All Expenses') {
          iconName = focused ? 'calendar-outline' : 'calendar-outline';
        }else if (route.name === 'Recent Expenses') {
          iconName = focused ? 'hourglass-outline' : 'hourglass-outline';
        }
        return <Ionicons name={iconName} size={30} color="white" />;
      },
      tabBarBackground: () => (
        <View style={{flex:1,backgroundColor:"#1aacf0"}}>
          <View style={{ flex: 1, backgroundColor: '#003b88', borderTopStartRadius:20, borderTopEndRadius:20 }} />
        </View>
        ),
        headerBackground: () => (
        <View style={{flex:1,backgroundColor:"#1aacf0"}}>
          <View style={{ flex: 1, backgroundColor: '#003b88', borderBottomStartRadius:20, borderBottomEndRadius:20 }} />
        </View>
      ),
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen 
        name="All Expenses" 
        component={AllScreen} 
        options={{
          headerStyle:{backgroundColor:"#003b88", height:110}, 
          headerTintColor:"white"
        }}/>
      <Tab.Screen
        name="Recent Expenses"
        component={RecentScreen}
        options={{
          headerRight: () => (
            <Ionicons 
              name="add" 
              size={30} 
              color="white" 
              style={{paddingRight:20}}
              onPress={() => navigation.navigate("Add")}
               />
          ),
          headerStyle:{backgroundColor:"#003b88" , height:110}, 
          headerTintColor:"white"}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LogInScreen} 
          options={{headerStyle:{backgroundColor:"#1aacf0"},headerShown:false}}/>
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerStyle:{backgroundColor:"#1aacf0"}, headerShown:false}}/>
        <Stack.Screen 
          name='Main'
          component={Tabs}
          options={{headerShown:false}} />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{headerStyle:{backgroundColor:"#003b88"},headerTintColor:"white", presentation:"modal"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  pressed:{
    opacity:0.5
  },
  style:{
    color:"tomato",
  },
})
