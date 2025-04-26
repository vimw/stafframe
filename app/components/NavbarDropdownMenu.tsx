'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import styles from './Navbar.module.css'
import { DownOutlined, SettingOutlined, RightOutlined,UpOutlined,LogoutOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps} from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    label: (
        <div className={styles.profileInfo}>
            <Image className={styles.profilePicture} src="/profile_picture.jpg" alt='profile picture' width={30} height={30}/>
            <p>Jan Nowak</p>
        </div>
    ),
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: (
        <Link href="/" className={styles.dropDownMenuLink}>
            <SettingOutlined />
            <span className={styles.labelText}>Edit Profile</span>
            <RightOutlined className={styles.arrowIcon} />
        </Link>
    ),
    key: '1',
  },
  {
    label: (
        <Link href='/' className={styles.dropDownMenuLink}>
            <LogoutOutlined />
            <span className={styles.labelText}>Logout</span>
            <RightOutlined className={styles.arrowIcon}/>
        </Link>

    ),
    key: '2',
  },
];

const NavbarDropdownMenu: React.FC = () => {
    const [collapsed,setCollapsed] = useState(true) 

    function toggleCollapsed(){
        setCollapsed(!collapsed)
    }

    return(
        <Dropdown
        onOpenChange={() => toggleCollapsed()}
        overlayStyle={{
            width: '300px',
            minWidth: '300px',
            fontSize: '16px',
            paddingTop: '20px',
            fontFamily: 'var(--font-lato), sans-serif'
        }}
        menu={{ items }}
        trigger={['click']}>
            <a onClick={(e) => e.preventDefault}>
                {collapsed ? <DownOutlined/> : <UpOutlined/>}
            </a>
        </Dropdown>
    )
}

export default NavbarDropdownMenu