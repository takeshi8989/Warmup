import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Runner } from './types/Runner';
import axios from 'axios';

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const io = new Server(server, {
    cors: {
      origin: '*',
    }
});

let runners: Runner[] = [];
let r: Runner = {
  userId: 'usei',
  socketId: 'fad',
  username: 'tester',
  picture: '',
  positionH: 200,
  positionV: 300,
  speed: 0
}

let r2: Runner = {
  userId: 'usei2',
  socketId: 'fadfalk',
  username: 'testefsr',
  picture: '',
  positionH: 170,
  positionV: 700,
  speed: 0
}

runners.push(r)
runners.push(r2)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('register_runner', async (data) => {
    const user = await getUserById(data.userId)
    if(!user) return
    const runner: Runner = {
      userId: user.oauth_id,
      socketId: socket.id,
      username: user.name,
      picture: user.picture,
      positionH: data.randPosH,
      positionV: 0,
      speed: 0
    }
    runners.push(runner)
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


const changeRunnerPosition = (socketId: string, speed: number, distance: number) => {
  runners.forEach(runner => {
    if (runner.socketId === socketId) {
      runner.positionV = runner.positionV + distance
      runner.speed = speed
    }
  })
}

const removeRunner = (socketId: string) => {
  runners = runners.filter(runner => runner.socketId !== socketId)
}

const getUserById = async (userId: string) => {
  try {
    const res = await axios.get(`https://wmfjfnvldl.execute-api.us-west-2.amazonaws.com/test/users/${userId}`)
    if(res.status === 200) {
      return res.data
    } else {
      return null
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

setInterval(() => {
  io.emit('send_runners', runners);
}, 1000);
