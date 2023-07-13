import { ActivityIndicator, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';



const ImageModal = ({ modalVisible, setModalVisible, setImage, setLoader, image }) => {


    // const [imageU, setImageU] = useState(null);

    const TakePhotoFromCamera = () => {
        // setLoader(true)
        try {
            ImagePicker.openCamera({
                width: 400,
                height: 300,
                cropping: true,
                compressImageQuality: 0.7,
            }).then(imageG => {
                setImage(imageG)
                setModalVisible(!modalVisible)
                // uploadImage(imageG);
            });
        } catch (error) {
            alert("Error uploading image")
            console.log("Error from TakePhotoFromCamera", error);
        }
    }

    const ChoosePhotoFromGallery = () => {
        // setLoader(true)
        try {
            ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                compressImageQuality: 0.7,
                mediaType: 'photo',
            }).then(imageG => {
                setModalVisible(!modalVisible)
                setImage(imageG)
                // uploadImage(imageG);
            });
        } catch (error) {
            alert("Error uploading image")
            console.log("Error from ChoosePhotoFromGallery", error)
        }
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modal}>
                <View style={styles.modalView}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons
                            onPress={() => { setModalVisible(!modalVisible) }}
                            name="close"
                            size={30}
                            color="#000"
                            style={{ marginTop: 10 }}
                        />
                    </View>
                    <TouchableHighlight style={{ marginTop: 15 }} onPress={TakePhotoFromCamera} underlayColor="#ffffff00">
                        <Text style={styles.btn}>Open camera</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{ marginTop: 15 }} onPress={ChoosePhotoFromGallery} underlayColor="#ffffff00">
                        <Text style={styles.btn}>Choose Image</Text>
                    </TouchableHighlight>

                </View>
            </View>

        </Modal>)
}

export default ImageModal

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: '70%',
        height: '30%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        // alignItems: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    btn: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#F86D3B',
        textAlign: 'center',
        padding: 10,
        borderRadius: 20,
    },
})