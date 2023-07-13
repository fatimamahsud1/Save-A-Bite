import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GettingStarted from '../Screens/Landing/GettingStarted';
import LandingPage from '../Screens/Login_SignUp/LandingPage';


const Stack = createNativeStackNavigator();

const StartNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}} >
      <Stack.Screen name="Getting started" component={GettingStarted} options={{headerShown: false}}/>
      <Stack.Screen name="Landing Page" component={LandingPage} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default StartNavigation

const styles = StyleSheet.create({})