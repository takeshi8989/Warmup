import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Runner } from '../types/Runner';
import { useAtom, useAtomValue } from 'jotai';
import { soundAtom } from '../atoms/sound';
import { userInfoAtom } from '../atoms/auth';

const useFootstepsAudio = () => {
    const [sound, setSound] = useAtom(soundAtom)
    const userInfo = useAtomValue(userInfoAtom)
    const [soundSrc, setSoundSrc] = useState<string>('base')


    const playSound= async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        })
        
        if(!sound) {
            const { sound } = await Audio.Sound.createAsync(require('../../assets/audios/footsteps_base.mp3'));
            setSound(sound);
            await sound.setVolumeAsync(0)
            await sound.playAsync();
            await sound.setIsLoopingAsync(true);
        }
    }
    

    const stopSound = async () => {
        console.log(sound)
        if(sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }
        setSound(null);
    }

    const chooseAudio = async (nearbyRunners: Runner[]) => {
        if(nearbyRunners.length <= 1|| !userInfo) {
            await sound?.setVolumeAsync(0);
            return
        }
        const me = nearbyRunners.filter(runner => runner.userId === userInfo.id)[0];
        if(!me) {  
            await sound?.setVolumeAsync(0);
            return
        }

        await sound?.setVolumeAsync(1);

        const leftRunners = nearbyRunners.filter(runner => runner.positionH < me.positionH);
        const rightRunners = nearbyRunners.filter(runner => runner.positionH > me.positionH);
        if(soundSrc == 'left' && leftRunners.length > rightRunners.length) return
        if(soundSrc == 'right' && rightRunners.length > leftRunners.length) return

        const leftSrc = require('../../assets/audios/left_follow.mp3');
        const rightSrc = require('../../assets/audios/right_follow.mp3');

        if(leftRunners.length > rightRunners.length) setSoundSrc('left')
        else setSoundSrc('right')

        
        await sound?.stopAsync();
        await sound?.unloadAsync();
        await sound?.loadAsync(leftRunners.length > rightRunners.length ? leftSrc : rightSrc);
        await sound?.playAsync();
        // await sound?.unloadAsync();
        // await sound?.loadAsync(leftSrc);
    }

    return { playSound, stopSound, chooseAudio }
}

export default useFootstepsAudio;