import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity, Linking } from 'react-native'
import { auth, db } from '../firebase'
import firebase from 'firebase/app';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { ImagePicker } from 'expo-image-picker'

const profileScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Profile",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 20 }} >
                    <AntDesign name="arrowleft" size={24} color="white" onPress={home} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity>
                    <AntDesign name="infocirlceo" size={24} style={{ color: 'white', paddingRight: 20 }} onPress={About} />
                </TouchableOpacity>
            )
        })
    }, [])

    const user = firebase.auth().currentUser;

    const handleCancel = () => {
        setVisible(false);
    }

    const About = () => {
        setVisible(true);
    }

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')

        });
        ToastAndroid.showWithGravityAndOffset(
            'Logging out',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50)
    }

    const edit = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Feature will be availabe soon',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50)
    }

    const home = () => {
        navigation.replace('Home')
    }

    const gmail = () => {
        Linking.openURL("mailto:akash.hiremath25@gmail.com?subject=#Queries report")
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
        <SafeAreaView style={styles.container}>
            <View>
                <Dialog.Container visible={visible} >
                    <Dialog.Title style={{ textAlign: 'center' }}>About</Dialog.Title>
                    <Dialog.Description style={{ textAlign: 'center', justifyContent: 'center' }}>
                        This app is developed by{"\n"}
                        Akash Hiremath.
                    </Dialog.Description>
                    <Dialog.Button label=" Ok " onPress={handleCancel} />
                    <Dialog.Button label="Report" onPress={gmail} />
                </Dialog.Container>
            </View>
            <Image
                source={{
                    uri: user.photoURL,
                }}
                style={styles.stretch}
            />
            <TouchableOpacity onPress={edit}>
                <AntDesign name="edit" size={20} style={{ paddingLeft: 280, color: 'white' }} />
            </TouchableOpacity>
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 200 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 80, textAlign: 'center' }}>User Name</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <View style={{ paddingTop: 20, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 30 }}>{user.displayName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 80, textAlign: 'center' }}>User Email</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <View style={{ paddingTop: 20, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 30 }}>{user.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 40 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <Button style={styles.btn} type="outline" title="Sign out"
                        onPress={signOutUser} />
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default profileScreen

const styles = StyleSheet.create({
    stretch: {
        width: 400,
        height: 200,
        position: 'absolute',
        borderColor: '#000000',
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    btn: {
        paddingTop: 30
    }

})
