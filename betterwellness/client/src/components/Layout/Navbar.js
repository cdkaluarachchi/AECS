import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../hooks/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/counsellors">Counsellors</Link></li>
            {user && user.role === 'customer' && <li><Link to="/profile/customer">Profile</Link></li>}
            {user && user.role === 'counsellor' && <li><Link to="/profile/counsellor">Profile</Link></li>}
            <li><button onClick={handleLogout}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;