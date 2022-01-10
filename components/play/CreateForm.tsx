import Router from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"
import * as yup from 'yup'
import http from "../../http"
import { RootState } from "../../redux/slices"
import wrapper from "../../redux/store"

import styles from '../../styles/play/play.module.scss'
import { createRoomValidation } from "../../validations"
import ErrorMessage from "../common/ErrorMssage"

const CreateForm = ({ Modal }: { Modal: any }) => {
  const userData = useSelector((state: RootState) => state.user.data)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    title: '',
    password: '',
    roomInfo: ''
  })
  const { title, password, roomInfo } = form

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    // 유효성 검사
    try {
      Modal.showLoading()
      await createRoomValidation.validate(form)

      const payload = {
        title: form.title,
        creater: userData?.id,
        content: form.roomInfo,
        max: 4,
        locked: form.password ? 1 : 0,
      }

      const res = await http.post('/rooms/create', payload)
      console.log(res.data)
      const roomId = res.data.room.id
      Router.push(`/room/${roomId}`)

      Modal.close()
    } catch(err) {
      console.error('Join validation error', err)
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.errors[0])
      }
      return
    }
  }

  return (
    <div>
      {errorMsg && // 에러 메세지
        <ErrorMessage errorMsg={ errorMsg }/>
      }
      <form className={styles.createForm}
        onSubmit={onSubmit}
      >
        <input type="text" name="title" placeholder="Room Name" value={title} onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange}/>
        <textarea name="roomInfo" placeholder="Room Info" value={roomInfo} onChange={onChange} rows={5}></textarea>
        <div>
          <button className="mt-2 px-4 py-2 border border-transparent leading-5 rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150"
            type="submit"
          >Create</button>
        </div>
      </form>
    </div>
  )
}

export default wrapper.withRedux(CreateForm)