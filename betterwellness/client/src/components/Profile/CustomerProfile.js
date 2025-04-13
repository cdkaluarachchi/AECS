import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getCustomerProfile();
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
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        {error}
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center my-4">No profile information available.</p>;
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow w-50">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Your Profile</h4>
        </div>
        <div className="card-body">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
