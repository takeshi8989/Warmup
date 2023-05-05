import * as Location from 'expo-location';
import { socket } from '../utils/socket';
import getDistanceFromLatLonInKm  from '../utils/functions';
import { useState } from 'react';



interface Props {
    watchUserLocation: () => void
}

interface Position {
    latitude: number;
    longitude: number;
}

const useRunning = (): Props => {
    const [preCoords, setPreCoords] = useState<Position | null>(null);

    const watchUserLocation = async () => {
        let watchLoc = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.Highest,
                // distance: 20 for 10 seconds
                distanceInterval: 1, // development
                timeInterval: 10000
            },
            (loc) => {
                sendUserRunningStatus(loc)
            },
        );

        // automove
        // setInterval(() => {
        //     socket.emit('change_runner_position', {
        //         userId: 'abc',
        //         speed: 0,
        //         distance: 1,
        //     })
        // }, 1000);
    }


    const sendUserRunningStatus = (loc: Location.LocationObject): void => {
        let distance: number = 0;
        if(preCoords) {
            distance = getDistanceFromLatLonInKm(preCoords.latitude, preCoords.longitude, loc.coords.latitude, loc.coords.longitude)
        }
        distance = 10
        console.log(loc)
        socket.emit('change_runner_position', {
            userId: 'abc',
            speed: loc.coords.speed,
            distance,
        })
        setPreCoords({
            latitude: loc.coords.latitude, 
            longitude: loc.coords.longitude
        })
    }

    return { watchUserLocation }
}

export default useRunning;