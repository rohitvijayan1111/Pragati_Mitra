import React, { useState, useEffect } from 'react';
import PrincipalBC from '../Components/Admin-Component/PrincipalBC';
import PrincipalFPC from '../Components/Admin-Component/PrincipalFPC';
import './Dashboard_admin.css';
import PrincipalSPC from '../Components/Admin-Component/PrincipalSPC';
import DepartmentList from '../Components/Admin-Component/DepartmentList';
import { Link } from 'react-router-dom'; 

const Dashboard_admin = () => {
  const [adminacademicYears, setadminAcademicYears] = useState([]);
  const [adminselectedYear, setadminSelectedYear] = useState('');
  const [adminstudentDetails, setadminStudentDetails] = useState([]);
  const [adminfacultyDetails, setadminFacultyDetails] = useState([]);
  const [adminstudentYrsDetails, setadminStudentYrsDetails] = useState([]);
  const [adminshowGraphs, setadminShowGraphs] = useState(true);
  
  useEffect(() => {
    // Dummy static data for academic years
    const years = ['2020-2021', '2021-2022', '2022-2023', '2023-2024'];
    setadminAcademicYears(years);
    const defaultYear = years[years.length - 1];
    setadminSelectedYear(defaultYear);

    // Fetch dummy static data
    fetchadminStudentData(defaultYear);
    fetchadminStaffData();
    fetchadminStudentyrsData();

    return () => {
      setadminAcademicYears([]);
      setadminSelectedYear('');
      setadminStudentDetails([]);
      setadminFacultyDetails([]);
      setadminStudentYrsDetails([]);
      setadminShowGraphs(false);
    };
  }, []);

  useEffect(() => {
    setadminShowGraphs(true);
  }, [adminselectedYear]);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setadminSelectedYear(year);
    fetchadminStudentData(year);
  };

  // Dummy static student data based on academic year
  const fetchadminStudentData = (year) => {
    const dummyStudentData = [
      { department: 'Artificial Intelligence and Data Science', placed_students: 45, yet_placed_students: 30, higher_studies_students: 20 },
      { department: 'Computer Science and Business Systems', placed_students: 40, yet_placed_students: 25, higher_studies_students: 15 },
      { department: 'Computer Science and Design', placed_students: 35, yet_placed_students: 20, higher_studies_students: 10 },
      { department: 'Civil Engineering', placed_students: 30, yet_placed_students: 25, higher_studies_students: 15 },
      { department: 'Computer Science and Engineering', placed_students: 50, yet_placed_students: 30, higher_studies_students: 20 },
      { department: 'Electronics and Communication Engineering', placed_students: 55, yet_placed_students: 35, higher_studies_students: 25 },
      { department: 'Electrical and Electronics Engineering', placed_students: 35, yet_placed_students: 25, higher_studies_students: 15 },
      { department: 'Electronics and Instrumentation Engineering', placed_students: 25, yet_placed_students: 20, higher_studies_students: 10 },
      { department: 'Information Technology', placed_students: 40, yet_placed_students: 25, higher_studies_students: 15 },
      { department: 'Mechanical Engineering', placed_students: 45, yet_placed_students: 30, higher_studies_students: 20 }
    ];
    
    setadminStudentDetails(transformData(dummyStudentData));
  };

  const departmentMapping = {
    'Artificial Intelligence and Data Science': 'AD',
    'Computer Science and Business Systems': 'CB',
    'Computer Science and Design': 'CD',
    'Civil Engineering': 'CE',
    'Computer Science and Engineering': 'CS',
    'Electronics and Communication Engineering': 'EC',
    'Electrical and Electronics Engineering': 'EE',
    'Electronics and Instrumentation Engineering': 'EI',
    'Information Technology': 'IT',
    'Mechanical Engineering': 'ME',
  };

  const transformData = (data) => {
    return data.map((item) => ({
      name: departmentMapping[item.department] || item.department, 
      Placed: item.placed_students,
      NotPlaced: item.yet_placed_students,
      HS: item.higher_studies_students,
    }));
  };

  // Dummy static staff data
  const fetchadminStaffData = () => {
    const dummyStaffData = [
      { name: 'AD', value: 20, Professor: 5, Associate_Professor: 8, Assistant_Professor: 7 },
      { name: 'CB', value: 18, Professor: 4, Associate_Professor: 7, Assistant_Professor: 7 },
      { name: 'CD', value: 15, Professor: 3, Associate_Professor: 5, Assistant_Professor: 7 },
      { name: 'CE', value: 22, Professor: 6, Associate_Professor: 8, Assistant_Professor: 8 },
      { name: 'CS', value: 30, Professor: 8, Associate_Professor: 12, Assistant_Professor: 10 },
      { name: 'EC', value: 25, Professor: 6, Associate_Professor: 10, Assistant_Professor: 9 },
      { name: 'EE', value: 19, Professor: 4, Associate_Professor: 7, Assistant_Professor: 8 },
      { name: 'EI', value: 16, Professor: 3, Associate_Professor: 5, Assistant_Professor: 8 },
      { name: 'IT', value: 24, Professor: 7, Associate_Professor: 10, Assistant_Professor: 7 },
      { name: 'ME', value: 20, Professor: 5, Associate_Professor: 8, Assistant_Professor: 7 },
    ];
    setadminFacultyDetails(transformadminstaffData(dummyStaffData));
  };

  const transformadminstaffData = (data) => {
    return data.map((item) => ({
      name: departmentMapping[item.department] || item.department, 
      value: item.Professor + item.Associate_Professor + item.Assistant_Professor,
      Professor: item.Professor,
      Associate_Professor: item.Associate_Professor,
      Assistant_Professor: item.Assistant_Professor
    }));
  };

  // Dummy static student year data
  const fetchadminStudentyrsData = () => {
    const dummyStudentYrsData = [
      { department: 'Artificial Intelligence and Data Science', firstyearcount: 65, secondyearcount: 60, thirdyearcount: 55, fourthyearcount: 50 },
      { department: 'Computer Science and Business Systems', firstyearcount: 55, secondyearcount: 50, thirdyearcount: 45, fourthyearcount: 40 },
      { department: 'Computer Science and Design', firstyearcount: 50, secondyearcount: 45, thirdyearcount: 40, fourthyearcount: 35 },
      { department: 'Civil Engineering', firstyearcount: 45, secondyearcount: 40, thirdyearcount: 35, fourthyearcount: 30 },
      { department: 'Computer Science and Engineering', firstyearcount: 60, secondyearcount: 55, thirdyearcount: 50, fourthyearcount: 45 },
      { department: 'Electronics and Communication Engineering', firstyearcount: 70, secondyearcount: 65, thirdyearcount: 60, fourthyearcount: 55 },
      { department: 'Electrical and Electronics Engineering', firstyearcount: 50, secondyearcount: 45, thirdyearcount: 40, fourthyearcount: 35 },
      { department: 'Electronics and Instrumentation Engineering', firstyearcount: 40, secondyearcount: 35, thirdyearcount: 30, fourthyearcount: 25 },
      { department: 'Information Technology', firstyearcount: 50, secondyearcount: 45, thirdyearcount: 40, fourthyearcount: 35 },
      { department: 'Mechanical Engineering', firstyearcount: 55, secondyearcount: 50, thirdyearcount: 45, fourthyearcount: 40 }
    ];
    
    setadminStudentYrsDetails(transformadminyrsData(dummyStudentYrsData));
  };

  const transformadminyrsData = (data) => {
    return data.map((item) => ({
      name: departmentMapping[item.department] || item.department,
      value: item.firstyearcount + item.secondyearcount + item.thirdyearcount + item.fourthyearcount,
      First_year: item.firstyearcount,
      Second_year: item.secondyearcount,
      Third_year: item.thirdyearcount,
      Fourth_year: item.fourthyearcount,
    }));
  };

  return (
    <div>
      <select className='dropbutton' value={adminselectedYear} onChange={handleYearChange}>
        {adminacademicYears.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
      <div className="grid-containers">
        <div className="home-grid-club">
          <GridItem title="Faculty">
            <PrincipalFPC data={adminfacultyDetails}/>
          </GridItem>
          <GridItem title="Placement">
            <PrincipalBC data={adminstudentDetails}/>
            <Link to="placements">
              <button className="cute-button">View</button>
            </Link>
          </GridItem>
          <GridItem title="Student">
            <PrincipalSPC data={adminstudentYrsDetails}/>
          </GridItem>
        </div>
      </div>
      <DepartmentList/>
    </div>
  );
};

function GridItem({ title, children }) {
  return (
    <div className="grid-item-ca">
      <h3 className="grid-item-ca-title">{title}</h3>
      {children}
    </div>
  );
}

export default Dashboard_admin;
