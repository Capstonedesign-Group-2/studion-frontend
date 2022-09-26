import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Router from 'next/router'
import { useCallback, useState } from 'react'
import * as yup from 'yup'

import wrapper from '../../redux/store'
import styles from '../../styles/play/play.module.scss'
import { IRoom } from '../../types'
import { enterRoomPassword } from '../../validations'
import ErrorMessage from '../common/ErrorMssage'
import { Modal } from '../common/modals'

const EnterForm = ({ room, langs }: { room: IRoom, langs: any }) => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { t } = useTranslation("play");
  const onPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const onEnterRoom = useCallback(async () => {
    if (room.users.length >= room.max) {
      setErrorMsg(langs.enterForm_errorMsg)
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
        <p>{`${langs.roomBox_modal_participant}${room.users.length}${langs.roomBox_modal_count}`}</p>
        <div className="flex gap-4 justify-center">
          {room.users.length !== 0 && room.users.map(user => (
            user.image
              ? <div className='relative overflow-hidden w-8 h-8 rounded-full'><Image key={user.id} src={user.image} alt="profile image" layout='fill' /></div>
              : (
                <div key={user.id} className='flex items-center justify-center rounded-full text-white text-sm bg-studion-400 w-8 h-8'>
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
              )
          ))}
        </div>
        <div className='flex flex-col items-start w-full'>
          <label htmlFor="roomInfo" className="text-sm">{langs.roomBox_modal_roomInfo}</label>
          <p id="roomInfo" className="text-left break-all w-full">
            {room.content ? room.content : langs.roomBox_modal_roomInfo_msg}
          </p>
        </div>
        {room.password && (
          <div className="flex flex-col items-start w-full">
            <label htmlFor="password" className="text-sm">{langs.roomBox_modal_password}</label>
            <input onChange={onPassword} className="w-full" id="password" type="password" placeholder={langs.roomBox_modal_password} />
          </div>
        )}
        <button onClick={onEnterRoom}>{langs.roomBox_modal_btn}</button>
      </div>
    </>
  )
}

export default wrapper.withRedux(EnterForm)
