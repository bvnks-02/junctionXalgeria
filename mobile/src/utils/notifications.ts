import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { Platform } from 'react-native';
import { Alert } from '../types';
import { COLORS, PARAMETER_UNITS } from './constants';
import { fetchAlerts } from '../api';

// Background task name for fetching alerts
export const BACKGROUND_FETCH_TASK = 'BACKGROUND_FETCH_ALERTS';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications
export async function registerForPushNotificationsAsync() {
  let token;

  // Request permission for notifications
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  // Get the token
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Push token:', token);

  // Set up notification channels for Android
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: COLORS.primary,
    });
  }

  return token;
}

// Determine alert severity based on parameter and value
export function getAlertSeverity(alert: Alert): 'info' | 'warning' | 'critical' {
  const paramConfig = PARAMETER_UNITS[alert.parameter];
  if (!paramConfig) return 'info';

  const { value } = alert;
  const { warningMin, warningMax, criticalMin, criticalMax } = paramConfig;

  // Check critical thresholds first
  if (
    (criticalMin !== undefined && value < criticalMin) ||
    (criticalMax !== undefined && value > criticalMax)
  ) {
    return 'critical';
  }

  // Then check warning thresholds
  if (
    (warningMin !== undefined && value < warningMin) ||
    (warningMax !== undefined && value > warningMax)
  ) {
    return 'warning';
  }

  // Default to info
  return 'info';
}

// Get color for alert severity
export function getAlertColor(severity: 'info' | 'warning' | 'critical'): string {
  switch (severity) {
    case 'critical':
      return COLORS.danger;
    case 'warning':
      return COLORS.warning;
    case 'info':
    default:
      return COLORS.info;
  }
}

// Send a notification for an alert
export async function sendAlertNotification(alert: Alert) {
  const severity = getAlertSeverity(alert);
  const color = getAlertColor(severity);
  const paramConfig = PARAMETER_UNITS[alert.parameter] || { label: alert.parameter, unit: '' };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${severity.toUpperCase()}: ${paramConfig.label} Alert`,
      body: `${paramConfig.label} value is ${alert.value} ${paramConfig.unit} in ${alert.pondId ? `Pond ${alert.pondId}` : 'a pond'}`,
      data: { alert },
      color,
    },
    trigger: null, // Send immediately
  });
}

// Register background task for fetching alerts
export function registerBackgroundFetchTask() {
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
      // Fetch alerts from the last 24 hours
      const alerts = await fetchAlerts();
      
      // Process new alerts and send notifications
      for (const alert of alerts) {
        // Add logic here to determine if this is a new alert that needs notification
        // For now, we'll just send a notification for each alert
        await sendAlertNotification(alert);
      }
      
      return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
      console.error('Background fetch failed:', error);
      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
  });
}