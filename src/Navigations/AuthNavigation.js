import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '../Screens/Login_SignUp/ChangePassword';
import GettingStarted from '../Screens/Landing/GettingStarted';
import EmailScreen from '../Screens/Login_SignUp/EmailScreen';
import ForgotPassword from '../Screens/Login_SignUp/ForgotPassword';
import LandingPage from '../Screens/Login_SignUp/LandingPage';
import Login from '../Screens/Login_SignUp/Login';
import SignUp from '../Screens/Login_SignUp/SignUp';
import VerficationScreen from '../Screens/Login_SignUp/VerficationScreen';
import BottomTaBNavigation from './BottomTaBNavigation';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}} >
      <Stack.Screen name="Getting started" component={GettingStarted} options={{headerShown: false}}/>
      <Stack.Screen name="Landing Page" component={LandingPage} options={{headerShown: false}}/>
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Enter Email" component={EmailScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen name="Verification Screen" component={VerficationScreen} />
      <Stack.Screen name="Home" component={BottomTaBNavigation} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})