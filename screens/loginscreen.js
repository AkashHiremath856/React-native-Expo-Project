import React, { useEffect } from 'react'
import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from "../firebase"

const loginscreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        navigation.setOptions({
            headerTitleStyle: { alignSelf: "center" },
        })
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        })

        return unsubscribe;

    }, [])

    const toast = 'Welcome Back!'

    const welcome = () => {
        ToastAndroid.showWithGravity(
            toast,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    }

    const signin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(welcome)
            .catch((error) => alert(error))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri:
                    "https://img.icons8.com/color/720/000000/signal-app.png",
            }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signin}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signin} title="Login" />
            <Button containerStyle={styles.button} type="outline" title="Sign up"
                onPress={() => navigation.navigate("Register")} />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default loginscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    },
})
