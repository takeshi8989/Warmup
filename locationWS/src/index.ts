import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { runners } from './utils';
import { getUserById, addRunner, removeRunner, changeRunnerPosition } from './utils';

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const io = new Server(server, {
    cors: {
      origin: '*',
    }
});

app.get('/', (req, res) => {
  res.send('Heath Check OK')
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('register_runner', async (data) => {
    const user = await getUserById(data.userId)
    if(!user) return
    addRunner(user, socket, data.randPosH)
  });

  socket.on('change_runner_position', (data) => {
    changeRunnerPosition(socket.id, data.speed, data.distance)
  });

  socket.on('remove_runner', () => {
    removeRunner(socket.id)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    removeRunner(socket.id)
  })
});


server.listen(PORT, () => {
  console.log('listening on port 3000');
});



setInterval(() => {
  io.emit('send_runners', runners);
}, 1000);
