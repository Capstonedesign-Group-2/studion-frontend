import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import * as yup from 'yup'

import styles from '../../styles/auth/auth.module.scss'
import ErrorMessage from '../common/ErrorMssage'
import { signUp } from '../../redux/actions/user'
import { joinValidation } from '../../validations'
import { Modal, Toast } from '../common/modals'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/slices'
import useTranslation from 'next-translate/useTranslation'

const JoinContainer = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation("join")
  const isSigningUp = useSelector((state: RootState) => state.user.isSigningUP)
  const signupError = useSelector((state: RootState) => state.user.signupError)
  const accessToken = useSelector((state: RootState) => state.user.accessToken)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const { name, email, password, password_confirmation } = form

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg('')

    // 유효성 검사
    try {
      await joinValidation.validate(form)
    } catch (err) {
      console.error('Join validation error', err)
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.errors[0])
      }
      return
    }
    dispatch(signUp(form))
  }

  // 회원가입 로딩
  useEffect(() => {
    if (isSigningUp) {
      Modal.fire({
        title: 'Sign up . . .',
        showConfirmButton: false,
        allowOutsideClick: () => !Modal.isLoading(),
        didOpen: async () => Modal.showLoading(),
      })
    } else {
      Modal.close()
    }
  }, [isSigningUp])

  // 회원가입 성공 / 실패
  useEffect(() => {
    if (accessToken) {
      Toast.fire({
        icon: 'success',
        title: 'Signed up successfully'
      })
      Router.push('/')
    } else if (signupError) {
      setErrorMsg(signupError)
    }
  }, [accessToken, signupError])

  return (
    <div className={styles.container}>
      <h2>{t("join_title")}</h2>
      <article>
        <div className={styles.formDiv}>
          {errorMsg && // 에러 메세지
            <ErrorMessage errorMsg={errorMsg} />
          }
          <form onSubmit={submitHandler}>
            {/* 이름 */}
            <label htmlFor="name">{t("join_name")}</label>
            <input id='name' name='name' type="text" value={name} onChange={onChange} />

            {/* 이메일 */}
            <label htmlFor="email" className='mt-4'>{t("join_email")}</label>
            <input id='email' name='email' type="email" value={email} onChange={onChange} />

            {/* 비밀번호 */}
            <label htmlFor="password" className='mt-4'>{t("join_password")}</label>
            <input id='password' name='password' type="password" value={password} onChange={onChange} />

            {/* 비밀번호 확인 */}
            <label htmlFor="password_confirmation" className='mt-4'>{t("join_password_check")}</label>
            <input id='password_confirmation' name='password_confirmation' type="password" value={password_confirmation} onChange={onChange} />

            <button type='submit'>{t("join_btn")}</button>
          </form>
        </div>

        {/* divider */}
        <div className={styles.divider}>
          <div></div>
          <span>OR</span>
          <div></div>
        </div>

        <div className={styles.socialContainer}>
          <button>{t("twitter_login")}</button>
          <button>{t("google_login")}</button>
        </div>
      </article>
    </div>
  )
}

export default JoinContainer
