import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import * as yup from 'yup'
import { Box } from "@mui/system"
import { Slider } from "@mui/material"

import http from "../../../http"
import { RootState } from "../../../redux/slices"
import wrapper from "../../../redux/store"
import { createRoomValidation } from "../../../validations"
import ErrorMessage from "../../common/ErrorMssage"
import { Modal } from "../../common/modals"
import styles from "../../../styles/play/play.module.scss"

const RoomEditForm = () => {
  const userData = useSelector((state: RootState) => state.user.data)
  const [errorMsg, setErrorMsg] = useState('')
  const [lock, setLock] = useState(false)
  const [form, setForm] = useState({
    title: '',
    password: '',
    roomInfo: '',
    max: 4,
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
  },[form])

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    // 유효성 검사
    try {
      await createRoomValidation.validate(form)

      const payload = {
        title: form.title,
        creater: userData?.id,
        content: form.roomInfo,
        max: form.max,
        locked: lock ? (form.password ? 1 : 0) : 0,
        password: form.password
      }

      const res = await http.post('/rooms/create', payload)
      console.log(res.data)

      Modal.close()
    } catch(err) {
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
        <ErrorMessage errorMsg={ errorMsg }/>
      }
      <form className={styles.createForm}
        onSubmit={onSubmit}
      >
        <input type="text" name="title" placeholder="Room Name" value={title} onChange={onChange}/>
        <div className="flex gap-2">
          <input className="flex-1" disabled={!lock} type="password" name="password" placeholder="Password" value={password} onChange={onChange}/>
          <button style={{color: `${lock ? '#206276' : ''}`}} type="button" onClick={() => setLock(!lock)}>Lock</button>
        </div>
        <Box className="px-6">
          <span>Max user {form.max}</span>
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
        </Box>
        <textarea name="roomInfo" placeholder="Room Info" value={roomInfo} onChange={onChange} rows={5}></textarea>
        <div>
          <button className="mt-2 px-4 py-2 border border-transparent leading-5 rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150"
            type="submit"
          >Save</button>
        </div>
      </form>
    </div>
  )
}

export default wrapper.withRedux(RoomEditForm)