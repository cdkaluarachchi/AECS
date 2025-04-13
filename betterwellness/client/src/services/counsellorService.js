import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:8002';

const counsellorService = {
  getAllCounsellors: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_GATEWAY_URL}/counsellors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch counsellors:', error);
      throw error.response ? error.response.data : { message: 'Failed to fetch counsellors' };
    }
  },
};

export default counsellorService;