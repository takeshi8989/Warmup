import { io } from 'socket.io-client';
import { WS_SERVER_URL } from '@env';

const PORT: string = '3000'
const LOCALHOST = 'http://localhost:' + PORT

export const socket = io(
    LOCALHOST, {
        autoConnect: true
    }
);