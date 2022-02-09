import React from "react"

import Header from './Header'
import Footer from './Footer'

import styles from '../../styles/common/layout.module.scss'

type Props = {
  children?: React.ReactChild
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className={styles.appLayout}>
      <Header />

      <main className={styles.mainContainer}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default AppLayout
