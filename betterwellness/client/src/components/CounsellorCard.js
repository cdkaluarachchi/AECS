import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContext';
function CounsellorCard({ counsellor }) {
  const { user } = useContext(AuthContext);
  return (
    <div className="counsellor-card">
      <h3>{counsellor.name}</h3>
      <p>Specialization: {counsellor.role}</p>
      <button><Link to={`/chat/${counsellor._id}`}>Message</Link></button>
      <br></br>
      {user.role === 'counsellor' ? <></>: <button><Link to={`/book/${counsellor._id}`}>Book Session</Link></button>}
      
    </div>
  );
}

export default CounsellorCard;