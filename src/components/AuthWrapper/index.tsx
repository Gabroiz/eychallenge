import React from 'react'

import styles from './styles.module.scss'

export default function AuthWrapper({ children }) {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}