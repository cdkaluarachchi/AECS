import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import CounsellorList from './components/CounsellorList';
import ChatInterface from './components/Messaging/ChatInterface';
import BookSessionForm from './components/Booking/BookSessionForm';
import CustomerProfile from './components/Profile/CustomerProfile';
import CounsellorProfile from './components/Profile/CounsellorProfile';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';
import './App.css';
import { AuthProvider } from './hooks/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/counsellors" element={<PrivateRoute><CounsellorList /></PrivateRoute>} />
            <Route path="/chat/:counsellorId" element={<PrivateRoute><ChatInterface /></PrivateRoute>} />
            <Route path="/book/:counsellorId" element={<PrivateRoute><BookSessionForm /></PrivateRoute>} />
            <Route path="/profile/customer" element={<PrivateRoute><CustomerProfile /></PrivateRoute>} />
            <Route path="/profile/counsellor" element={<PrivateRoute><CounsellorProfile /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;