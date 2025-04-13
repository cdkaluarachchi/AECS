import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingService from '../../services/bookingService';

function BookSessionForm() {
  const { counsellorId } = useParams();
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
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