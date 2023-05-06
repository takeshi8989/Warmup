import { atom } from 'jotai';
import { User } from '../types/User';
import * as AuthSession from 'expo-auth-session';

export const isSignedInAtom = atom<boolean>(false);
export const authAtom = atom<AuthSession.TokenResponse | null>(null);
export const userInfoAtom = atom<User | null>(null);

export const requireTokenRereshAtom = atom<boolean>(false);