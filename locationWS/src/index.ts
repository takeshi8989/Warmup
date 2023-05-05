import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Runner } from './types/Runner';

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const io = new Server(server, {
    cors: {
      origin: '*',
    }
});

let runners: Runner[] = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('register_runner', (data) => {
    const runner: Runner = {
      userId: data.userId,
      username: 'test',
      imageUrl: 'https://picsum.photos/200',
      positionH: data.randPosH,
      positionV: 0,
      speed: 0
    }
    runners.push(runner)
  });

  socket.on('change_runner_position', (data) => {
    changeRunnerPosition(data.userId, data.speed, data.distance)
  });

  socket.on('remove_runner', (userId) => {
    removeRunner(userId)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});


server.listen(PORT, () => {
  console.log('listening on port 3000');
});


const changeRunnerPosition = (userId: string, speed: number, distance: number) => {
  runners.forEach(runner => {
    if (runner.userId === userId) {
      runner.positionV = runner.positionV + distance
      runner.speed = speed
    }
  })
}

const removeRunner = (userId: string) => {
  runners = runners.filter(runner => runner.userId !== userId)
}

setInterval(() => {
  io.emit('send_runners', runners);
}, 1000);
