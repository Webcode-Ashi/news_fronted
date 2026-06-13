import api from './api';

export const newsletterService = {
  subscribe: (email) => api.post('/api/newsletter/subscribe', { email }),
};
