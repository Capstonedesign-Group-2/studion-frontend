import Link from 'next/link'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/slices'
import styles from '../../styles/main/main.module.scss'

const JoinSection = () => {
  const userData = useSelector((state: RootState) => state.user.data)

  return (
    <section className={styles.joinSection}>
      <article>
        <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          Online Band.<br/>
          Play your moment.
        </h1>
        <div className={styles.joinDiv}>
          <p>
            自分だけのバンドを作って合奏してみよう！<br/>
            いつでもどこでも一緒に演奏して楽しみましょう。
          </p>
          {/* 시작 버튼 */}
          <div className={styles.joinBtn}>
            {userData
              ? <Link href="/play"><a>ルームリスト　→</a></Link>
              : <Link href="/join"><a>スタート　→</a></Link>
            }
          </div>
        </div>
      </article>
    </section>
  )
}

export default JoinSection
