import { useState } from "react"

import AppLayout from "../components/common/AppLayout"
import AccountInformation from "../components/profile/AccountInformation"
import DeleteAccount from "../components/profile/DeleteAccount"
import EmailComponent from "../components/profile/EmailComponent"
import PasswordConfirm from "../components/profile/PasswordConfirm"
import ProfileComponent from "../components/profile/ProfileComponent"
import { stayLoggedIn } from "../http/stay"
import wrapper from "../redux/store"

const Profile = () => {
  const [isConfirmPassword, setConfirmPassword] = useState<boolean>(false)

  if (!isConfirmPassword) {
    return (
      <AppLayout>
        <PasswordConfirm setConfirmPassword={setConfirmPassword} />
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <article className="bg-gray-50 px-4 sm:px-6 lg:px-36 pt-36 lg:pb-72">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <AccountInformation />
          <hr className="my-5" />
          <EmailComponent />
          <hr className="my-5" />
          <ProfileComponent />
          <hr className="my-5" />
          <DeleteAccount />
        </div>
      </article>
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store)
  if (!store.getState().user.data) { // 유저 데이터가 없으면 '/login'으로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default Profile