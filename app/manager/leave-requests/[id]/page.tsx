import React from 'react'
import Header from './components/Header/Header'
import styles from './page.module.css'
import Details from './components/details/Details'
import ManagerDecision from './components/ManagerDecision/ManagerDecision'
import EmployeeInfo from './components/EmployeeInfo/EmployeeInfo'

export const metadata = {
  title: "Stafframe | View Leave Request"
}

interface Props {
  params: Promise<{id: number}>
}

const page = async ({params}: Props) => {
  const {id} = await params
  return (
    <section className={styles.detailsContainer}>
      <div className={styles.detailsContent}>
        <Header/>
        <div className={styles.flexWrapper}>
          <div className={styles.detailsAndDecisionWrapper}>
            <Details/>
            <ManagerDecision/>
          </div>
          <div className={styles.employeeInfo}>
            <EmployeeInfo/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
