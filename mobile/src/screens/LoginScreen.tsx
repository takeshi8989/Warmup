import React, { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { isSignedInAtom, userInfoAtom } from '../atoms/auth';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { EXPO_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';



WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    const setIsSignedIn = useSetAtom(isSignedInAtom);
    const setUserInfo = useSetAtom(userInfoAtom);
    const [token, setToken] = useState("");
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID
    });

    useEffect(() => {
        if (response?.type === "success" && response.authentication) {
          setToken(response.authentication.accessToken); 
        }
        getUserInfo();
      }, [response, token]);
      
      const getUserInfo = async () => {
        if(token.length <= 0) return;
        try {
          const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const user = await response.json();
          setUserInfo(user);
          setIsSignedIn(true);
        } catch (error: any) {
            setIsSignedIn(false)
            console.log(error.message);
        }
      };

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button
                title="Sign in with Google"
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            />
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
});

export default LoginScreen