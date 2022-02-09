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
              <h3>키보드를 이용한 합주</h3>
              <div className={styles.instList}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <ul>
                <li>악기 없이 키보드를 이용하여 간단하게 합주</li>
                <li>히히</li>
                <li>다양한 악기를 골라 연주</li>
              </ul>
              <div className='flex justify-end'>
                <div className={styles.details}>
                  <a>자세히 보기 →</a>
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
              <h3>자신만의 악기로 연주</h3>
              <ul>
                <li>자신의 장비로 보다 높은 퀄리디의 합주</li>
                <li>전문적인 밴드 연주</li>
                <li></li>
              </ul>
              <div className='flex justify-end'>
                <div className={styles.details}>
                  <a>자세히 보기 →</a>
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
