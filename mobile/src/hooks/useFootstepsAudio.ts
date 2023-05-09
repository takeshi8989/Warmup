import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const useFootstepsAudio = () => {
    const [sound, setSound] = useState<Audio.Sound>();

    useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

    async function playSound() {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    
        const { sound } = await Audio.Sound.createAsync( require('../../assets/audios/footsteps_base.mp3')
        );
        setSound(sound);
    
        await sound.playAsync();
    }

    return { playSound }
}

export default useFootstepsAudio;