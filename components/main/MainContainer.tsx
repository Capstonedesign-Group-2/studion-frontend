import styles from '../../styles/main/main.module.scss'

import JoinSection from './JoinSection'
import InfoSection from './InfoSection'
import SoundcloudSection from './SoundcloudSection'
import { FC } from 'react'
import { IPost } from '../../types'

interface Props {
  rank: { week: IPost[], month: IPost[] }
}

const MainContainer: FC<Props> = ({ rank }) => {
  return (
    <>
      {/* Studion Section */}
      <div className='flex flex-col mb-32 md:mb-40 items-center justify-center min-h-screen bg-gray-50'>
        <div className='relative w-screen'>
          <JoinSection />

          {/* divider */}
          <div className={styles.customShapeDividerBottom1640840584}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
            </svg>
          </div>
        </div>

        <InfoSection />
      </div>

      {/* Soundcloud Section */}
      <SoundcloudSection rank={rank} />
    </>
  )
}

export default MainContainer
