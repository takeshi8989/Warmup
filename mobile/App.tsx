import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { isSignedInAtom } from './src/atoms/auth';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SettingScreen from './src/screens/SettingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { socket } from './src/utils/socket'
import * as Location from 'expo-location';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

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
      <Tab.Navigator
      initialRouteName='Setting'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      }}>
        {isSignedIn ? (
          <>
            <Tab.Screen name="Run" component={HomeScreen} options={tabOptions.home} />
            <Tab.Screen name="Setting" component={SettingScreen} options={tabOptions.setting} />
          </>
        ) : (
          <Tab.Screen name="Login" component={LoginScreen} options={tabOptions.login} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  )
}


const tabOptions = {
  home: {
    tabBarLabel: 'Run',
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <MaterialCommunityIcons name="run" color={color} size={size} />
    ),
  },
  setting: {
    tabBarLabel: 'Setting',
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="settings-sharp" size={size} color={color} />
    ),
  },
  login: {
    tabBarLabel: 'Login',
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="log-in-outline" size={size} color={color} />
    ),
  }
}