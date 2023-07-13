import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorMessage from '../../components/ErrorMessage';
import React, { useContext, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import LoginContext from '../../context/Context';


const SendRequest = ({ navigation, route }) => {

  const {email, pid} = route.params;
  const [loader, setLoader] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const {userData} = useContext(LoginContext);

  useEffect(() => {
    setUserEmail(firebase.auth().currentUser.email);
  },[])



  const postData = (values) => {
    firestore()
      .collection('requests')
      .add(values)
      .then(() => {
        alert('Request sent successfully!');
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        console.log("from add data:", error);
        throw new Error("Send request failed");
      });
  }


  const onSubmitValue = (values, { resetForm }) => {
    setLoader(true)
    values.requestEmail = userEmail;
    values.postEmail = email;
    values.pid = pid;
    values.city = userData.city;
    values.personImage = userData.imageURL;
    resetForm();
    postData(values);
  };



  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('name is required'),
    reason: yup
      .string()
      .min(15, "Please enter a valid reason")
      .required('reason is required'),
  });
  return (
    <Formik
      initialValues={{ name: '', reason: '' }}
      validateOnMount={true}
      onSubmit={onSubmitValue}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }} contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.container}>
              <View style={styles.box1}>
                <View>
                  <TextInput
                    placeholder="Your Name"
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  <ErrorMessage
                    error={errors['name']}
                    visible={touched['name']}
                  />
                </View>
                <View >
                  <TextInput
                    placeholder="Enter a Valid Reason"
                    style={[styles.input, { height: 250 }]}
                    name='reason'
                    onChangeText={handleChange('reason')}
                    onBlur={handleBlur('reason')}
                    textAlignVertical={'top'}
                    value={values.reason}
                  />
                  <ErrorMessage
                    error={errors['reason']}
                    visible={touched['reason']}
                  />
                </View>

                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  {loader ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>Send Request</Text>}
                </TouchableOpacity>


              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  text1: {
    color: 'white',
    fontSize: 32,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box1: {
    backgroundColor: '#fff',
    width: '90%',
    height: '85%',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo1: {
    width: 130,
    height: 130,
    zIndex: 999,
    borderRadius: 400 / 2,
    alignSelf: 'center',
  },
  input: {
    width: 330,
    alignSelf: 'center',
    height: 70,
    fontSize: 13,
    elevation: 4,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    color: '#00437a',
    marginTop: 20,
  },
  text2: {
    alignSelf: 'flex-end', marginRight: 20, marginTop: 5
  },
  text3: {
    marginBottom: -50, marginTop: 20
  },
  text4: {
    color: '#F86D3B', fontWeight: 'bold'
  },
  btn: {
    width: 250,
    height: 50,
    backgroundColor: '#F86D3B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  }
});

export default SendRequest;