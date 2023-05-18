import { Dimensions } from 'react-native'
import { socket } from '../utils/socket';
import { useAtomValue, useSetAtom } from 'jotai';
import { isSignedInAtom, userInfoAtom } from '../atoms/auth';
import { RUNNER_SIZE } from '../utils/constants';
import { Runner } from '../types/Runner';
import { activePaceAtom, paceAtom, runnersAtom } from '../atoms/runner';

interface Props {
    addNewRunner: () => void
    removeRunner: () => void
    getNearbyRunners: (runners: Runner[]) => Runner[]
    getRunningDistanceKm: () => number
}

const useRunner = (): Props => {
    const windowWidth = Dimensions.get('window').width;
    const userInfo = useAtomValue(userInfoAtom)
    const setIsSignedIn = useSetAtom(isSignedInAtom);
    const activePace = useAtomValue(activePaceAtom);
    const pace = useAtomValue(paceAtom)
    const runners = useAtomValue(runnersAtom)


    const addNewRunner = () => {
        if(!userInfo) {
            setIsSignedIn(false)
            return
        }
        const randPosH = Math.floor(Math.random() * (windowWidth - RUNNER_SIZE * 3)) + RUNNER_SIZE
        const userId: string = userInfo.id
        if(activePace && pace) {
            addPaceMaker(randPosH);
        }
        socket.emit('register_runner', {userId, randPosH, pace: 0})
    }

    const addPaceMaker = (posH: number) => {
        if(!pace || !activePace) return
        const userId = 'paceMaker-' + userInfo?.id
        const randPosH = posH + RUNNER_SIZE / 2
        socket.emit('register_runner', {userId, randPosH, pace})
    }

    const removeRunner = () => {
        socket.emit('remove_runner')
    }

    const getNearbyRunners = (runners: Runner[]) => {
        const myRunner = runners.find(runner => runner.userId === userInfo?.id)
        if(!myRunner) return []
        const nearbyRunners = runners.filter(runner => {
            const distance = Math.abs(myRunner.positionV - runner.positionV)
            return distance <= 100
        })
        return nearbyRunners
    }

    const getRunningDistanceKm = () => {
        const myRunner = runners.find(runner => runner.userId === userInfo?.id)
        if(!myRunner) return 0
        return myRunner.positionV / 1000
    }

    return { addNewRunner, removeRunner, getNearbyRunners, getRunningDistanceKm }
}

export default useRunner;