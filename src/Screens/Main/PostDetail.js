import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, TouchableHighlight, BackHandler, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import MapsModal from '../../components/MapsModal';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';


const PostDetail = ({ route }) => {

    const navigation = useNavigation();

    const [user, setUser] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [presentLocation, setPresentLocation] = useState("");


    const { pid, image, description, location, title, email, contact, coordinates } = route.params;

    const getData = async () => {
        try {
            await firestore().collection('users').where("email", "==", email).get()
                .then((querySnapshot) => {
                    let id = querySnapshot.docs[0].id;
                    let obj = querySnapshot.docs[0].data();
                    // console.log(obj)
                    setUser({ id, ...obj });
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        } catch (error) {
            alert("Error getting profile data");
            console.log("Error from account", error);
        }
    }


    const currentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setPresentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }


    const handleBackPress = () => {
        navigation.goBack();
        return true;
    }

    useEffect(() => {
        console.log(user)
        currentLocation();
        getData();
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        }
    }, [])

    return (
        <View style={styles.container}>
            <SharedElement id={'image' + pid} style={styles.image} >
                <Image source={{ uri: image }} style={[styles.image, { height: '100%' }]} resizeMode='cover' />
            </SharedElement>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1} >{title}</Text>
                <Text style={styles.description} numberOfLines={4} >{description}</Text>
                <View style={styles.locationParent}>
                    <Ionicons name="location-sharp" size={25} color="#000" />
                    <Text style={styles.location} numberOfLines={2} >Location: {location}</Text>
                </View>
                <TouchableOpacity style={styles.poster} onPress={() => navigation.navigate("Chat", { id: user.id })}>
                    {user ?
                        <>
                            <Image source={{ uri: user.imageURL }} style={styles.userImage} />
                            <View style={{ marginHorizontal: 7 }}>
                                <Text style={styles.name}>{user.fname + " " + user.lname}</Text>
                                <Text numberOfLines={1} style={styles.address}>{user.address + ", " + user.city}</Text>
                            </View>
                            <FontAwesome name="send" size={20} color="#000" />
                        </>
                        : <ActivityIndicator size={'small'} color={'#000'} />
                    }
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity style={styles.mapContainer} onPress={() => setModalVisible(true)}>
                        <Ionicons name="location-sharp" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 3 }}>Show location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mapContainer} onPress={() => navigation.navigate('Send Request', { email, pid })}>
                        <Ionicons name="send-sharp" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 3 }}>Send Request</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contact}>
                    <MaterialIcons name="call" size={25} color="#F86D3B" />
                    <View style={styles.call}>
                        <Text>You can also call at </Text>
                        <Text>{contact.replace(0, "+92 ")}</Text>
                    </View>
                </View>
            </View>
            {presentLocation ? <MapsModal modalVisible={modalVisible} setModalVisible={setModalVisible} PolyCoordinates={coordinates} presentLocation={presentLocation} /> : ""}
        </View>
    )
}

export default PostDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '50%',
    },
    info: {
        width: '100%',
        height: '50%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 30,
        paddingVertical: 10,
        zIndex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#000",
        marginBottom: 7,
    },
    description: {
        fontSize: 12,
        marginBottom: 10,
    },
    locationParent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    location: {
        fontSize: 14,
        color: '#000',
        marginLeft: 4,
    },
    poster: {
        width: '100%',
        height: 50,
        backgroundColor: '#C8C8C8',
        borderRadius: 10,
        marginTop: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    mapContainer: {
        width: '48%',
        height: 40,
        backgroundColor: '#F86D3B',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    call: {
        marginLeft: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    userImage: {
        height: 38,
        width: 38,
        borderRadius: 19,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    address: {
        fontSize: 12,
        color: '#808080',
    },
    requestContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#F86D3B',
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    requestText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
})