import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Attendance_DB_Dept.css';
import LineCharts from './LineCharts';
import Attendance_BC from './Attendance_BC';
import Attendance_BC_Admin from '../Components/Admin-Component/Attendance_BC_Admin';
import withAuthorization from '../Components/WithAuthorization';
import dayjs from 'dayjs';
import { getTokenData } from '../Pages/authUtils';

const BatchSelector = ({ onBatchSelect }) => {
  const [selectedBatch, setSelectedBatch] = useState('');

  const handleBatchChange = (event) => {
    const batch = event.target.value;
    setSelectedBatch(batch);
    onBatchSelect(batch);
  };

  return (
    <div>
      <select id="batchSelect" className="status-yr" value={selectedBatch} onChange={handleBatchChange}>
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
      </select>
    </div>
  );
};

const DepartmentSelector = ({ setSelectedDepartment }) => {
  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
  };

  return (
    <div>
      <select id="departmentSelect" className="status-yr" onChange={handleDepartmentChange} required>
        <option value="">Select Department</option>
        <option value="All">All</option>
        <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Computer Science and Business Systems">Computer Science and Business Systems</option>
        <option value="Computer Science and Design">Computer Science and Design</option>
        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
        <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
        <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
        <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
      </select>
    </div>
  );
};

const TypeSelector = ({ onTypeSelect }) => {
  const [selectedType, setSelectedType] = useState('All');

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    onTypeSelect(type);
  };

  return (
    <div>
      <select id="typeSelect" className="status-yr" value={selectedType} onChange={handleTypeChange}>
        <option value="All">All</option>
        <option value="Hostel">Hosteller</option>
        <option value="Day Scholar">Day Scholar</option>
      </select>
    </div>
  );
};

const GridItem = ({ title, children }) => {
  return (
    <div className="grid-item-db">
      <h3 className="grid-item-db-title">{title}</h3>
      {children}
    </div>
  );
};

export function Attendance_DB_Dept() {
  const [selectedYearGroup, setSelectedYearGroup] = useState('Student');
  const [selectedType, setSelectedType] = useState('All');
  const todayDate = dayjs().format('DD-MM-YYYY');
  const tokendata = getTokenData();
  const department = tokendata.department;

  // Dummy data
  const data = [
    { name: 'I', present: 50, absent: 5 },
    { name: 'II', present: 40, absent: 10 },
    { name: 'III', present: 40, absent: 10 },
    { name: 'IV', present: 40, absent: 10 },
  ];
  
  const countdata = {
    Total_students: 200,
    Student_Present: 180,
    Student_Absent: 20,
    Total_staff: 50,
    Staff_Present: 45,
    Staff_Absent: 5
  };

  const linedata = [
    { date: '01-09-2024', present: 50, absent: 5 },
    { date: '02-09-2024', present: 55, absent: 2 },
  ];

  const handleYearGroupSelect = (yearGroup) => {
    setSelectedYearGroup(yearGroup);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <div className="content">
        <BatchSelector onBatchSelect={handleYearGroupSelect} />
        <TypeSelector onTypeSelect={handleTypeSelect} />
      </div>

      <div className="component">
        <h1>{todayDate}</h1>
        <div className="home-grid-db">
          <div className="grid-containers">
            <div className="home-grid-db">
              <GridItem title="Attendance">
                <Attendance_BC data={data} />
              </GridItem>
              <GridItem title="Data">
                <div className="content-container">
                  {countdata !== null && (
                    <>
                      <p>Total No of students: {countdata.Total_students}</p>
                      <p>Present: {countdata.Student_Present}</p>
                      <p>Absent: {countdata.Student_Absent}</p>
                      <p>Total No of Teachers: {countdata.Total_staff}</p>
                      <p>Present: {countdata.Staff_Present}</p>
                      <p>Absent: {countdata.Staff_Absent}</p>
                    </>
                  )}
                </div>
              </GridItem>
              <GridItem title="Analysis">
                <LineCharts data={linedata} />
              </GridItem>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export function Attendance_DB_Admin() {
  const [selectedYearGroup, setSelectedYearGroup] = useState('Student');
  const [selectedType, setSelectedType] = useState('All');
  const todayDate = dayjs().format('DD-MM-YYYY');

  // Dummy data
  const data = [
    { name: 'AI', present: 50, absent: 5 },
    { name: 'IT', present: 40, absent: 10 },
    { name: 'CSE', present: 50, absent: 5 },
    { name: 'ECE', present: 40, absent: 10 },
    { name: 'CE', present: 50, absent: 5 },
    { name: 'ME', present: 40, absent: 10 },

  ];

  const countdata = {
    Total_students: 250,
    Student_Present: 230,
    Student_Absent: 20,
    Total_staff: 60,
    Staff_Present: 55,
    Staff_Absent: 5
  };

  const linedata = [
    { date: '01-09-2024', present: 70, absent: 5 },
    { date: '02-09-2024', present: 60, absent: 10 },
  ];

  const handleYearGroupSelect = (yearGroup) => {
    setSelectedYearGroup(yearGroup);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <div className="selector">
        <BatchSelector onBatchSelect={handleYearGroupSelect} />
        <TypeSelector onTypeSelect={handleTypeSelect} />
      </div>
      <div className="component">
        <h1>{todayDate}</h1>
        <div className="home-grid-db">
          <div className="grid-containers">
            <div className="home-grid-db">
              <GridItem title="Attendance">
                <Attendance_BC_Admin data={data} />
              </GridItem>
              <GridItem title="Data">
                <div className="content-container">
                  {countdata !== null && (
                    <>
                      <p>Total No of students: {countdata.Total_students}</p>
                      <p>Present: {countdata.Student_Present}</p>
                      <p>Absent: {countdata.Student_Absent}</p>
                      <p>Total No of Teachers: {countdata.Total_staff}</p>
                      <p>Present: {countdata.Staff_Present}</p>
                      <p>Absent: {countdata.Staff_Absent}</p>
                    </>
                  )}
                </div>
              </GridItem>
              <GridItem title="Analysis">
                <LineCharts data={linedata} />
              </GridItem>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

const Attendance_Dashboard = () => {
  const tokendata = getTokenData();
  const user = tokendata.role;
  return user === 'hod' || user === 'Attendance Manager' ? <Attendance_DB_Dept /> : <Attendance_DB_Admin />;
};

export default withAuthorization(['hod', 'Principal', 'VC', 'Dean', 'Attendance Manager'])(Attendance_Dashboard);
