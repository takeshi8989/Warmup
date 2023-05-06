import { Dimensions } from 'react-native'
import { socket } from '../utils/socket';

interface Props {
    addNewRunner: () => void
    removeRunner: () => void
}

const useRunner = (): Props => {
    const windowWidth = Dimensions.get('window').width;
    

    const addNewRunner = () => {
        const randPosH = Math.floor(Math.random() * windowWidth - 50)
        const userId: string = 'abc'
        socket.emit('register_runner', {userId, randPosH})
    }

    const removeRunner = () => {
        const userId: string = 'abc'
        socket.emit('remove_runner', userId)
    }

    return { addNewRunner, removeRunner }
}

export default useRunner;