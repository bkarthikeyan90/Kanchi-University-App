import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth
  async verifyOTP(email: string, mobile: string, otp: string) {
    const fcmToken = (await Notifications.getExpoPushTokenAsync()).data;
    const response = await api.post('/api/auth/verify-otp', {
      email,
      mobile,
      otp,
      fcmToken,
    });
    return response.data;
  },

  // Homepage
  async getHomepage() {
    const response = await api.get('/api/homepage');
    return response.data;
  },

  // News
  async getNews(page = 1, limit = 10, search = '') {
    const response = await api.get('/api/news', {
      params: { page, limit, search, published: true },
    });
    return response.data;
  },

  async getNewsDetail(id: string) {
    const response = await api.get(`/api/news/${id}`);
    return response.data;
  },

  // Events
  async getEvents(page = 1, limit = 10, upcoming = false) {
    const response = await api.get('/api/events', {
      params: { page, limit, published: true, upcoming },
    });
    return response.data;
  },

  async getEventDetail(id: string) {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  },

  // Departments
  async getDepartments() {
    const response = await api.get('/api/departments', {
      params: { active: true },
    });
    return response.data;
  },

  async getDepartmentDetail(id: string) {
    const response = await api.get(`/api/departments/${id}`);
    return response.data;
  },

  // Courses
  async getCourses(departmentId?: string, level?: string) {
    const response = await api.get('/api/courses', {
      params: { departmentId, level, active: true },
    });
    return response.data;
  },

  // Faculty
  async getFaculty(departmentId?: string) {
    const response = await api.get('/api/faculty', {
      params: { departmentId, active: true },
    });
    return response.data;
  },

  // Gallery
  async getGallery(page = 1, limit = 20, albumId?: string) {
    const response = await api.get('/api/gallery', {
      params: { page, limit, published: true, albumId },
    });
    return response.data;
  },

  // Placements
  async getPlacements() {
    const response = await api.get('/api/placements', {
      params: { active: true },
    });
    return response.data;
  },

  // Examinations
  async getExaminations(upcoming = false) {
    const response = await api.get('/api/exams', {
      params: { published: true, upcoming },
    });
    return response.data;
  },

  // Circulars
  async getCirculars(page = 1, limit = 10) {
    const response = await api.get('/api/circulars', {
      params: { page, limit, published: true },
    });
    return response.data;
  },
};

