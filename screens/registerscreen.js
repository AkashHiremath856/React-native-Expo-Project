import React, { useLayoutEffect } from 'react'
import { useState } from "react";
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'
import '../screens/fixtimerbug'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


const registerscreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = React.useState(null);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        });
    }, [navigation]);

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: selectedImage.localUri
                })
            })
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });

    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50, paddingTop: 1 }}>Create a Signal account</Text>
            <View style={styles.inputcontainer}>
                <Input placeholder="Full Name" autofocus type="text" value={name}
                    onChangeText={(text) => setName(text)} />
                <Input placeholder="Email" type="email" value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" type="password" secureTextEntry value={password}
                    onChangeText={(text) => setPassword(text)} />
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={openImagePickerAsync} activeOpacity="0.5">
                    <Ionicons name="camera" style={styles.cam}
                        size={40} />
                </TouchableOpacity>
                <Text style={styles.txt}>Select Profile Picture</Text>
            </View>
            <View style={{ marginTop: 10 }} />
            <Button raised
                onPress={register} title="Register" style={styles.button}
            />
        </KeyboardAvoidingView>
    )
}

export default registerscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"
    },
    button: {
        width: 200,
        marginTop: 40,
    },
    inputcontainer: {
        width: 300
    },
    cam: {
        alignItems: "center",
    },
    txt: {
        alignItems: "center",
        marginTop: 10,
        marginLeft: 7,
    }
})
