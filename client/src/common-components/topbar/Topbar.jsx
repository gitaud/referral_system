import React from 'react';
import { Link } from 'react-router-dom';
import {
  PermIdentity,
  Storefront,
  PowerSettingsNew
} from '@mui/icons-material';
import styles from "./Topbar.module.css";
import { logout, useAuthContext } from '../../context/AuthContext'

export default function Topbar() {

  const { dispatch } = useAuthContext();

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topLeft}>
          <Link to="/" className={styles.link}>
            <span className={styles.logo}>Kijana Msafi</span>
          </Link>
        </div>
        <div className={styles.topRight}>
          <div className={styles.nav}>
            <Link to="/users" className={styles.link}>
              <PermIdentity />
            </Link>
          </div>
          <div className={styles.nav}>
            <Link to="/orders" className={styles.link}>
              <Storefront />
            </Link>
          </div>
          <Link to="/" className={styles.link}>
            <img src="https://res.cloudinary.com/dctw6ghne/image/upload/v1671541603/kijana_msafi_logo_m1rdia.jpg" alt="Kijana Msafi Logo" className={styles.topAvatar} />
          </Link>
          <Link onClick={() => dispatch(logout())} className={styles.link}>
            <span className={styles.logout}><PowerSettingsNew /></span>
          </Link>
        </div>
      </div>
    </div>
  )
}