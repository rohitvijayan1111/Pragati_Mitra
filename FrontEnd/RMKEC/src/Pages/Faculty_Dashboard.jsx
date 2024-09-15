import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register the components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Faculty_Dashboard = () => {
  const performanceData = {
    labels: ['DSA', 'OS', 'JAVA', 'ML'],
    datasets: [
      {
        label: 'Student Performance',
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
        data: [85, 78, 92, 88], // Performance in percentage
      },
    ],
  };

  const achievementData = {
    labels: ['Awards', 'Certificates', 'Competitions'],
    datasets: [
      {
        label: 'Achievements',
        backgroundColor: ['#8e44ad', '#e67e22', '#3498db'],
        data: [3, 5, 2], // Number of achievements
      },
    ],
  };

  return (
    <DashboardContainer>
      <Header>Faculty Dashboard</Header>

      <Content>
        <SubjectsCard>
          <CardHeader>Subjects You Teach</CardHeader>
          <SubjectList>
            <li>DSA</li>
            <li>OS</li>
            <li>JAVA</li>
            <li>ML</li>
          </SubjectList>
        </SubjectsCard>

        <GraphCard>
          <CardHeader>Student Performance</CardHeader>
          <Bar data={performanceData} height={300} />
        </GraphCard>

        <GraphCard>
          <CardHeader>Student Achievements</CardHeader>
          <Pie data={achievementData} />
        </GraphCard>
      </Content>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  background-color: #f4f6f8;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #2c3e50;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

const SubjectsCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GraphCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.h3`
  text-align: center;
  color: #34495e;
  margin-bottom: 20px;
  font-size: 24px;
`;

const SubjectList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: center;

  li {
    background-color: #ecf0f1;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    color: #34495e;
    font-weight: bold;
  }
`;

export default Faculty_Dashboard;
