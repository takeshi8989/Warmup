import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { isSignedInAtom } from './src/atoms/auth';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { socket } from './src/utils/socket'
import * as Location from 'expo-location';

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const askForLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
  }

  useEffect(() => {
    askForLocationPermission()
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        {isSignedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
