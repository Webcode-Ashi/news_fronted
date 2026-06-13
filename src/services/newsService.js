import api from './api';

export const newsService = {
  getHome: () => api.get('/api/home'),
  getHero: () => api.get('/api/hero'),
  getLatestTop10: () => api.get('/api/latest-top10'),
  getBreaking: () => api.get('/api/breaking'),
  getWorldAtGlance: () => api.get('/api/world-at-glance'),
  
  getCategory: (category) => api.get(`/api/category/${category}`),
  
  getNewsBySlug: (slug) => api.get(`/api/news/${slug}`),
  getPerspectives: (slug) => api.get(`/api/news/${slug}/perspectives`),
  
  search: (query) => api.get(`/api/search`, { params: { q: query } }),
};
