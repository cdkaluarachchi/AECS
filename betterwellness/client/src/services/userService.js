import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:8001';
const userService = {
  getCustomerProfile: async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail'); // Get email from localStorage
    const encodedEmail = encodeURIComponent(email);
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/users/customer/profile?email=${encodeURIComponent(email)}`, { 
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch customer profile:', error);
      throw error.response ? error.response.data : { message: 'Failed to fetch profile' };
    }
  },

  getCounsellorProfile: async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail'); // Get email from localStorage
    const encodedEmail = encodeURIComponent(email);
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/users/counsellor/profile?email=${encodeURIComponent(email)}`, { 
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch counsellor profile:', error);
      throw error.response ? error.response.data : { message: 'Failed to fetch profile' };
    }
  },
};

export default userService;