import React, { useState } from 'react'
import Router from 'next/router'
import axios from 'axios'
import * as yup from 'yup'

import styles from '../../styles/join/join.module.scss'
import ErrorMessage from './ErrorMssage'
import { delay } from '../../actions/user'
import { joinValidation } from '../../validtions'
import { Modal, Toast } from '../common/modals'

const JoinContainer = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { name, email, password, confirmPassword } = form

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
    if(password !== confirmPassword) {
      console.log('not')
    }
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    // 유효성 검사
    try {
      await joinValidation.validate({name, email, password, confirmPassword})
      // return console.log(validation)
    } catch(err) {
      console.error('Join validation error', err)
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.errors[0])
      }
      return
    }
    await Modal.fire({
      title: 'Sign up . . .',
      showConfirmButton: false,
      allowOutsideClick: () => !Modal.isLoading(),
      didOpen: async () => {
        Modal.showLoading()
        try { // 회원가입 요청
          const res = await delay(1000, {name, email})
          // const result = await axios(`${process.env.BACK_URL}/signup`)
          console.log(res)
          Modal.close()
          Toast.fire({
            icon: 'success',
            title: 'Signed up successfully'
          })
          Router.push('/')
        } catch(err) { // 회원가입 실패
          if(axios.isAxiosError(err)) {
            console.error('Sign up axios error', err.response?.data)
          }
        }
      },
    })
  }

  return (
    <div className={styles.joinContainer}>
      <h2>Join Studion</h2>
      <article>
        <div className={styles.formDiv}>
          {errorMsg && // 에러 메세지
            <ErrorMessage errorMsg={ errorMsg }/>
          }
          <form onSubmit={submitHandler}>
            {/* 이름 */}
            <label htmlFor="name">Name</label>
            <input id='name' name='name' type="text" value={name} onChange={onChange}/>

            {/* 이메일 */}
            <label htmlFor="email" className='mt-4'>Email address</label>
            <input id='email' name='email' type="email" value={email} onChange={onChange}/>

            {/* 비밀번호 */}
            <label htmlFor="password" className='mt-4'>Password</label>
            <input id='password' name='password' type="password" value={password} onChange={onChange}/>

            {/* 비밀번호 확인 */}
            <label htmlFor="confirmPassword" className='mt-4'>Confirm Password</label>
            <input id='confirmPassword' name='confirmPassword' type="password" value={confirmPassword} onChange={onChange}/>

            <button type='submit'>Create Account</button>
          </form>
        </div>

        {/* divider */}
        <div className={styles.divider}>
          <div></div>
          <span>OR</span>
          <div></div>
        </div>

        <div className={styles.socialContainer}>
          <button>트위터 회원가입　→</button>
          <button>구글 회원가입　→</button>
        </div>
      </article>
    </div>
  )
}

export default JoinContainer
