import Image from 'next/image'

import styles from '../../styles/common/layout.module.scss'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.gridContainer}>
          <section className={styles.infoSection}>
            {/* 정보 */}
            <article className={styles.studion}>
              <h4>STUDION</h4>
              永進専門大学 コンピュータ情報系列<br/>
              Github: <a href="https://github.com/Capstonedesign-Group-2">https://github.com/Capstonedesign-Group-2</a>
            </article>

            <div className={styles.contentArticle}>
              {/* 네비게이션 */}
              <article>
                <h4>NAVIGATION</h4>
                <ul>
                  <li><a href="/">バンドルーム</a></li>
                  <li><a href="/">録音リレー</a></li>
                  <li><a href="/">コミュニティ</a></li>
                </ul>
              </article>

              {/* 사용법 */}
              <article>
                <h4>DIRECTIONS</h4>
                <ul>
                  <li><a href="/">使い方</a></li>
                </ul>
              </article>
            </div>
          </section>

          {/* 로고 */}
          <article className={styles.logoArticle}>
            <span>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
            <span>Online Band. Play your moment.</span>
          </article>
        </div>


        <section className={styles.copyrightSection}>
          <p>© 2021-2022 Team 2. All rights reserved.</p>
        </section>
      </footer>
    </div>
  )
}

export default Footer
