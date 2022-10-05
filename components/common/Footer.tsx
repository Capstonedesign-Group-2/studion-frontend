import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/common/layout.module.scss'

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.gridContainer}>
          <section className={styles.infoSection}>
            {/* 정보 */}
            <article className={styles.studion}>
              <h4>STUDION</h4>
              {t("footer_school")}<br />
              Github: <a href="https://github.com/Capstonedesign-Group-2">https://github.com/Capstonedesign-Group-2</a>
            </article>

            <div className={styles.contentArticle}>
              {/* 네비게이션 */}
              <article>
                <h4>NAVIGATION</h4>
                <ul>
                  <li><Link href="/play"><a>{t("nav_1")}</a></Link></li>
                  <li><Link href="/soundcloud"><a>{t("nav_2")}</a></Link></li>
                  <li><Link href="/recording"><a>{t("nav_3")}</a></Link></li>
                </ul>
              </article>

              {/* 사용법 */}
              <article>
                <h4>DIRECTIONS</h4>
                <ul>
                  <li><a>{t("footer_help")}</a></li>
                </ul>
              </article>
            </div>
          </section>

          {/* 로고 */}
          <article className={styles.logoArticle}>
            <Link href="/">
              <a>
                <Image src="/studion.png" alt="Studion Logo" width='84' height='26' />
              </a>
            </Link>
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
