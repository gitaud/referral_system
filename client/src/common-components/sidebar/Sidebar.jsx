import React from 'react';
import { Link } from 'react-router-dom';
import {
  PermIdentity,
  Storefront,
} from '@mui/icons-material';
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h2 className={styles.sidebarTitle}>Dashboard</h2>
          <ul className={styles.sidebarList}>
            <Link to="/users" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PermIdentity className={styles.sidebarIcon} />
                View All Users
              </li>
            </Link>
            <Link to="/transactions" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <Storefront className={styles.sidebarIcon} />
                List All Transactions
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}