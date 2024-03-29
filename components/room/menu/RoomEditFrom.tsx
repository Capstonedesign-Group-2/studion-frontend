import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import * as yup from 'yup'
import { Box } from "@mui/system"
import { Slider } from "@mui/material"

import { RootState } from "../../../redux/slices"
import wrapper from "../../../redux/store"
import { createRoomValidation } from "../../../validations"
import ErrorMessage from "../../common/ErrorMssage"
import { Modal } from "../../common/modals"
import styles from "../../../styles/play/play.module.scss"
import { IRoom, IUser } from "../../../types"
import Socket from "../../../socket"

const RoomEditForm = ({langs}: {langs: any}) => {
  const userData = useSelector<RootState, IUser>(state => state.user.data)
  const roomData = useSelector<RootState, IRoom>(state => state.room.roomData)
  const [errorMsg, setErrorMsg] = useState('')
  const [lock, setLock] = useState(roomData?.locked === 0 ? false : true)
  const [form, setForm] = useState({
    title: roomData?.title,
    password: roomData?.password,
    roomInfo: roomData?.content,
    max: roomData?.max,
  })
  const { title, password, roomInfo } = form

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

    if (!roomData || !userData) return

    // 유효성 검사
    try {
      await createRoomValidation.validate(form)

      const payload = {
        id: roomData.id,
        title: form.title,
        creater: roomData.creater,
        content: form.roomInfo,
        max: form.max,
        locked: lock ? (form.password ? 1 : 0) : 0,
        password: form.password
      } as IRoom

      console.log(payload)
      Socket.emitUpdateRoomInfo(payload)

      Modal.close()
    } catch (err) {
      console.error('Join validation error', err)
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.errors[0])
      }
      return
    }
  }, [form, lock, userData.id])

  return (
    <div>
      {errorMsg && // 에러 메세지
        <ErrorMessage errorMsg={errorMsg} />
      }
      <form className={styles.createForm}
        onSubmit={onSubmit}
      >
        <input type="text" name="title" placeholder={langs.room_info_edit_name} value={title} onChange={onChange} />
        <div className="flex gap-2 items-center">
          <input className="flex-1" disabled={!lock} type="password" name="password" placeholder={langs.room_info_edit_password} value={password as string} onChange={onChange} />
          <button className="text-2xl" type="button" onClick={onLock}>{lock ? '🔒' : '🔓'}</button>
        </div>
        <Box>
          <div className="text-gray-400">{langs.room_info_edit_max}</div>
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
        <textarea name="roomInfo" placeholder={langs.room_info_edit_roomInfo} value={roomInfo as string} onChange={onChange} rows={5}></textarea>
        <div>
          <button className="mt-2 px-6 py-2 border border-transparent leading-5 rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150"
            type="submit"
          >{langs.room_info_edit_btn}</button>
        </div>
      </form>
    </div>
  )
}

export default wrapper.withRedux(RoomEditForm)
