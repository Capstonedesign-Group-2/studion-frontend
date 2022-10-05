import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoCreateOutline } from 'react-icons/io5'
import { AiOutlineComment } from 'react-icons/ai'
import Router from 'next/router'

import styles from '../../styles/common/layout.module.scss'
import btnStyles from '../../styles/soundCloud/soundCloud.module.scss'
import { RootState } from '../../redux/slices'
import MenuBox from './MenuBox'
import { Modal } from './modals'
import CreatePost from '../soundCloud/CreatePost'
import useTranslation from 'next-translate/useTranslation'

const Header = () => {
  const router = useRouter()
  const [menu, setMenu] = useState(false)
  const userData = useSelector((state: RootState) => state.user.data)
  const { t } = useTranslation("common")
  const post_langs = {
    post_file_select: t("post_file_select"),
    post_content: t("post_content"),
    post_btn: t("post_btn")
  }
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <Image src="/studion.png" alt="Studion Logo" width='84' height='26' />
              </a>
            </Link>
          </div>

          {!(router.pathname === '/login' || router.pathname === '/join') &&
            <div className={styles.link}>
              <Link href="/play"><a>{t("nav_1")}</a></Link>
              <Link href="/soundcloud"><a>{t("nav_2")}</a></Link>
              <Link href="/recording"><a>{t("nav_3")}</a></Link>
            </div>
          }

          <div className={styles.btnContainer}>
            {/* 글 작성 버튼 */}
            {(router.pathname === '/soundcloud') &&

              <>
                <IoCreateOutline className='w-7 h-7 mt-4 cursor-pointer' onClick={() => {
                  Modal.fire({
                    html: <CreatePost langs={post_langs}/>,
                    showConfirmButton: false,
                    customClass: { popup: btnStyles.post },
                  })
                }} />
                <AiOutlineComment className='w-7 h-7 mt-4 cursor-pointer' onClick={() => Router.push(`/chat`)} />
              </>
            }
            {/* 로그인 상태 확인 */}
            {userData
              ? <div className={styles.authBtn}>
                <button onClick={() => setMenu(!menu)}>
                  {/* 프로필 사진 여부 */}
                  {userData.image
                    ? <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image src={userData.image} layout="fill" alt="profile image" />
                    </div>
                    : <div className={styles.userIntial}><p>{userData.name.slice(0, 2).toUpperCase()}</p></div>
                  }
                </button>
                {menu && <MenuBox menu={menu} setMenu={setMenu} />}
              </div>
              : <div className={styles.unAuthBtn}>
                <Link href="/login"><a><button className={styles.loginBtn}>{t("header_login")}</button></a></Link>
                <Link href="/join"><a><button className={styles.joinBtn}>{t("header_signIn_btn")}</button></a></Link>
              </div>
            }
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
