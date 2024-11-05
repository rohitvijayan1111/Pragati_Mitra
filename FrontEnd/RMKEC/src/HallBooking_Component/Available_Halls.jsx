import React, { useEffect, useState } from 'react';
import './Available_Details.css';
import Available_Details from './Available_Details';
import hallimage from '../assets/hall.jpeg';

function Available_Halls() {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetchHalls(); 
  }, []);

  const fetchHalls = async () => {
    try {
      // Dummy data for testing purposes
      const dummyHalls = [
        {
          id: 1,
          image_path: hallimage,
          hall: {
            name: 'Main Auditorium',
            location: 'Building A',
            capacity: 300,
            facilities: ['Projector', 'Sound System', 'Air Conditioning']
          }
        },
        {
          id: 2,
          image_path: hallimage,
          hall: {
            name: 'Conference Room',
            location: 'Building B',
            capacity: 100,
            facilities: ['Whiteboard', 'Video Conferencing']
          }
        },
        {
          id: 3,
          image_path: hallimage,
          hall: {
            name: 'Training Room',
            location: 'Building C',
            capacity: 50,
            facilities: ['Interactive Board', 'Projector']
          }
        }
      ];
  
      // Set dummy data to state
      setHalls(dummyHalls);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  return (
    <div className="krt">
      <div className="hall-details-container">
        {halls.map((hall) => (
          <Available_Details 
            key={hall.id} 
            hall={hall.hall} 
            image={hall.image_path} 
          />
        ))}
      </div>
    </div>
  );
}

export default Available_Halls;
