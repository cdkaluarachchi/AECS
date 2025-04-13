import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:8003';
const COUNSELLOR_API_GATEWAY_URL = 'http://localhost:8002';
const bookingService = {
  getMessages: async (counsellorId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/bookings/messages/${counsellorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw error.response ? error.response.data : { message: 'Failed to fetch messages' };
    }
  },

  sendMessage: async (counsellorId, text) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_GATEWAY_URL}/bookings/messages/${counsellorId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error.response ? error.response.data : { message: 'Failed to send message' };
    }
  },

  bookSession: async (counsellorId, dateTime, notes) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_GATEWAY_URL}/bookings/sessions`,
        { counsellorId, dateTime, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to book session:', error);
      throw error.response ? error.response.data : { message: 'Failed to book session' };
    }
  },

  getUserSessions: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/bookings/sessions/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user sessions:', error);
      throw error.response ? error.response.data : { message: 'Failed to fetch sessions' };
    }
  },

  getAllCounsellors: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${COUNSELLOR_API_GATEWAY_URL}/counsellors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch counsellors:', error);
      throw error.response ? error.response.data : { message: 'Failed to fetch counsellors' };
    }
  },

  getCounsellorSessions: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/bookings/sessions/counsellor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch counsellor sessions:', error);
      throw error.response ? error.response.data : { message: 'Failed to fetch counsellor appointments' };
    }
  },

};

export default bookingService;