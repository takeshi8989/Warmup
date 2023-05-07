import * as Location from 'expo-location';
import { socket } from '../utils/socket';
import getDistanceFromLatLonInKm  from '../utils/functions';
import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { watchTaskAtom } from '../atoms/runner';
import { userInfoAtom } from '../atoms/auth';



interface Props {
    watchUserLocation: () => void
    stopUserLocation: () => void
}

interface Position {
    latitude: number;
    longitude: number;
}

const useRunning = (): Props => {
    const [preCoords, setPreCoords] = useState<Position | null>(null);
    const [watchTask, setWatchTask] = useAtom(watchTaskAtom)
    const userInfo = useAtomValue(userInfoAtom)

    const watchUserLocation = async () => {
        let watchLoc = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.Highest,
                // distance: 20 
                distanceInterval: 1, // development
                timeInterval: 10000
            },
            (loc) => {
                sendUserRunningStatus(loc)
            },
        );
        setWatchTask(watchLoc)

        

        // automove
        setInterval(() => {
            socket.emit('change_runner_position', {
                speed: 0,
                distance: 10,
            })
        }, 1000);
    }


    const sendUserRunningStatus = (loc: Location.LocationObject): void => {
        let distance: number = 0;
        if(preCoords) {
            distance = getDistanceFromLatLonInKm(preCoords.latitude, preCoords.longitude, loc.coords.latitude, loc.coords.longitude) * 1000
        }
        socket.emit('change_runner_position', {
            speed: loc.coords.speed,
            distance,
        })
        setPreCoords({
            latitude: loc.coords.latitude, 
            longitude: loc.coords.longitude
        })
    }

    const stopUserLocation = async () => {
        if(watchTask){
            watchTask.remove()
            setWatchTask(null)
        }
    }

    return { watchUserLocation, stopUserLocation }
}

export default useRunning;