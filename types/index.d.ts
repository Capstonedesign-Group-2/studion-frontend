import { Channel } from "../components/room/player/mixer/Channel";

/**
 * redux/slice/user
 */
declare interface User {
  id: number
  name: string
  email: string
  image: string | null
  created_at: string
  updated_at: string
}

declare interface UsersState {
  accessToken: string | null
  data: User | null

  isLoggingIn: boolean
  loginError?: string | null

  isSigningUP: boolean
  signupError?: string | null

  getUserError?: string | null

  logOutError?: string | null

  refreshError?: string | null
}

/**
 * redux/action/user
 */
declare interface LoginData {
  email: string
  password: string
}

declare interface SignUpData extends LoginData {
  name: string
}

/**
 * redux/slice/room
 */
declare interface UserInRoom {
  id: number
  user_id: string
  room_id: string
  chat_room_id: string | null
  flag: string
  user: User
}

declare interface Room {
  id: number
  title: string
  password: string
  creater: number
  content: string
  max: number
  locked: string
  users: UserInRoom[]
}

declare interface RoomsState {
  roomList: Array<Room>
  getRoomListError?: null | string
  users: { id: string, name: string }[]
  isLoading: boolean
}

/**
 * pages/room/[id]
 */
declare interface DcData {
  type: string // drum, piano, ...
  key: string
  socketId: string
}

/**
 * components/room/menu/Chat*
 */
declare interface IChatItem {
  id: number
  content: string
  user: User
}