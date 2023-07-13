import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';
import React from 'react';
import {Bg as background} from '../../assets/images';
const LandingPage = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <Image
        source={background}
        resizeMode="cover"
        style={styles.image}>
          
        </Image>
      <View style={{marginTop: 150}}>
        <Text style={styles.text1}>
          Revolutionizing the Fight Against Food Waste and Enabling Communities
          to Thrive!
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Login")}>
          <Text style={styles.text2}>LogIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={()=> navigation.navigate("SignUp")}>
          <Text style={styles.text2}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  image: {
    width: 300,
    alignSelf: 'center',
    height: 300,
  },
  text1:{
    textAlign: 'center', color:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F86D3B',
    padding: 13,
    width: 250,
    marginTop:30,
    borderRadius:10,
    alignSelf:'center'
  },
  button2: {
    alignItems: 'center',
    padding: 13,
    width: 250,
    borderColor:'#F86D3B',
    borderWidth:1,
    marginTop:10,
    borderRadius:10,
    alignSelf:'center'
  },
  text2:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }
});
