import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import { useState } from "react"
import { useSelector } from "react-redux"
import * as yup from 'yup'
import http from "../../http"

import { RootState } from "../../redux/slices"
import { IUser } from "../../types"
import { loginValidation } from "../../validations"
import ErrorMessage from "../common/ErrorMssage"

type Props = {
  setConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordConfirm: React.FC<Props> = ({ setConfirmPassword }) => {
  const userData = useSelector<RootState, IUser>((state) => state.user.data)
  const { t } = useTranslation("profile")
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [form, setForm] = useState({
    user_id: userData.id,
    email: userData.email,
    password: '',
  })
  const { password } = form

  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      console.error('Password confirm validation error', err)
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.errors[0])
      }
      return
    }

    try {
      const res = await http.post('/users/check', form)
      if (res.data.status === 'success') {
        setConfirmPassword(true)
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.error('password confirm error', err)
      setErrorMsg(`${t("error_code")}`)
    }
  }

  return (
    <div className="bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8 pt-16 min-h-screen">
      <h2 className="mt-6 text-center text-3xl leading-9 font-bold text-gray-900">
        {t("title")}
      </h2>
      <article className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submitHandler}>
            {/* 프로필 사진 */}
            <div className="flex justify-center mb-6">
              <div className="w-36 relative">
                {userData.image
                  ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image" />
                  : <div className='flex w-full aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-7xl md:text-4xl xl:text-5xl'>
                    <p>{userData.name.slice(0, 2).toUpperCase()}</p>
                  </div>
                }
              </div>
            </div>

            {errorMsg && // 에러 메세지
              <ErrorMessage errorMsg={errorMsg} />
            }

            {/* 이메일 */}
            <label htmlFor="email" className='mt-4 block text-sm font-semibold leading-5 text-gray-700 mb-1'>{t("email")}</label>
            <input id='email' name='email' type="email" value={userData.email} disabled
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-studion-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />

            {/* 비밀번호 */}
            <label htmlFor="password" className='mt-4 block text-sm font-semibold leading-5 text-gray-700 mb-1'>{t("password")}</label>
            <input id='password' name='password' type="password" value={password} onChange={onPassword}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-studion-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />

            <button className="w-full flex justify-center mt-6 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-studion-300 transition duration-150 ease-in-out hover:bg-studion-200 focus:outline-none focus:border-studion-500 focus:ring  focus:ring-studion-400 active:bg-studion-400"
              type='submit'>
              {t("btn")}
            </button>
          </form>
        </div>
      </article>
    </div>
  )
}

export default PasswordConfirm