import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../hooks/AuthContext';
import SessionList from '../components/Booking/SessionList';
import bookingService from '../services/bookingService';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [counsellorSessions, setCounsellorSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'counsellor') {
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

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-3">{error}</div>
    );

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-lg border-0 p-4">
          <h2 className="text-center mb-3 text-primary">Dashboard</h2>

          {user && (
            <p className="text-center fs-5 mb-4">
              Welcome, <strong className="text-success">{user.name || 'User'}</strong>!
            </p>
          )}

          {user?.role === 'customer' && <SessionList />}

          {user?.role === 'counsellor' && (
            <div>
              <h4 className="text-secondary mb-3">Your Appointments</h4>
              {counsellorSessions.length === 0 ? (
                <div className="alert alert-info mt-3">No upcoming appointments.</div>
              ) : (
                <div className="row row-cols-1 g-3 mt-3">
                  {counsellorSessions.map((session) => (
                    <div className="col" key={session._id}>
                      <div className="card border shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">
                            <i className="bi bi-person-fill me-2"></i>
                            {session.customerId?.name || 'Customer Info Unavailable'}
                          </h5>

                          <p className="card-text d-flex align-items-center">
                            <i className="bi bi-calendar-event me-2 text-primary" />
                            <strong className="me-2">Date/Time:</strong>
                            <span className="badge bg-primary">
                              {new Date(session.dateTime).toLocaleString()}
                            </span>
                          </p>

                          {session.notes && (
                            <div className="alert alert-info p-2">
                              <strong>Notes:</strong> {session.notes}
                            </div>
                          )}

                          <div className="d-flex gap-2 mt-3">
                            <Link
                              to={`/chat/${session.customerId?._id}`}
                              className="btn btn-outline-success btn-sm"
                            >
                              <i className="bi bi-chat-dots me-1" />
                              Message
                            </Link>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
