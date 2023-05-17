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
  positionH: 300,
  positionV: 300,
  speed: 0
}

let r2: Runner = {
  userId: 'usei2',
  socketId: 'fadfalk',
  username: 'testefsr',
  picture: '',
  positionH: 100,
  positionV: 700,
  speed: 0
}

runners.push(r)
runners.push(r2)

export const findUser = async (id: string): Promise<User> => {
  if(!id.includes('paceMaker')) 
    return await getUserById(id)

  const user: User = {
    id: id,
    oauth_id: id,
    name: 'Pace Maker',
    email: '',
    picture: ''
  }
  return user
}


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

export const addRunner = (user: User, socket: Socket, randPosH: number, pace: number) => {
    const runner: Runner = {
        userId: user.oauth_id,
        socketId: socket.id,
        username: user.name,
        picture: user.picture,
        positionH: randPosH,
        positionV: 0,
        speed: pace == 0 ? 0 : 1000 / (pace * 60)
      }
      runners.push(runner)
}

export const removeRunner = (socketId: string) => {
    runners = runners.filter(runner => runner.socketId !== socketId)
}

export const changeRunnerPosition = (socketId: string, speed: number, distance: number) => {
    runners.forEach(runner => {
        if (runner.socketId === socketId && !runner.userId.includes('paceMaker')) {
          runner.positionV = runner.positionV + distance
          runner.speed = speed
        }
    })
}
  
export const movePaceMakers = () => {
    runners = runners.map(runner => {
        if (runner.userId.includes('paceMaker')) {
          return {...runner, positionV: runner.positionV + runner.speed}
        } else{
          return runner
        }
    })
}