import { useAtom, useSetAtom } from 'jotai';
import { isSignedInAtom, userInfoAtom, authAtom, requireTokenRereshAtom } from '../atoms/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_CLIENT_ID, CLIENT_SECRET } from '@env';
import * as AuthSession from 'expo-auth-session';

interface Props {
    getUserData: () => void
    refreshToken: () => void
    logout: () => void
}

const useAuthentication = (): Props => {
    const setIsSignedIn = useSetAtom(isSignedInAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [auth, setAuth] = useAtom(authAtom);
    const [requireRefresh, setRequireRefresh] = useAtom(requireTokenRereshAtom);

    const getUserData = async () => {
        try{
          const userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${auth?.accessToken}` }
          });
  
          const user = await userInfoResponse.json();
          setUserInfo(user);
        } catch (error: any) {
          setIsSignedIn(false)
          console.log(error.message);
        }
    };

    const refreshToken = async () => {
        try {
          const tokenResult = await AuthSession.refreshAsync({
            clientId: EXPO_CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: auth?.refreshToken
          }, {
            tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
          });
        
          tokenResult.refreshToken = auth?.refreshToken;
          setAuth(tokenResult);
          await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
          setRequireRefresh(false);
          setIsSignedIn(true);
  
        } catch (error: any) {
          console.log(error.message);
        }
    };


    const logout = async () => {
        try {
            await AuthSession.revokeAsync({
            token: auth?.accessToken || "",
            }, {
            revocationEndpoint: "https://oauth2.googleapis.com/revoke"
            });

            setAuth(null);
            setUserInfo(null);
            await AsyncStorage.removeItem("auth");
            setIsSignedIn(false);

        } catch (error: any) {
            console.log(error.message);
        }
    };

    return { getUserData, refreshToken, logout }
}

export default useAuthentication