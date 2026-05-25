import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    // Lanzar el error original de axios para que LoginPage.jsx pueda leer err.response.data.error
    throw error;
  }
};

const authService = {
  login
};

export default authService;
