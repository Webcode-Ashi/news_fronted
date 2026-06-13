import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000, // 10s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // You can attach tokens here if needed in future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email) => {
    const response = await api.post('/api/auth/login', { email });
    return response.data;
  },
  verify: async (token) => {
    const response = await api.post('/api/auth/verify', { token });
    return response.data;
  }
};

// Response Interceptor for centralized error handling
api.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data object directly
  },
  (error) => {
    // Centralized error logging
    if (error.response) {
      console.error('API Error Response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('API No Response:', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
