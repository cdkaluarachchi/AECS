import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function CounsellorCard({ counsellor }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body">
        <h5 className="card-title text-primary">{counsellor.name}</h5>
        <p className="card-text">
          <strong>Specialization:</strong> {counsellor.role}
        </p>
        <div className="d-flex gap-2">
          <Link to={`/chat/${counsellor._id}`} className="btn btn-outline-success btn-sm">
            Message
          </Link>
          {user.role !== 'counsellor' && (
            <Link to={`/book/${counsellor._id}`} className="btn btn-primary btn-sm">
              Book Session
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CounsellorCard;
