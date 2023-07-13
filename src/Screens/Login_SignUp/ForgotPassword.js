import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {Email} from '../../assets/images';
import * as yup from 'yup';
import {Formik} from 'formik';
import Button from '../../components/Button.js';
import ErrorMessage from '../../components/ErrorMessage';
const ForgotPassword = () => {
  const onSubmitValue = (values, {resetForm}) => {
    resetForm();
    console.log(values);
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
  });
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      onSubmit={onSubmitValue}
      validationSchema={validationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', height: '200%'}}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
              <View style={styles.container}>
               
                <View style={styles.container2}>
                  <Text style={{color: 'black'}}>
                    Enter your email address to receive a verification code
                  </Text>
                  <View>
                    <Image source={Email} style={styles.icon} />
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholderTextColor={'black'}
                      keyboardType="email-address"
                    />
                    <ErrorMessage
                      error={errors['email']}
                      visible={touched['email']}
                    />
                     <Pressable style={{marginTop: 40}} onPress={handleSubmit}>
                      <Button title="Get Code " />
                    </Pressable>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white', height: '100%'
    },
    container2:{marginTop: 300, marginHorizontal: 32},
  input: {
    width: 300,
    alignSelf: 'center',
    height: 49,
    fontSize: 13,
    elevation: 4,
    paddingLeft: 60,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 15,
    color: '#00437a',
  },
  icon: {
    position: 'relative',
    top: 35,
    marginLeft: 20,
    zIndex: 1,
  },
});
