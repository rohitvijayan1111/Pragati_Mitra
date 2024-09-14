import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components for Table
const TableContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 1rem;
  background-color: #4CAF50;
  color: white;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
`;

const AddButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem 0;

  &:hover {
    background-color: #0056b3;
  }
`;

const FacultyTable = () => {
  const navigate = useNavigate();

  const facultyData = [
    {
      name: 'Dr. John Doe',
      award: 'Best Researcher 2020',
      qualification: 'PhD in Computer Science',
      researchProjects: 'AI in Healthcare',
      advancedDegree: 'Post-Doctoral Certification',
      researchPapers: '12',
      patents: '2',
      publicLectures: '5'
    },
    {
      name: 'Dr. Jane Smith',
      award: 'Innovation Award 2019',
      qualification: 'PhD in Electrical Engineering',
      researchProjects: 'Robotics in Education',
      advancedDegree: 'M.Tech in AI',
      researchPapers: '8',
      patents: '1',
      publicLectures: '3'
    },
    {
      name: 'Prof. David Lee',
      award: 'Teaching Excellence 2021',
      qualification: 'M.Sc in Mechanical Engineering',
      researchProjects: 'Sustainable Energy',
      advancedDegree: 'Diploma in Machine Learning',
      researchPapers: '5',
      patents: '1',
      publicLectures: '10'
    }
  ];

  return (
    <TableContainer>
      <h2>Faculty Details</h2>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Awards Received</TableHeader>
            <TableHeader>Qualification</TableHeader>
            <TableHeader>Research Projects</TableHeader>
            <TableHeader>Advanced Degree/Certification</TableHeader>
            <TableHeader>Research Papers</TableHeader>
            <TableHeader>Patents</TableHeader>
            <TableHeader>Public Lectures</TableHeader>
          </tr>
        </thead>
        <tbody>
          {facultyData.map((faculty, index) => (
            <tr key={index}>
              <TableCell>{faculty.name}</TableCell>
              <TableCell>{faculty.award}</TableCell>
              <TableCell>{faculty.qualification}</TableCell>
              <TableCell>{faculty.researchProjects}</TableCell>
              <TableCell>{faculty.advancedDegree}</TableCell>
              <TableCell>{faculty.researchPapers}</TableCell>
              <TableCell>{faculty.patents}</TableCell>
              <TableCell>{faculty.publicLectures}</TableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      
      <AddButton onClick={() => navigate('add-faculty-details')}>
        Add Faculty Details
      </AddButton>
    </TableContainer>
  );
};

export default FacultyTable;
