import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GettingStarted = ({navigation}) => {
  return (
    <View style={styles.body}>
      <View style={styles.logospace}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo1.png')}
        />
      </View>
      <View style={styles.bcontainer}>
        <View style={styles.child}>
          <Text style={styles.title}>Waste Not, Feed All</Text>
          <TouchableOpacity style={styles.btnn} onPress={() => navigation.navigate('Landing Page')}>
            <Text style={styles.txt}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 30,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 0,
  },

  bcontainer: {
    backgroundColor: '#F86D3B',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  btn: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: windowHeight * 0.09,
    width: windowWidth * 0.8,
    marginTop: 60,
    borderRadius: 50,
    justifyContent: 'center',
  },

  btnn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '70%',
    height: 60,
    borderRadius: 50,
  },

  logospace: {
    flexDirection: 'column',
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'flex-start',
    marginTop: 70,
  },
  textt: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 80,
    backgroundColor: '#F86D3B',
    width: windowWidth,
  },
  child: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontSize: 20,
    color: '#F86D3B',
  },

  header: {
    backgroundColor: '#F86D3B',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: 360,
    height: 360,
    alignSelf: 'center',
  },
  logo1: {
    width: 60,
    height: 60,
    marginLeft: 8,
  },

  bot: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '60%',
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    color: 'black',
    marginLeft: -12,
  },
  button: {
    backgroundColor: 'yellow',
  },

  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default GettingStarted;
