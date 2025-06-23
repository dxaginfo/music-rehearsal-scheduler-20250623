import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Set up axios interceptors for handling tokens
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authService = {
  // Login user
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Register user
  register: async (firstName, lastName, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('token');
    return { success: true };
  },

  // Check auth status
  checkAuthStatus: async () => {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/auth/profile`, userData);
    return response.data;
  },

  // Request password reset
  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  },

  // Reset password with token
  resetPassword: async (token, password) => {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      password,
    });
    return response.data;
  },
};

export default authService;
