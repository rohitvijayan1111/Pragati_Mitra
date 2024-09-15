import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import 'bootstrap/dist/css/bootstrap.min.css';

const sampleData = [
  {
    newBuildings: 'Engineering Block C',
    renovations: 'Library Expansion',
    campusExpansion: 'New Hostel Wing',
    newLab: 'Robotics Lab',
    equipmentPurchase: '3D Printers',
    utilityImprovements: 'Solar Panel Installation',
    technologyImprovement: 'Campus WiFi Upgrade',
    sustainabilityInitiatives: 'Rainwater Harvesting',
    futureDevelopment: 'Medical Research Center'
  },
  {
    newBuildings: 'Administrative Block B',
    renovations: 'Auditorium Renovation',
    campusExpansion: 'Student Center',
    newLab: 'AI Lab',
    equipmentPurchase: 'Advanced Servers',
    utilityImprovements: 'Water Purification Systems',
    technologyImprovement: 'Smart Classrooms',
    sustainabilityInitiatives: 'Green Roofs',
    futureDevelopment: 'New Sports Complex'
  }
];

const InfraDataTable = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleAddRecord = () => {
    navigate('Infrastructure'); // Navigate to the infra-form path
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Infrastructure Improvements Records</h2>
      
      {/* Add Record Button */}
      <Button className="mb-3" variant="primary" onClick={handleAddRecord}>
        Add New Record
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>New Buildings</th>
            <th>Renovations</th>
            <th>Campus Expansion</th>
            <th>New Lab</th>
            <th>Equipment Purchase</th>
            <th>Utility Improvements</th>
            <th>Technology Improvement</th>
            <th>Sustainability Initiatives</th>
            <th>Future Development Plans</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((data, index) => (
            <tr key={index}>
              <td>{data.newBuildings}</td>
              <td>{data.renovations}</td>
              <td>{data.campusExpansion}</td>
              <td>{data.newLab}</td>
              <td>{data.equipmentPurchase}</td>
              <td>{data.utilityImprovements}</td>
              <td>{data.technologyImprovement}</td>
              <td>{data.sustainabilityInitiatives}</td>
              <td>{data.futureDevelopment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InfraDataTable;
