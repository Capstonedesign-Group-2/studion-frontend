import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from '../../styles/common/layout.module.scss'
import { RootState } from '../../redux/slices'
import MenuBox from './MenuBox'

const Header = () => {
  const router = useRouter()
  const [menu, setMenu] = useState(false)
  const userData = useSelector((state: RootState) => state.user.data)

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
              </a>
            </Link>
          </div>
          
          {router.pathname === '/' &&
            <div className={styles.link}>
              <a href="">バンドルーム</a>
              <a href="">録音リレー</a>
              <a href="">コミュニティ</a>
            </div>
          }

          <div className={styles.btnContainer}>
            {/* 로그인 상태 확인 */}
            {userData
              ? <div className={styles.authBtn}>
                  <button onClick={() => setMenu(!menu)}>
                    {/* 프로필 사진 여부 */}
                    {userData.image
                      ? <Image className={styles.userImage} src={userData.image} alt="profile image"/>
                      : <div className={styles.userIntial}><p>{userData.name.slice(0, 2).toUpperCase()}</p></div>
                    }
                  </button>
                  { menu && <MenuBox menu={menu} setMenu={setMenu}/> }
                </div>
              : <div className={styles.unAuthBtn}>
                  <Link href="/login"><a><button className={styles.loginBtn}>Login</button></a></Link>
                  <Link href="/join"><a><button className={styles.joinBtn}>Join</button></a></Link>
                </div>
            }
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
