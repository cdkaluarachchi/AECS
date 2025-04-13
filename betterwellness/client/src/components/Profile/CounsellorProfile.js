import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

function CounsellorProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getCounsellorProfile(); 
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!profile) {
    return <p>No profile information available.</p>;
  }

  return (
    <div>
      <h2>Your Counsellor Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Specialization: {profile.role}</p>
      {/*  */}
    </div>
  );
}

export default CounsellorProfile;