import React from 'react';
import { Link } from 'react-router-dom';
import {
  AttachMoneyOutlined,
  GroupsOutlined,
  HomeOutlined,
  InsertChartOutlined,
  PermIdentity,
  RestaurantMenu
} from '@mui/icons-material';
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h2 className={styles.sidebarTitle}>Dashboard</h2>
          <ul className={styles.sidebarList}>
            <Link to="/" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <HomeOutlined className={styles.sidebarIcon} />
                Homepage
              </li>
            </Link>
            <Link to="/users" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <GroupsOutlined className={styles.sidebarIcon} />
                View All Users
              </li>
            </Link>
            <Link to="/users/new" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PermIdentity className={styles.sidebarIcon} />
                Create User
              </li>
            </Link>
            <Link to="/transactions" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <InsertChartOutlined className={styles.sidebarIcon} />
                List Transactions
              </li>
            </Link>
            <Link to="/transactions/new" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <AttachMoneyOutlined className={styles.sidebarIcon} />
                New Transaction
              </li>
            </Link>
            <Link to="/menu" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <RestaurantMenu className={styles.sidebarIcon} />
                View Menu
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}