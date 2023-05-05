import { Dimensions } from 'react-native'
import { Runner } from '../types/Runner';
import { runnersAtom } from '../atoms/runner';
import { useAtom } from 'jotai';
import * as Location from 'expo-location';

interface Props {
    addNewRunner: () => void
    removeRunner: () => void
}

const useRunner = (): Props => {
    const windowWidth = Dimensions.get('window').width;
    const [runners, setRunners] = useAtom(runnersAtom)

    const addNewRunner = () => {
        const randPosH = Math.floor(Math.random() * windowWidth - 50)
        const newRunner: Runner = {
            userId: 'abc',
            username: 'abc',
            imageUrl: '',
            positionH: randPosH,
            positionV: 0,
            latitude: 0, // getlocation
            longitude: 0, // getlocation
            speed: 0
        }
        // register runner event (WS)
        // setRunners([...runners, newRunner]) 
    }

    const removeRunner = () => {
        // remove runner event (WS)
        setRunners(runners.filter(runner => runner.userId !== 'abc'))
        stopUserLocation()
    }

    const stopUserLocation = async () => {
        await Location.stopLocationUpdatesAsync('watchLoc')
    }

    return { addNewRunner, removeRunner }
}

export default useRunner;