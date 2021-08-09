import React from 'react'
import { useState } from 'react'
import { useLayoutEffect, useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { SafeAreaView, ScrollView, Linking } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import firebase from 'firebase/app';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';


const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
        return unsubscribe;
    }, [])

    const _handleOpenWithLinking = () => {
        Linking.openURL('https://signal-clone-140cd.web.app/');
    };


    const profile = () => {
        navigation.replace("Profile")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TouchableOpacity onPress={_handleOpenWithLinking}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 }}>ChatOn</Text>
                </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: "#5142f5" },
            headerTitleStyle: { color: "white", alignSelf: "center" },
            headerTintColor: "white",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={profile} activeOpacity={0.5}>
                        <Avatar rounded
                            source={{
                                uri: user.photoURL,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }} >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName
        })
    }


    return (
        <SafeAreaView>
            <LinearGradient
                colors={['#E55D87', '#5FC3E4']}
                style={styles.button}>
                <ScrollView style={{ height: '100%' }}>
                    {chats.map(({ id, data: { chatName } }) =>
                        <CustomListItem key={id} id={id} chatName={chatName}
                            enterChat={enterChat} />)}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
})
