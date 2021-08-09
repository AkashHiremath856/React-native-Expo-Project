import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import loginscreen from './screens/loginscreen';
import { createStackNavigator } from '@react-navigation/stack';
import register from './screens/registerscreen';
import registerscreen from './screens/registerscreen';
import HomeScreen from './screens/HomeScreen';
import AddChat from './screens/AddChat';
import chatScreen from './screens/chatScreen';
import profileScreen from './screens/profileScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C68ED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
  stackAnimation: 'flip',
  gestureEnabled: true,
  gestureDirection: 'horizontal'
}


export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={loginscreen} />
        <Stack.Screen name='Register' component={registerscreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name="Profile" component={profileScreen} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={chatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

