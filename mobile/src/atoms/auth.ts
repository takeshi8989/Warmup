import { atom } from 'jotai';

export const isSignedInAtom = atom<boolean>(false);
export const userInfoAtom = atom(null);