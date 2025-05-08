import React from 'react'
import Header from './components/Header/Header'
import styles from './page.module.css'
import Details from './components/details/Details'
import ManagerDecision from './components/ManagerDecision/ManagerDecision'

interface PageProps {
  params: {
    id: string
  }
}

const page = ({params: {id}}: PageProps) => {
  return (
    <section className={styles.detailsContainer}>
      <div className={styles.detailsContent}>
        <Header/>
        <div className={styles.detailsAndDecisionWrapper}>
          <Details/>
          <ManagerDecision/>
        </div>
      </div>
    </section>
  )
}

export default page