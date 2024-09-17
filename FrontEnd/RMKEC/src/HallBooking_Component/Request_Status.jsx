import React, { useState } from 'react';
import EventDetails from './EventDetails';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Request_Status.css';
import dayjs from 'dayjs';
import pending from '../assets/pending.png';
import { getTokenData } from '../Pages/authUtils';

const Request_Status = () => {
  const [eventData, setEventData] = useState([
    {
      id: 1,
      name: 'Annual Tech Symposium',
      speaker: 'Kanagavel',
      speaker_description: 'Expert in AI and Robotics',
      event_date: '2024-09-15',
      start_time: '10:00 AM',
      end_time: '04:00 PM',
      department: 'IT',
      hall_name: 'Main Auditorium',
      emails: ['example@domain.com'],
      participants: 150,
      incharge_faculty: 'Prof. Jane Smith',
      facility_needed: 'Projector, Microphones',
      approvals: {
        hod: true,
        academic_coordinator: true,
        principal: true
      }
    },
    {
      id: 2,
      name: 'Guest Lecture on Data Science',
      speaker: 'Gokul',
      speaker_description: 'Data Scientist at TechCorp',
      event_date: '2024-09-22',
      start_time: '11:00 AM',
      end_time: '01:00 PM',
      department: 'Data Science',
      hall_name: 'Conference Room 1',
      emails: ['example@domain.com'],
      participants: 80,
      incharge_faculty: 'Dr. Robert White',
      facility_needed: 'Projector',
      approvals: {
        hod: true,
        academic_coordinator: false,
        principal: false
      }
    }
  ]);

  const tokendata = getTokenData();
  const role = tokendata.role;
  const department = tokendata.department;

  const rolemapping = {
    'hod': "HOD",
    "academic_coordinator": "Academic Coordinator",
    "principal": "Principal",
    "Event Coordinator": "Event Coordinator"
  };

  const determineEndpoint = (userType) => {
    switch (userType) {
      case 'hod':
        return 'cancelEventByHOD';
      case 'academic_coordinator':
        return 'cancelEventByAcademicCoordinator';
      case 'principal':
        return 'cancelEventByPrincipal';
      case "Event Coordinator":
        return 'cancelEventByEventCoordinator';
      default:
        throw new Error('Invalid user type');
    }
  };

  const notifyFailure = (error) => {
    toast.info(error, {
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

  const handleDelete = async (event) => {
    try {
      // Simulating the deletion process
      setEventData(eventData.filter((e) => e.id !== event.id));

      const endpoint = determineEndpoint(role);
      const formattedDate = dayjs(event.event_date).format('MMMM DD, YYYY');
      const formContent = `
        Hall booking approval request for the event "${event.name}" scheduled on ${formattedDate} from ${event.start_time} to ${event.end_time} at ${event.hall_name} is cancelled by ${rolemapping[role]}.
        Event Name: ${event.name}
        Speaker: ${event.speaker}
        Speaker Description: ${event.speaker_description}
        Department: ${event.department}
        Participants: ${event.participants}
        In-charge Faculty: ${event.incharge_faculty}
        Facilities Needed: ${event.facility_needed}
      `;

      // Simulate sending email
      console.log(`Sending email to ${event.emails} with subject: ${formContent}`);

    } catch (error) {
      console.error('Error deleting event:', error);
      notifyFailure('Error deleting event');
    }
  };

  return (
    <div>
      <h1>Request Status</h1>
      {eventData.length === 0 ? (
        <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
          <img src={pending} alt="Error occurred" style={{ width: '50%', height: '50%' }} />
        </div>
      ) : (
        eventData.map((event, index) => (
          <div className='event-container' key={index}>
            {((role.toLowerCase() === 'hod' || role.toLowerCase() === 'event coordinator') ||
              (role.toLowerCase() === 'academic_coordinator' && event.approvals.hod) ||
              (role.toLowerCase() === 'principal' && event.approvals.hod && event.approvals.academic_coordinator)) && (
                <EventDetails 
                  needbutton={true} 
                  checkall={false} 
                  eventData={event} 
                  showdelete={true && role.toLowerCase() !== 'academic_coordinator' && role.toLowerCase() !== 'principal'} 
                  onDelete={() => handleDelete(event)} 
                />
            )}
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default Request_Status;
