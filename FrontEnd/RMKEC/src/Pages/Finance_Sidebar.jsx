import React, { useRef } from 'react';
import './Student_SideBar.css';
import { Link, useLocation } from 'react-router-dom';
import dashboard from '../assets/dashboard.png';
import finance from '../assets/finance.png';
import { getTokenData } from "../Pages/authUtils";
function Finance_Sidebar() {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const tokenData=getTokenData();
  let user = tokenData.role;

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path ? 'active' : '';
    }
    return location.pathname.startsWith(path) ? 'active' : '';
  };




  return (
    <div className="sidebar" ref={sidebarRef}>
      <ul>
        <li className={isActive('/dashboard', true)}>
          <Link to="/dashboard">
            <img src={dashboard} width="40px" height="40px" alt="Dashboard" />
            Dashboard
          </Link>
        </li>
        <li className={isActive('/dashboard/finance-table')}>
          <Link to="/dashboard/finance-table">
            <img src={finance} width="40px" height="40px" alt="Faculty Details" />
            Finance<br/>Statements
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Finance_Sidebar;
