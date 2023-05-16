import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Runner } from '../types/Runner';
import { useAtom, useAtomValue } from 'jotai';
import { soundAtom } from '../atoms/sound';
import { userInfoAtom } from '../atoms/auth';

const useFootstepsAudio = () => {
    const [sound, setSound] = useAtom(soundAtom)
    const userInfo = useAtomValue(userInfoAtom)


    const playSound= async (nearbyRunners: Runner[]) => {
        if(nearbyRunners.length >1 && sound == null)console.log("over")
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        })
        if(nearbyRunners.length <= 1) {
            setSound(null);
            return
        }
        
        if(!sound) {
            const src = chooseAudio(nearbyRunners);
            if(src == null) return;
            const { sound } = await Audio.Sound.createAsync(src);
            setSound(sound);
            sound._onPlaybackStatusUpdate = (status) => {
                if(status.isLoaded && status.didJustFinish) {
                    setSound(null);
                }
            }
            
            // await
            await sound.playAsync();
            
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

    const chooseAudio = (nearbyRunners: Runner[]) => {
        if(!nearbyRunners.length || !userInfo) {
            return null
        }
        const me = nearbyRunners.filter(runner => runner.userId === userInfo.id)[0];
        if(!me) {  
            return null
        }

        const leftRunners = nearbyRunners.filter(runner => runner.positionH < me.positionH);
        const rightRunners = nearbyRunners.filter(runner => runner.positionH > me.positionH);

        const leftSrc = require('../../assets/audios/left_follow.mp3');
        const rightSrc = require('../../assets/audios/right_follow.mp3');
        return leftRunners.length > rightRunners.length ? leftSrc : rightSrc;
    }

    return { playSound, stopSound }
}

export default useFootstepsAudio;