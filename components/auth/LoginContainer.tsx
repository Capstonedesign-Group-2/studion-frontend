import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import * as yup from 'yup'

import styles from '../../styles/auth/auth.module.scss'
import ErrorMessage from '../common/ErrorMssage'
import { logIn } from '../../redux/actions/user'
import { loginValidation } from '../../validations'
import { Modal, Toast } from '../common/modals'
import { RootState } from '../../redux/slices'
import useTranslation from 'next-translate/useTranslation'

const LoginContainer = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation("login")
  const isLoggingIn = useSelector((state: RootState) => state.user.isLoggingIn)
  const accessToken = useSelector((state: RootState) => state.user.accessToken)
  const loginError = useSelector((state: RootState) => state.user.loginError)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const { email, password } = form

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
      await loginValidation.validate(form)
    } catch (err) {
      console.error('Join validation error', err)
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.errors[0])
      }
      return
    }
    dispatch(logIn(form))
  }

  // 로그인 로딩
  useEffect(() => {
    if (isLoggingIn) {
      Modal.fire({
        title: 'Log in . . .',
        showConfirmButton: false,
        allowOutsideClick: () => !Modal.isLoading(),
        backdrop: true,
        didOpen: () => Modal.showLoading(),
      })
    } else {
      Modal.close()
    }
  }, [isLoggingIn])

  // 로그인 성공 / 실패
  useEffect(() => {
    if (accessToken) {
      Toast.fire({
        icon: 'success',
        title: 'Logged in successfully'
      })
      Router.push('/')
    } else if (loginError) {
      setErrorMsg(loginError)
    }
  }, [accessToken, loginError])

  return (
    <div className={styles.container}>
      <h2>{t("login")}</h2>
      <article>
        <div className={styles.formDiv}>
          {errorMsg && // 에러 메세지
            <ErrorMessage errorMsg={errorMsg} />
          }
          <form onSubmit={submitHandler}>
            {/* 이메일 */}
            <label htmlFor="email" className='mt-4'>{t("email")}</label>
            <input id='email' name='email' type="email" value={email} onChange={onChange} />

            {/* 비밀번호 */}
            <label htmlFor="password" className='mt-4'>{t("password")}</label>
            <input id='password' name='password' type="password" value={password} onChange={onChange} />

            <button type='submit'>{t("login_btn")}</button>
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

export default LoginContainer
