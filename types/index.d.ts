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
  socket: SocketIOClient.Socket | null,
  roomList: Array<Room>
  getRoomListError?: null | string
}

/**
 * pages/room/[id]
 */
declare interface WebRTCUser {
  id: string;
  name: string;
  stream: MediaStream;
}