import { StyleSheet, Text, View, Image, TouchableHighlight, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import LoginContext from '../../context/Context';

const Account = ({ navigation }) => {

  const {userData, setUser, setUserData} = useContext(LoginContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }
  }, [])

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  }

  const signOut = async () => {
    auth().signOut()
      .then(() => {
        setUser(null);
        setUserData(null);
      })

  }

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Image source={{uri : userData.imageURL}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} >{userData ? userData.fname + " " + userData.lname : "No name" }</Text>
          <Text style={styles.location} numberOfLines={1} >{userData ? userData.city : "No address"}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Octicons name="pencil" size={23} color="#F86D3B" style={styles.logo} onPress={() => navigation.navigate('Myprofile', { ...userData })} />
        </View>
      </View>

      <TouchableHighlight style={styles.option} onPress={() => navigation.navigate('Settings')} underlayColor="#ffffff00">
        <>
          <View style={styles.child}>
            <Ionicons name="settings-outline" size={30} color="#000" />
            <Text style={styles.optionTitle}>Settings</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color="#000" />
        </>
      </TouchableHighlight>
      <TouchableHighlight style={styles.option} onPress= {()=>navigation.navigate(' ')}underlayColor="#ffffff00">
        <>
          <View style={styles.child}>
            <FontAwesome5 name="robot" size={25} color="#000" />
            <Text style={styles.optionTitle}>Chatbot</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color="#000" />
        </>
      </TouchableHighlight>

      <TouchableHighlight style={styles.option} onPress={signOut} underlayColor="#ffffff00">
        <>
          <View style={styles.child}>
            <MaterialCommunityIcons name="logout" size={30} color="#000" style={{
              transform: [
                { scaleX: -1 }
              ]
            }} />
            <Text style={styles.optionTitle}>Logout </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} color="#000" />
        </>
      </TouchableHighlight>

    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '17%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#F86D3B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    color: '#fff',
  },
  location: {
    color: '#DCDCDC',
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  options: {
    width: '90%',
    marginTop: 20,
    backgroundColor: 'red'
  },
  option: {
    width: '90%',
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  child: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  optionTitle: {
    fontSize: 18,
    color: '#000',
  },
  info: {
    width: '62%',
    marginLeft: 10,
    marginRight: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  }
})