import axios from 'axios'
import { Runner } from './types/Runner'
import { User } from './types/User'
import { Socket } from 'socket.io'

export let runners: Runner[] = [];
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


export const getUserById = async (userId: string) => {
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

export const addRunner = (user: User, socket: Socket, randPosH: number) => {
    const runner: Runner = {
        userId: user.oauth_id,
        socketId: socket.id,
        username: user.name,
        picture: user.picture,
        positionH: randPosH,
        positionV: 0,
        speed: 0
      }
      runners.push(runner)
}

export const removeRunner = (socketId: string) => {
    runners = runners.filter(runner => runner.socketId !== socketId)
}

export const changeRunnerPosition = (socketId: string, speed: number, distance: number) => {
    runners.forEach(runner => {
        if (runner.socketId === socketId) {
        runner.positionV = runner.positionV + distance
        runner.speed = speed
        }
    })
}
  