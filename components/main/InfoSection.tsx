import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade } from "swiper"

SwiperCore.use([Autoplay, EffectFade])

import 'swiper/css';
import 'swiper/css/effect-fade'

import styles from '../../styles/main/main.module.scss'

const InfoSection = () => {
  return (
    <section className={styles.infoSection}>
      <article style={{ marginBottom: '56px' }}>
        <h2>Online Studio</h2>
        <h5>スタジオン</h5>
      </article>
      <Swiper
        className={styles.slider}
        slidesPerView={1}
        speed={500}
        autoplay={{ delay: 5500 }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        <SwiperSlide>
          <div className={styles.slideContent}>
            <div className={styles.cardContainer}>
              <div className={styles.mainCard}>

              </div>
              <div className={styles.subCard}>

              </div>
            </div>
            <div className={styles.infoContainer}>
              <h3>キーボードを使った合奏</h3>
              <div className={styles.instList}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <ul>
                <li>楽器なしにキーボードで簡単に演奏</li>
                <li>今すぐできる</li>
                <li>様々なバーチャル楽器を選べる</li>
              </ul>
              <div className='flex justify-end'>
                <div className={styles.details}>
                  <a className='px-2'>詳細を見る →</a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slideContent}>
            <div className={styles.cardContainer}>
              <div className={styles.mainCard}>

              </div>
              <div className={styles.subCard}>

              </div>
            </div>
            <div className={styles.infoContainer}>
              <h3>自分だけの楽器で合奏</h3>
              <ul>
                <li>自分の楽器でさらに良いクオリティで演奏</li>
                <li>専門的なバンド</li>
              </ul>
              <div className='flex justify-end'>
                <div className={styles.details}>
                  <a className='px-2'>詳細を見る →</a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default InfoSection
