import React from 'react'
import Header from './components/Header/Header'
import styles from './page.module.css'
import Details from './components/details/Details'

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
        <div className={styles.details}>
          <Details/>
        </div>
      </div>
    </section>
  )
}

export default page