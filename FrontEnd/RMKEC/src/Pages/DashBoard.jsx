import React from 'react';
import DashBoard_hod from './Dashboard_hod';
import Dashboard_admin from './Dashboard_admin';
import Attendance_DB_Dept from '../Attendance_Component/Attendance_DB_Dept';
import withAuthorization from '../Components/WithAuthorization';
import DashBoard_Hall from '../HallBooking_Component/DashBoard_Hall';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getTokenData } from './authUtils';
import Dashboard_student from './Dashboard_student';
import Dashboard_Infra from './Dashboard_Infra';


const DashBoard = () => {
  const tokenData = getTokenData();
    if (!tokenData) {
      return <Navigate to="/" />;
    }
    const {role} = tokenData;

  return (
    <>
      {role === 'hod' && <DashBoard_hod />}
      {role === 'Attendance Manager' && <Attendance_DB_Dept />}
      {role==='Event Coordinator' && <DashBoard_Hall/>}
      {role==='Student' && <Dashboard_student/>}
      {role==="Infrastructure Coordinator" && <Dashboard_Infra/>}
      {role !== 'hod' && role !== 'Attendance Manager' && role!=='Event Coordinator' && role!=="Infrastructure Coordinator" && role!=='Student' && role!=="Infrastructure Coordinator" && <Dashboard_admin />}
    </>
  );
}
export default withAuthorization(['hod', 'Principal', 'VC', 'Dean', 'Attendance Manager','Event Coordinator',"academic_coordinator","IQAC","Student","Infrastructure Coordinator"])(DashBoard);
