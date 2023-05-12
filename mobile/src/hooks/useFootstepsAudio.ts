import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Runner } from '../types/Runner';

const useFootstepsAudio = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);


    const playSound= async (nearbyRunners: Runner[]) => {
        await Audio.setAudioModeAsync({playsInSilentModeIOS: true})
        if(!nearbyRunners.length) {
            setSound(null);
            return
        }
        
        if(!sound) {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/audios/footsteps_base.mp3')
            );
            setSound(sound);
            sound._onPlaybackStatusUpdate = (status) => {
                if(status.isLoaded && status.didJustFinish) {
                    setSound(null);
                }
            }
            await sound.playAsync();
        }
    }
    

    const stopSound = async () => {
        if(sound) {
            setSound(null);
        }
    }

    return { playSound, stopSound }
}

export default useFootstepsAudio;