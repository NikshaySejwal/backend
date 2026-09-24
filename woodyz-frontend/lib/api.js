import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'
);

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const resolveAssetUrl = (assetUrl) => {
  if (!assetUrl || /^https?:\/\//i.test(assetUrl)) return assetUrl;
  return `${API_BASE_URL}${assetUrl.startsWith('/') ? assetUrl : `/${assetUrl}`}`;
};

// Auto-attach auth token on client-side requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper for server-side requests (SSR)
export const getApiServer = () => {
  const serverApi = axios.create({
    baseURL: API_BASE_URL,
  });
  // Note: For SSR, you'd typically pass the token from props if available
  return serverApi;
};

export { API_BASE_URL };
export default api;
