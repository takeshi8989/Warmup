import * as Location from 'expo-location';



interface Props {
    watchUserLocation: () => void
}

const useRunning = (): Props => {

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
    }


    const sendUserRunningStatus = (loc: Location.LocationObject): void => {
        // send userid and location to server
    }

    return { watchUserLocation }
}

export default useRunning;