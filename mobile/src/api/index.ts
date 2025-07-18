import axios from 'axios';
import { Alert, Pond, SensorReading } from '../types';

// Base URL for the API
const API_BASE_URL = 'https://f1419a489960.ngrok-free.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const fetchPonds = async (): Promise<Pond[]> => {
  try {
    const response = await api.get('/pond');
    return response.data;
  } catch (error) {
    console.error('Error fetching ponds:', error);
    throw error;
  }
};

export const fetchSensorReadings = async (pondId?: number): Promise<SensorReading[]> => {
  try {
    const url = pondId ? `/sensorreading/${pondId}` : '/sensorreading';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor readings:', error);
    throw error;
  }
};

export const fetchAlerts = async (pondId?: number): Promise<Alert[]> => {
  try {
    const url = pondId ? `/alert/${pondId}` : '/alert';
    const response = await api.get(url);
    
    // Filter alerts from the last 24 hours
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return response.data.filter((alert: Alert) => {
      const alertDate = new Date(alert.timestamp);
      return alertDate >= oneDayAgo;
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