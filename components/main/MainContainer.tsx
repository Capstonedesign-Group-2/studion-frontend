import styles from '../../styles/main/main.module.scss'

import JoinSection from './JoinSection'
import InfoSection from './InfoSection'

const MainContainer = () => {
  return (
    <div className={styles.mainContainer}>
      <div style={{ width: '100vw', position: 'relative'}}>
        <JoinSection/>

        {/* divider */}
        <div className={styles.customShapeDividerBottom1640840584}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
          </svg>
        </div>
      </div>

      <InfoSection/>
    </div>
  )
}

export default MainContainer
