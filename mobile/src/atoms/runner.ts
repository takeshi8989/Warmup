import { atom } from "jotai";
import { Runner } from "../types/Runner";
import * as Location from 'expo-location';

export const isRunningAtom = atom<boolean>(false);
export const runnersAtom = atom<Runner[]>([]);
export const nearbyRunnersAtom = atom<Runner[]>([]);

export const watchTaskAtom = atom<Location.LocationSubscription | null>(null)

export const paceAtom = atom<number | null>(null)
export const activePaceAtom = atom<boolean>(false)

export const runStartTimeAtom = atom<Date>(new Date())