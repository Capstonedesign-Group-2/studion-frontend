import { Slider } from "@mui/material"
import Box from '@mui/material/Box'
import useTranslation from "next-translate/useTranslation"
import Router from "next/router"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import * as yup from 'yup'

import { RootState } from "../../redux/slices"
import wrapper from "../../redux/store"
import Socket from "../../socket"
import styles from '../../styles/play/play.module.scss'
import { IRoom } from "../../types"
import { createRoomValidation } from "../../validations"
import ErrorMessage from "../common/ErrorMssage"

interface Form {
  title: string
  password?: null | string
  roomInfo?: null | string
  max: number | number[]
}

const CreateForm = ({ Modal, langs }: { Modal: any, langs: any }) => {
  const userData = useSelector((state: RootState) => state.user.data)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [lock, setLock] = useState<boolean>(false)
  const [form, setForm] = useState<Form>({
    title: '',
    password: '',
    roomInfo: '',
    max: 4,
  })
  const { title, password, roomInfo } = form
  const { t } = useTranslation("play")



  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }, [form])

  const handleChange = useCallback((event: Event, newValue: number | number[]) => {
    setForm({
      ...form,
      ['max']: newValue as number
    })
  }, [form])

  const onLock = useCallback(() => {
    setLock(!lock)
    setForm({
      ...form,
      password: ''
    })
  }, [form, lock])

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    // 유효성 검사
    try {
      await createRoomValidation.validate(form)

      const createRoomData = {
        id: null,
        title: form.title,
        password: form.password,
        creater: userData?.id,
        content: form.roomInfo,
        max: form.max,
        locked: lock ? (form.password ? 1 : 0) : 0,
        users: []
      } as IRoom

      // 합주실 생성
      // const res = await http.post('/rooms/create', payload)
      // console.log(res.data)
      // const roomId = res.data.room.id
      // Router.push(`/room/${roomId}`)
      Socket.createRoom(createRoomData)

      Modal.close()
    } catch (err) {
      console.error('Join validation error', err)
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.errors[0])
      }
      return
    }
  }, [Modal, form, lock, userData?.id])

  useEffect(() => {
    // 합주실 생성 완료시 on_create_room으로 합주실 정보 들어옴
    Socket.socket.on('create_room_on', (data: IRoom) => {
      Router.push(`/room/${data.id}`)
    })
  }, [])

  return (
    <div>
      {errorMsg && // 에러 메세지
        <ErrorMessage errorMsg={errorMsg} />
      }
      <form className={styles.createForm}
        onSubmit={onSubmit}
      >
        <input type="text" name="title" placeholder={langs.create_room_name} value={title} onChange={onChange} />
        <div className="flex gap-2 items-center">
          <input className="flex-1" disabled={!lock} type="password" name="password" placeholder={langs.create_room_password} value={password as string} onChange={onChange} />
          <button className="text-2xl" type="button" onClick={onLock}>{lock ? '🔒' : '🔓'}</button>
        </div>
        <Box>
          <div className="text-gray-400">{langs.create_room_max}</div>
          <div className="flex gap-4 items-center">
            <div className="px-6 py-1 rounded border-[1px] border-gray-300">
              {form.max}
            </div>
            <div className="flex items-center w-full px-6">
              <Slider
                name='max'
                onChange={handleChange}
                value={form.max}
                valueLabelDisplay="auto"
                step={1} min={1} max={5}
                sx={{
                  color: '#206276',
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: '#206276',
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </div>
          </div>
        </Box>
        <textarea name="roomInfo" placeholder={langs.create_room_info} value={roomInfo as string} onChange={onChange} rows={5}></textarea>
        <div>
          <button className="mt-2 px-6 py-2 border border-transparent leading-5 rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150"
            type="submit"
          >{langs.create_room_btn}</button>
        </div>
      </form>
    </div>
  )
}

export default wrapper.withRedux(CreateForm)