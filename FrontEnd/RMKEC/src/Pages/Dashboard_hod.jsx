import React, { useState } from 'react';
import './Dashboard_hod.css';
import PieChartComponent from '../Components/Department-Component/FacultyCountPieChart';
import StudentCountPieChart from '../Components/Department-Component/StudentsCountPieChart';
import PlacementBarGraph from '../Components/Department-Component/PlacementBarGraph';
import { Link } from 'react-router-dom';

// Dummy data
const dummyAcademicYears = ['2021-2022', '2022-2023', '2023-2024'];

const dummyStudentData = [
  { department: 'Computer Science and Engineering', placed_students: 50, yet_placed_students: 30, higher_studies_students: 20 },
  { department: 'Information Technology', placed_students: 40, yet_placed_students: 25, higher_studies_students: 15 },
];

const dummyFacultyDetails = [
  { name: 'Professor', value: 10 },
  { name: 'Associate Professor', value: 5 },
  { name: 'Assistant Professor', value: 25 },
];

const dummyStudentYrsData = [
  { name: '1st Year', value: 60 },
  { name: '2nd Year', value: 55 },
  { name: '3rd Year', value: 50 },
  { name: '4th Year', value: 45 },
];

function DashBoard_hod() {
  const [selectedYear, setSelectedYear] = useState(dummyAcademicYears[dummyAcademicYears.length - 1]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const transformedStudentData = [
    { status: 'Placed', students: dummyStudentData[0].placed_students },
    { status: 'Yet Placed', students: dummyStudentData[0].yet_placed_students },
    { status: 'HS', students: dummyStudentData[0].higher_studies_students },
  ];

  return (
    <div>
      <select className='dropbutton' value={selectedYear} onChange={handleYearChange}>
        {dummyAcademicYears.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div className="grid-container">
        <div className='home-grid-db'>
          <GridItem title="Faculty">
            <PieChartComponent data={dummyFacultyDetails} />
          </GridItem>
          <GridItem title="Placement">
            <PlacementBarGraph Details={transformedStudentData} />
            <Link to="Placements">
              <button className="cute-button">View</button>
            </Link>
          </GridItem>
          <GridItem title="Student">
            <StudentCountPieChart data={dummyStudentYrsData} />
          </GridItem>
        </div>
      </div>
    </div>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="grid-item-db">
      <h3 className="grid-item-db-title">{title}</h3>
      {children}
    </div>
  );
}

export default DashBoard_hod;
