import Router from 'next/router'
import { useCallback, useState } from 'react'
import * as yup from 'yup'

import wrapper from '../../redux/store'
import styles from '../../styles/play/play.module.scss'
import { enterRoomPassword } from '../../validations'
import ErrorMessage from '../common/ErrorMssage'
import { Modal } from '../common/modals'

const EnterForm = ({ room }: { room: Room }) => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const onEnterRoom = useCallback(async () => {
    if (room.users.length >= room.max) {
      setErrorMsg('인원이 가득 찼습니다.')
      return
    }

    // 비밀번호가 있으면 체크
    if (room.password) {
      const data = {
        room_id: room.id,
        room_password: room?.password,
        password
      }
      // 유효성 검사
      try {
        await enterRoomPassword.validate(data)
      } catch (err) {
        console.error('Join validation error', err)
        if (err instanceof yup.ValidationError) {
          setErrorMsg(err.errors[0])
        }
        return
      }
    }

    // 성공시 라우터 이동
    Router.push(`/room/${room.id}`)
    Modal.close()
  }, [password, room.id, room.password, room.max, room.users.length])

  return (
    <>
      {errorMsg && // 에러 메세지
        <ErrorMessage errorMsg={errorMsg} />
      }
      <div className={styles.showRoom}>
        <p>参加者：{room.users.length}名</p>
        <p className="flex gap-4 justify-center">
          {room.users.map(user => (
            <span key={user.id}>{user.user.name}</span>
          ))}
        </p>
        <p className="text-left break-all">
          {room.content}
        </p>
        {room.password && (
          <div className="flex flex-col items-start w-full">
            <label htmlFor="password" className="text-sm">비밀번호</label>
            <input onChange={onPassword} className="w-full" id="password" type="password" placeholder="Password" />
          </div>
        )}
        <button onClick={onEnterRoom}>入場</button>
      </div>
    </>
  )
}

export default wrapper.withRedux(EnterForm)
