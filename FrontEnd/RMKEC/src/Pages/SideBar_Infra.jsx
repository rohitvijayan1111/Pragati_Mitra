import React, { useRef } from 'react';
import './Student_SideBar.css';
import { Link, useLocation } from 'react-router-dom';
import dashboard from '../assets/dashboard.png';
import infra from '../assets/infra.png';
import { getTokenData } from "../Pages/authUtils";
function SideBar_Infra() {
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
        <li className={isActive('/dashboard/Infrastructure-table')}>
          <Link to="/dashboard/Infrastructure-table">
            <img src={infra} width="40px" height="40px" alt="Faculty Details" />
            Infra Details
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default SideBar_Infra;
