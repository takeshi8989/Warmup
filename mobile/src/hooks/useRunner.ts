import { Dimensions } from 'react-native'
import { socket } from '../utils/socket';
import { useAtomValue } from 'jotai';
import { userInfoAtom } from '../atoms/auth';
import { RUNNER_SIZE } from '../utils/constants';

interface Props {
    addNewRunner: () => void
    removeRunner: () => void
}

const useRunner = (): Props => {
    const windowWidth = Dimensions.get('window').width;
    const userInfo = useAtomValue(userInfoAtom)
    

    const addNewRunner = () => {
        if(!userInfo) return
        const randPosH = Math.floor(Math.random() * (windowWidth - RUNNER_SIZE * 3)) + RUNNER_SIZE
        const userId: string = userInfo.id
        socket.emit('register_runner', {userId, randPosH})
    }

    const removeRunner = () => {
        socket.emit('remove_runner')
    }

    return { addNewRunner, removeRunner }
}

export default useRunner;