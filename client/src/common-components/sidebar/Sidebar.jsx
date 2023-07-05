import React from 'react';
import { Link } from 'react-router-dom';
import {
  PermIdentity,
  Storefront,
} from '@mui/icons-material';
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Dashboard</h2>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                View All Users
              </li>
            </Link>
            <Link to="/transactions" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                List All Transactions
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}