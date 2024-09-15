import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/Logo.png';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

function DefaultLogin() {
  const navigate = useNavigate();

  const users = {
    student: { username: 'Student', password: '123' },
    hod: { username: 'broh22012.it@rmkec.ac.in', password: 'pass123' },
    faculty: { username: 'Faculty', password: '123' },
    infrastructure: { username: 'infrastructure coordinator', password: '123' },
    finance: { username: 'finance', password: '123' },
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
      const response = await axios.post('http://localhost:3000/auth/login', userData);
      const { token } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('loggedIn', 'true');
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      console.log('Decoded Role:', role);
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
    const { username, password } = users[role];
    validateUser({ username: username, password: password });
  };

  return (
    <div className='loginpage'>
      <div className="login-form">
        <div className="flower-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="login-buttons">
          <button className="btn"  style={{
    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
    color: 'white',
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
  onMouseOver={(e) => (e.target.style.background = 'linear-gradient(90deg, #2a5298, #1e3c72)')}
  onMouseOut={(e) => (e.target.style.background = 'linear-gradient(90deg, #1e3c72, #2a5298)')} onClick={() => handleLogin('student')}>Student Login</button>
          <button className="btn"  style={{
    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
    color: 'white',
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
  onMouseOver={(e) => (e.target.style.background = 'linear-gradient(90deg, #2a5298, #1e3c72)')}
  onMouseOut={(e) => (e.target.style.background = 'linear-gradient(90deg, #1e3c72, #2a5298)')} onClick={() => handleLogin('hod')}>HOD Login</button>
          <button className="btn"  style={{
    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
    color: 'white',
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
  onMouseOver={(e) => (e.target.style.background = 'linear-gradient(90deg, #2a5298, #1e3c72)')}
  onMouseOut={(e) => (e.target.style.background = 'linear-gradient(90deg, #1e3c72, #2a5298)')} onClick={() => handleLogin('faculty')}>Faculty Login</button>
          <button className="btn"  style={{
    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
    color: 'white',
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
  onMouseOver={(e) => (e.target.style.background = 'linear-gradient(90deg, #2a5298, #1e3c72)')}
  onMouseOut={(e) => (e.target.style.background = 'linear-gradient(90deg, #1e3c72, #2a5298)')} onClick={() => handleLogin('infrastructure')}>Infrastructure Login</button>
          <button className="btn"  style={{
    background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
    color: 'white',
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
  onMouseOver={(e) => (e.target.style.background = 'linear-gradient(90deg, #2a5298, #1e3c72)')}
  onMouseOut={(e) => (e.target.style.background = 'linear-gradient(90deg, #1e3c72, #2a5298)')} onClick={() => handleLogin('finance')}>Finance Login</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DefaultLogin;
