import React from 'react'
import Header from './components/Header/Header'
import styles from './page.module.css'

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
      </div>
    </section>
  )
}

export default page