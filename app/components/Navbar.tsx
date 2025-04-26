import Link from 'next/link'
import styles from './Navbar.module.css'
import Image from 'next/image'
import NavbarDropdownMenu from './NavbarDropdownMenu'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.links}>
            <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/">Manage Users</Link>
                </li>
                <li>
                  <Link href="/">Leave Requests</Link>
                </li>
            </ul>
        </div>
        <div className={styles.profileInfo}>
          <Image className={styles.profilePicture} src="/profile_picture.jpg" alt='profile picture' width={50} height={50}/>
          <div className={styles.profileContent}>
            <p>Jan Nowak</p>
            <NavbarDropdownMenu/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar