import { Dispatch } from '@reduxjs/toolkit'
import io from 'socket.io-client'
import { getRoomList } from '../redux/actions/room'
import { User } from '../types'

export interface JoinData {
  name: string
  room: string
  user_id: number
}

export interface ExitData {
  token: string
  roomId: string
  userId: number
}

class Socket {
  URL: string
  socket: SocketIOClient.Socket

  constructor() {
    this.URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'
    this.socket = io(this.URL)

    console.log("[Socket] Connected:", this.URL, this.socket)
  }

  // 합주실 리스트가 업데이트 되었음을 감지 (새로운 방, 없어진 방, 인원수, ...)
  onUpdateRoomList(dispatch: Dispatch<any>) {
    this.socket.on('update_room_list_on', () => {
      console.log('[on] update room list !!')
      dispatch(getRoomList())
    })
  }

  // 합주실 리스트가 업데이트 되었음을 알림
  emitUpdateRoomList() {
    console.log('[emit] updated room list !!')
    this.socket.emit('update_room_list')
  }

  removeAllListeners() {
    this.socket.removeAllListeners()
  }

  // 합주실 입장
  joinRoom(data: JoinData) {
    this.socket.emit('join_room', data)
  }

  // 합주실 퇴장
  exitRoom() {
    this.socket.emit('exit_room')
  }

  // WebRTC Peer Connection


  // 합주실 채팅
  onNewMessage(dispatch: Dispatch<any>) {
    this.socket.on('new_message_on', (data: { user: User, content: string }) => {
      // 
    })
  }

  // 합주실 정보 업데이트 감지 (방제, 설명, 인원수, ...)
  onUpdateRoomInfo(dispatch: Dispatch<any>) {
    this.socket.on('update_room_info_on', () => {
      // 합주실 정보 불러오기
    })
  }

  // 합주실 정보 업데이트 알림
  emitUpdateRoomInfo() {
    this.socket.emit('update_room_info')
  }

  // 소켓 에러 처리
  onError() {
    this.socket.on('error', () => {
      console.log('소켓 에러')
    })
  }
}

export default new Socket()
