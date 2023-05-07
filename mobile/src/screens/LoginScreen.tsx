import React, { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { isSignedInAtom, userInfoAtom, authAtom, requireTokenRereshAtom } from '../atoms/auth';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID, CLIENT_SECRET } from '@env';
import * as AuthSession from 'expo-auth-session';
import { Image } from 'react-native';
import useAuthentication from '../hooks/useAuthentication';


WebBrowser.maybeCompleteAuthSession();


const LoginScreen = () => {
    const setIsSignedIn = useSetAtom(isSignedInAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [auth, setAuth] = useAtom(authAtom);
    const [requireRefresh, setRequireRefresh] = useAtom(requireTokenRereshAtom);

    const { userSignIn, getUserData, refreshToken, logout } = useAuthentication();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        responseType: 'code',
        extraParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
    });

    useEffect(() => {
        if (response?.type === "success" && response.authentication) {
          setAuth(response.authentication)
          const persistAuth = async () => {
            await AsyncStorage.setItem("auth", JSON.stringify(response.authentication));
          }
          persistAuth();
        }
    }, [response]);

    useEffect(() => {
      const getPersistedAuth = async () => {
        const jsonValue = await AsyncStorage.getItem("auth");
        if (jsonValue != null) {
          const authFromJson = JSON.parse(jsonValue);
          setAuth(authFromJson);

          const isFreshToken: boolean = AuthSession.TokenResponse.isTokenFresh({
            expiresIn: authFromJson.expiresIn,
            issuedAt: authFromJson.issuedAt
          })
          setRequireRefresh(!isFreshToken);
          setIsSignedIn(isFreshToken);
        }
      };
      getPersistedAuth();
      
    }, []);

    useEffect(() => {
      if (auth) {
        const processAuth = async () => {
          const userid = await getUserData(auth.accessToken);
          userSignIn(userid)
        }
        processAuth();
      }
    }, [auth]);

    const showUserData = () => {
      if (userInfo) {
        return (
          <View style={styles.userInfo}>
            <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
            <Text>Welcome {userInfo.name}</Text>
            <Text>{userInfo.email}</Text>
          </View>
        );
      }
    };

    if (requireRefresh) {
      return (
        <View style={styles.container}>
          <Text>Token requires refresh...</Text>
          <Button title="Refresh Token" onPress={refreshToken} />
        </View>
      )
    }

    return (
        <View style={styles.container}>
            {showUserData()}
            <Button
                title={"Sign in with Google"}
                disabled={!request}
                onPress={() => promptAsync()}
            />
            {auth && <Button title="Logout" onPress={logout} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profilePic: {
      width: 50,
      height: 50
    },
    userInfo: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});

export default LoginScreen