import axios from 'axios';
import { Alert, AlertDTO, Pond, SensorReading, SensorReadingDTO } from '../types';

// Base URL for the API
const API_BASE_URL = 'https://f1419a489960.ngrok-free.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 1, // Skip ngrok browser warning
  },
});

// API functions
export const fetchPonds = async (): Promise<Pond[]> => {
  try {
    const response = await api.get('/Pond');
    return response.data;
  } catch (error) {
    console.error('Error fetching ponds:', error);
    throw error;
  }
};

export const fetchSensorReadings = async (query: SensorReadingDTO): Promise<SensorReading[]> => {
  try {
    const url = `/SensorReading?pondId=${query.pondId}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}&${query.parameter ? `parameter=${query.parameter}` : ''}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor readings:', error);
    throw error;
  }
};

export const fetchAlerts = async (query: AlertDTO, pondID?: number): Promise<Alert[]> => {
  try {
    const url = `/Alert?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`;
    const response = await api.get(url);
    
    // Filter alerts from the last 24 hours
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return response.data.filter((alert: Alert) => {
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