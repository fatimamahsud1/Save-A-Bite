import * as React from 'react';
import {View, Text, ImageBackground} from 'react-native';

function Background({children}) {
  return (
    <View>
      <ImageBackground
        source={require('../assets/images/Background2.jpeg')}
        style={{
            height: '100%', width:'100%',
         }}
      />
      <View style={{position:'absolute'}}>{children}</View>
      
    </View>
  );
}
export default Background;
