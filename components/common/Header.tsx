import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import styles from '../../styles/common/layout.module.scss'

const Header = () => {
  const router = useRouter();

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
            <div className={styles.unAuthBtn}>
              <button className={styles.loginBtn}>Login</button>
              
              <Link href="/join"><a><button className={styles.joinBtn}>Join</button></a></Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
