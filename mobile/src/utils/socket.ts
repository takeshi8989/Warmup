import { io } from 'socket.io-client';
const ECS_IP: string = '34.221.207.243'
const PORT: string = '3000'
const LOCAL = 'localhost'
const URL: string = 'http://' + LOCAL +':' + PORT;

export const socket = io(
    URL, {
        autoConnect: true
    }
);