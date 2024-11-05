import React, { useEffect, useState } from 'react';
import EventDetails from './EventDetails';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Past_Events.css';
import past from '../assets/nopast.png';
import { getTokenData } from '../Pages/authUtils';

function Past_Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState("");
  const tokendata = getTokenData();
  
  const notifyInfo = (message) => {
    toast.info(message, {
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

  const notifyFailure = (message) => {
    toast.error(message, {
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

  useEffect(() => {
    // Use dummy data instead of an API call
    const fetchPastEvents = () => {
      try {
        const dummyEvents = [
          {
            id: 1,
            name: "AI Conference 2023",
            speaker: "Dr.Kaviyarasu",
            speaker_description: "Expert in Artificial Intelligence",
            event_date: "2023-09-15",
            start_time: "09:00:00",
            end_time: "17:00:00",
            department: "IT",
            hall_name: "Main Hall",
            participants: 100,
            incharge_faculty: "Prof. John Smith",
            facility_needed: "Projector, Microphone",
            approvals: {
              hod: true,
              academic_coordinator: true,
              principal: true
            }
          },
          {
            id: 2,
            name: "Tech Talk on Blockchain",
            speaker: "Mr.Akil Cicil",
            speaker_description: "Blockchain Developer",
            event_date: "2023-08-22",
            start_time: "14:00:00",
            end_time: "16:00:00",
            department: "IT",
            hall_name: "Auditorium",
            participants: 50,
            incharge_faculty: "Dr. Emily White",
            facility_needed: "Laptop, Projector",
            approvals: {
              hod: true,
              academic_coordinator: true,
              principal: false
            }
          }
        ];
        

        setEvents(dummyEvents);
        setFilteredEvents(dummyEvents);
        setLoading(false);
      } catch (error) {
        notifyFailure('An unexpected error occurred.');
        console.error('Error fetching past events:', error);
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by event name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {filteredEvents.length === 0 &&
        <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
          <img src={past} alt="No past events" style={{ width: '50%', height: '50%' }} />
        </div>
      }

      {filteredEvents.map((event, index) => (
        <div className="event-container" key={index}>
          <EventDetails needbutton={false} eventData={event} showdelete={false} checkall={true} />
        </div>
      ))}

      <ToastContainer />
    </div>
  );
}

export default Past_Events;
