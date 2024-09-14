import React from 'react';
import styled from 'styled-components';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Register the components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// Styled Components for the dashboard_Infra
const Dashboard_InfraContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
`;

const OverviewContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: #34495e;
`;

const CardValue = styled.p`
  font-size: 2rem;
  color: #3498db;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 500px; /* Adjust height */
  max-width: 800px;  /* Adjust width */
  margin: auto;      /* Center align */
`;

// Sample data for the charts
const buildingMaintenanceData = {
  labels: ['Building A', 'Building B', 'Building C', 'Building D'],
  datasets: [
    {
      label: 'Maintenance Status',
      data: [30, 50, 75, 20], // Example maintenance percentages
      backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'],
    },
  ],
};

const projectTimelineData = {
  labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4'],
  datasets: [
    {
      label: 'Completion (%)',
      data: [25, 50, 75, 100], // Example completion percentages
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      pointBorderColor: '#2980b9',
      pointBackgroundColor: '#3498db',
      fill: true,
    },
  ],
};

const Dashboard_Infra = () => {
  return (
    <Dashboard_InfraContainer>
      <Title>Infrastructure Coordinator Dashboard</Title>

      {/* Overview Section */}
      <OverviewContainer>
        <Card>
          <CardTitle>Total Buildings</CardTitle>
          <CardValue>15</CardValue>
        </Card>
        <Card>
          <CardTitle>Ongoing Maintenance</CardTitle>
          <CardValue>3</CardValue>
        </Card>
        <Card>
          <CardTitle>Budget Utilized</CardTitle>
          <CardValue>75%</CardValue>
        </Card>
        <Card>
          <CardTitle>Pending Projects</CardTitle>
          <CardValue>5</CardValue>
        </Card>
      </OverviewContainer>

      {/* Data Collection and Visualization */}
      <DataContainer>
        {/* Building Maintenance Chart */}
        <SectionTitle>Building Maintenance Status</SectionTitle>
        <ChartContainer>
          <Bar data={buildingMaintenanceData} />
        </ChartContainer>

        {/* Ongoing Projects Timeline */}
        <SectionTitle>Ongoing Projects Timeline</SectionTitle>
        <ChartContainer>
          <Line data={projectTimelineData} />
        </ChartContainer>
      </DataContainer>
    </Dashboard_InfraContainer>
  );
};

export default Dashboard_Infra;
