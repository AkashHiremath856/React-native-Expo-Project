import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        await db
            .collection("chats")
            .add({
                chatName: input
            })
            .then(() => navigation.goBack())
            .catch((error) => alert(error))
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input} onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" size={24} color="black" />
                }
            />
            <Button onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    }
})
