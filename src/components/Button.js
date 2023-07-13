import {Text, Pressable, StyleSheet, View, TouchableHighlight} from 'react-native';
import React from 'react';
const Button = props => {
  return (
   
    <View style={styles.press} underlayColor="#ffffff00">
      <Text style={styles.text1}>{props.title}</Text>
    </View>
  
  );
};
const styles = StyleSheet.create({
  press: {
    backgroundColor: '#F86D3B',
    width: 150,
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Button;