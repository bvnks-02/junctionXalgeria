import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://0a1296f68526.ngrok-free.app/swagger/index.html';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 1, // Skip ngrok browser warning
  },
});

// API functions
export const fetchPonds = async () => {
  try {
    const response = await api.get('/Pond');
    return response.data;
  } catch (error) {
    console.error('Error fetching ponds:', error);
    throw error;
  }
};

export const fetchSensorReadings = async (query) => {
  try {
    const url = `/SensorReading?pondId=${query.pondId}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}&${query.parameter ? `parameter=${query.parameter}` : ''}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor readings:', error);
    throw error;
  }
};

export const fetchAlerts = async (query, pondID) => {
  try {
    const url = `/Alert?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`;
    const response = await api.get(url);
    
    // Filter alerts from the last 24 hours
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return response.data.filter((alert) => {
      const alertDate = new Date(alert.timestamp);
      return alertDate >= oneDayAgo && (!pondID || alert.pondId === pondID);
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export default {
  fetchPonds,
  fetchSensorReadings,
  fetchAlerts,
};
  