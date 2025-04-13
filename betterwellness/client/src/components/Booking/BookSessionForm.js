import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookingService from '../../services/bookingService';

function BookSessionForm() {
  const [counsellorId, setCounsellorId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [counsellors, setCounsellors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const data = await bookingService.getAllCounsellors();
        setCounsellors(data);
      } catch (err) {
        setError('Failed to load counsellors');
        console.error(err);
      }
    };

    fetchCounsellors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!counsellorId) {
      setError('Please select a counsellor');
      return;
    }
    try {
      const response = await bookingService.bookSession(counsellorId, dateTime, notes);
      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'Failed to book session');
      }
    } catch (err) {
      setError('An error occurred while booking');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Book a Session</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="counsellorId">Select Counsellor:</label>
          <select
            id="counsellorId"
            value={counsellorId}
            onChange={(e) => setCounsellorId(e.target.value)}
            required
          >
            <option value="">Select a counsellor</option>
            {counsellors.map((counsellor) => (
              <option key={counsellor._id} value={counsellor._id}>
                {counsellor.name} {counsellor.specialization ? `(${counsellor.specialization})` : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="notes">Additional Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookSessionForm;