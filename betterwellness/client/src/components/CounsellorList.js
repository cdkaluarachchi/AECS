import React, { useContext, useState, useEffect } from 'react';
import counsellorService from '../services/counsellorService';
import CounsellorCard from './CounsellorCard';
import { AuthContext } from '../hooks/AuthContext';
function CounsellorList() {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const data = await counsellorService.getAllCounsellors();
        setCounsellors(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch counsellors');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCounsellors();
  }, []);

  if (loading) {
    return <p>Loading counsellors...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Our Counsellors</h2>
      <div className="counsellor-list">
        {counsellors.map((counsellor) => (

          <>{counsellor._id !== user.id ? <CounsellorCard key={counsellor._id} counsellor={counsellor} /> : <></>}</>
          
        ))}
      </div>
    </div>
  );
}

export default CounsellorList;