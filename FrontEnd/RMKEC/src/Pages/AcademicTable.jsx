import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components for AcademicTable
const TableContainer = styled.div`
  max-width: 900px;
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

const AcademicTable = () => {
  const navigate = useNavigate();

  const dummyData = [
    {
      department: 'Computer Science',
      passPercentage: '85%',
      avgGpa: '7.8',
      graduationRate: '90%',
      universityRank: '25',
      extraCurricular: 'Sports, Drama'
    },
    {
      department: 'Electrical Engineering',
      passPercentage: '90%',
      avgGpa: '8.2',
      graduationRate: '93%',
      universityRank: '15',
      extraCurricular: 'Robotics, Debate'
    },
    {
      department: 'Mechanical Engineering',
      passPercentage: '82%',
      avgGpa: '7.5',
      graduationRate: '88%',
      universityRank: '30',
      extraCurricular: 'Music, Dance'
    }
  ];

  return (
    <TableContainer>
      <h2>Department Academic Details</h2>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Department</TableHeader>
            <TableHeader>Pass Percentage</TableHeader>
            <TableHeader>Avg GPA</TableHeader>
            <TableHeader>Graduation Rate</TableHeader>
            <TableHeader>University Rank</TableHeader>
            <TableHeader>Extra-Curricular</TableHeader>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row, index) => (
            <tr key={index}>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.passPercentage}</TableCell>
              <TableCell>{row.avgGpa}</TableCell>
              <TableCell>{row.graduationRate}</TableCell>
              <TableCell>{row.universityRank}</TableCell>
              <TableCell>{row.extraCurricular}</TableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      
      <AddButton onClick={() => navigate('academic')}>Add Academic Details</AddButton>
    </TableContainer>
  );
};

export default AcademicTable;
