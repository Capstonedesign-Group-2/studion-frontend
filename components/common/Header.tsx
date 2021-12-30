import Link from 'next/link'
import Router from 'next/router'
import Image from 'next/image'

import styles from '../../styles/common/layout.module.scss'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
          
          <div className={styles.link}>
            <a href="">バンドルーム</a>
            <a href="">録音リレー</a>
            <a href="">コミュニティ</a>
          </div>

          <div className={styles.btnContainer}>
            <div className={styles.unAuthBtn}>
              <button className={styles.loginBtn}>Login</button>
              <button className={styles.joinBtn}>Join</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
