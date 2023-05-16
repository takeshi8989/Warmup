import { atom } from 'jotai'
import { Audio } from 'expo-av'

export const soundAtom = atom<Audio.Sound | null>(null)