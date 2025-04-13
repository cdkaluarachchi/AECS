import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:8000'; 

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_GATEWAY_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return error.response ? error.response.data : { message: 'Login failed due to network error' };
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_GATEWAY_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      return error.response ? error.response.data : { message: 'Registration failed due to network error' };
    }
  },
};

export default authService;