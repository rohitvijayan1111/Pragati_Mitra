import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/pragati.png';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import GoogleTranslate from '../Components/GoogleTranslate';

function DefaultLogin() {
  const navigate = useNavigate();
  const users = {
    Student: {id:1, username: 'Student', password: '123',role:"Student",department:"Information Technology" },
    hod: {id:2, username: 'broh22012.it@rmkec.ac.in', password: 'pass123',role:"hod",department:"Information Technology"},
    Faculty: {id:3, username: 'Faculty', password: '123',role:"Faculty",department:"Information Technology"},
    "Infrastructure Coordinator": {id:4, username: 'infrastructure coordinator', password: '123',role:"Infrastructure Coordinator",department:"Infrastructure Coordinator" },
    "Finance Coordinator": {id:5, username: 'finance', password: '123',role:"Finance Coordinator",department:"Finance Coordinator"},
    AcademicCoordinator:{id:6,username:"IQAC",password:"pass123",role:"IQAC",department:"IQAC"}
  };

  const notifysuccess = () => {
    toast.success('Signed In Successfully!', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  const notifyfailure = (error) => {
    toast.error(error || 'An error occurred. Please try again.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  const validateUser = async (userData) => {
    try {
      const token = JSON.stringify({ department: userData.department, role: userData.role==="AcademicCoordinator"?"IQAC":userData.role, id: userData.id });
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('loggedIn', 'true');
      notifysuccess();
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      sessionStorage.setItem('loggedIn', 'false');
      const errorMsg = error.response?.data || 'An error occurred. Please try again.';
      notifyfailure(errorMsg);
    }
  };
  

  const handleLogin = (role) => {
    const { username, department } = users[role];
    validateUser({ username: username, role: role, department: department });
  };
  

  return (
    <div className='loginpage'>
      <div className="login-form">
        <div className="flower-logo">
          <img src={logo} alt="Logo"/>
          <p className='logo' style={{ textDecoration: 'none' }}>
            <div>PRAGATI MITRA</div>
          </p>
        </div>
        <div className="login-buttons">
                <button className="btn"  style={{
    background: 'rgba(244, 244, 244, 0.9)',
    color: '#164863',
    fontWeight:'700',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'center'
  }}
  onMouseOver={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')}
  onMouseOut={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')} onClick={() => handleLogin('AcademicCoordinator')}>Academic <br/>Co-Ordinator Login</button>
    
          <button className="btn"  style={{
    background: 'rgba(244, 244, 244, 0.9)',
    color: '#164863',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight:'700',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'center'
  }}
  onMouseOver={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')}
  onMouseOut={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')} onClick={() => handleLogin('Student')}>Student Login</button>
          <button className="btn"  style={{
    background: 'rgba(244, 244, 244, 0.9)',
    color: '#164863',
    border: 'none',
    padding: '12px 24px',
    fontWeight:'700',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'center'
  }}
  onMouseOver={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')}
  onMouseOut={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')} onClick={() => handleLogin('hod')}>HOD Login</button>
          <button className="btn"  style={{
    background: 'rgba(244, 244, 244, 0.9)',
    color: '#164863',
    border: 'none',
    padding: '12px 24px',
    fontWeight:'700',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'center'
  }}
  onMouseOver={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')}
  onMouseOut={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')} onClick={() => handleLogin('Faculty')}>Faculty Login</button>
          <button className="btn"  style={{
    background: 'rgba(244, 244, 244, 0.9)',
    color: '#164863',
    border: 'none',
    padding: '12px 24px',
    fontWeight:'700',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'center'
  }}
  onMouseOver={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')}
  onMouseOut={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')} onClick={() => handleLogin('Infrastructure Coordinator')}>Infrastructure Login</button>
        <label 
  style={{
    fontSize: '14px',
    color: '#164863',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '20px',
    marginBottom: '10px',
    letterSpacing: '0.5px',
    textAlign: 'center',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease'
  }}
>
<button className="btn"  style={{
    background: 'rgba(244, 244, 244, 0.9)',
    color: '#164863',
    fontWeight:'700',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'center'
  }}
  onMouseOver={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')}
  onMouseOut={(e) => (e.target.style.background = 'rgba(244, 244, 244, 0.9)')} onClick={() => handleLogin('Finance Coordinator')}>Finance Login</button>
  
  If Not English
</label>
    <GoogleTranslate/>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DefaultLogin;
