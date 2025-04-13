import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../hooks/AuthContext';
import SessionList from '../components/Booking/SessionList';
import bookingService from '../services/bookingService';
import { Link } from 'react-router-dom';
function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [counsellorSessions, setCounsellorSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (user && user.role === 'counsellor') {
      const fetchCounsellorSessions = async () => {
        try {
          const data = await bookingService.getCounsellorSessions(); 
          setCounsellorSessions(data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch your appointments');
          setLoading(false);
          console.error(err);
        }
      };
      fetchCounsellorSessions();
    } else {
      setLoading(false); 
    }
  }, [user]);

  if (loading) {
    return <p>Loading dashboard information...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome, <b>{user.name || 'User'}</b>!</p>}
      
      {user && user.role === 'customer' && <SessionList />}
      {user && user.role === 'counsellor' && (
        <div>
          <h3>Your Appointments</h3>
          {counsellorSessions.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            <ul>
              {counsellorSessions.map((session) => (
                <li key={session._id}>
                  With: <b>{session.customerId && session.customerId.name ? session.customerId.name : 'Customer Info Unavailable'}</b>
                  <br></br>
                  Date/Time: <b>{new Date(session.dateTime).toLocaleString()}</b>
                  {session.notes && <p>Notes: {session.notes}</p>}
                  <button><Link to={`/chat/${session.customerId._id}`}>Message</Link></button>
                  {/* Add actions like "View Chat" or "Mark as Complete" if needed */}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;