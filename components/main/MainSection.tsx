import styles from '../../styles/main/main.module.scss'

const MainSection = () => {
  return (
    <div className={styles.mainContainer}>
      <section className={styles.joinSection}>
        <article>
          <h1 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            Online Band.<br/>
            Play your moment.
          </h1>
          <div className={styles.joinDiv}>
            <p>
              자신만의 밴드를 만들어서 합주해보자!<br/>
              언제 어디서든 함께 연주하며 즐겨요.
            </p>
            <div className={styles.joinBtn}>
              <a href='/'>시작하기</a>
            </div>
          </div>
        </article>
      </section>

      {/* divider */}
      <div className={styles.customShapeDividerBottom1640840584}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
        </svg>
      </div>
      <div className={styles.customShapeDividerBottom1640840584}>
      </div>

      <section className={styles.infoSection}>
        <article>
          <h2>Online Studio</h2>
          <h5>온라인 합주실</h5>
          <div>

          </div>
        </article>
      </section>
    </div>
  )
}

export default MainSection
