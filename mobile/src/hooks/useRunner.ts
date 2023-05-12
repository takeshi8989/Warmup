import { Dimensions } from 'react-native'
import { socket } from '../utils/socket';
import { useAtomValue, useSetAtom } from 'jotai';
import { isSignedInAtom, userInfoAtom } from '../atoms/auth';
import { RUNNER_SIZE } from '../utils/constants';
import { Runner } from '../types/Runner';

interface Props {
    addNewRunner: () => void
    removeRunner: () => void
    getNearbyRunners: (runners: Runner[]) => Runner[]
}

const useRunner = (): Props => {
    const windowWidth = Dimensions.get('window').width;
    const userInfo = useAtomValue(userInfoAtom)
    const setIsSignedIn = useSetAtom(isSignedInAtom);


    const addNewRunner = () => {
        if(!userInfo) {
            setIsSignedIn(false)
            return
        }
        const randPosH = Math.floor(Math.random() * (windowWidth - RUNNER_SIZE * 3)) + RUNNER_SIZE
        const userId: string = userInfo.id
        socket.emit('register_runner', {userId, randPosH})
    }

    const removeRunner = () => {
        socket.emit('remove_runner')
    }

    const getNearbyRunners = (runners: Runner[]) => {
        const myRunner = runners.find(runner => runner.userId === userInfo?.id)
        if(!myRunner) return []
        const nearbyRunners = runners.filter(runner => {
            const distance = Math.abs(myRunner.positionV - runner.positionV)
            return distance <= 100 && runner.userId !== myRunner.userId
        })
        return nearbyRunners
    }

    return { addNewRunner, removeRunner, getNearbyRunners }
}

export default useRunner;