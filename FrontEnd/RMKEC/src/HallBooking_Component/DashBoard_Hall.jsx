import React, { useState, useEffect } from 'react';
import EventDetails from './EventDetails';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import dayjs from 'dayjs';
import 'react-toastify/dist/ReactToastify.css';
import './DashBoard_Hall.css';
import events from '../assets/events.png';
import { getTokenData } from '../Pages/authUtils';

function DashBoard_Hall() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokendata = getTokenData();
  const user = tokendata.role;
  const userDepartment = tokendata.department;
  const [name, setName] = useState("");

  const rolemapping = {
    'hod': "HOD",
    "academic_coordinator": "Academic Coordinator",
    "principal": "Principal",
    "Event Coordinator": "Event Coordinator"
  };

  const determineEndpoint = (userType) => {
    console.log("IN ENDPOINT " + userType);
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
      // Simulating the delete action
      setUpcomingEvents(upcomingEvents.filter((e) => e.id !== event.id));
      const endpoint = determineEndpoint(user);
      const formattedDate = dayjs(event.event_date).format('MMMM DD, YYYY');
      const formContent = `
        Hall booking approval request for the event "${event.name}" scheduled on ${formattedDate} from ${event.start_time} to ${event.end_time} at ${event.hall_name} is cancelled by ${rolemapping[user]}.
        Event Name: ${event.name}
        Speaker: ${event.speaker}
        Speaker Description: ${event.speaker_description}
        Department: ${event.department}
        Participants: ${event.participants}
        In-charge Faculty: ${event.incharge_faculty}
        Facilities Needed: ${event.facility_needed}
      `;

      // Simulating email sending
      console.log(`Sending email to ${event.emails} with content:\n${formContent}`);
    } catch (error) {
      console.error('Error deleting event:', error);
      notifyFailure('Error deleting event');
    }
  };

  useEffect(() => {
    // Dummy data
    const dummyEvents = [
      {
        id: 1,
        name: 'Annual Tech Conference',
        speaker: 'Likesh ',
        speaker_description: 'Expert in AI and Machine Learning',
        event_date: '2024-10-05',
        start_time: '10:00 AM',
        end_time: '04:00 PM',
        department: 'IT',
        hall_name: 'Main Auditorium',
        emails: ['example@domain.com'],
        participants: 150,
        incharge_faculty: 'Prof. Alice Johnson',
        facility_needed: 'Projector, Microphone',
        approvals: {
          hod: true,
          academic_coordinator: true,
          principal: false
        }
      },
      {
        id: 2,
        name: 'Guest Lecture on Cybersecurity',
        speaker: 'Rohit',
        speaker_description: 'Cybersecurity Expert',
        event_date: '2024-10-12',
        start_time: '11:00 AM',
        end_time: '01:00 PM',
        department: 'CS',
        hall_name: 'Room 101',
        emails: ['another@example.com'],
        participants: 80,
        incharge_faculty: 'Dr. Robert Green',
        facility_needed: 'None',
        approvals: {
          hod: true,
          academic_coordinator: false,
          principal: false
        }
      }
    ];

    setUpcomingEvents(dummyEvents);
    setLoading(false);
  }, []);

  return (
    <div className="dashboard-hall">
      <h1>Upcoming Events</h1>
      {loading ? (
        <div className='loading'>
          <p>Loading...</p>
        </div>
      ) : upcomingEvents.length === 0 ? (
        <div className='image'>
          <img src={events} width="50%" height="50%" alt="No events"/>
        </div>
      ) : (
        upcomingEvents.map((event, index) => {
          const canCancel = event.department === userDepartment;

          return (
            <div className="event-container" key={index}>
              <EventDetails
                checkall={true}
                onDelete={canCancel ? () => handleDelete(event) : null}
                showdelete={canCancel}
                eventData={event}
              />
            </div>
          );
        })
      )}
      <ToastContainer />
    </div>
  );
}

export default DashBoard_Hall;
