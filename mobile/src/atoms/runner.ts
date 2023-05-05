import { atom } from "jotai";
import { Runner } from "../types/Runner";

export const isRunningAtom = atom<boolean>(false);
export const runnersAtom = atom<Runner[]>([]);