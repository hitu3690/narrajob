import React from 'react'
import styles from '@/assets/customer/index.module.scss'
import { HeaderContainer } from '@/container/HeaderContainer'
import { ArticleContainer } from '@/container/ArticleContainer'

export const CustomerContainer: React.FunctionComponent = () => {
  return (
    <div className={styles.customer}>
      <HeaderContainer />
      <ArticleContainer />
    </div>
  )
}
