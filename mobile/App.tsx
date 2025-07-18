import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AlertsScreen from './src/screens/AlertsScreen';

// Utils
import { COLORS } from './src/utils/constants';
import { registerForPushNotificationsAsync, registerBackgroundFetchTask, BACKGROUND_FETCH_TASK } from './src/utils/notifications';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  const [notificationToken, setNotificationToken] = useState<string | undefined>(undefined);

  // Register for push notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setNotificationToken(token);
      }
    });
  }, []);

  // Register background task for fetching alerts
  useEffect(() => {
    const registerBackgroundTask = async () => {
      // Register the task handler
      registerBackgroundFetchTask();

      // Check if the task is already registered
      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
      
      if (!isRegistered) {
        // Register the task
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
          minimumInterval: 15 * 60, // 15 minutes in seconds
          stopOnTerminate: false,
          startOnBoot: true,
        });
        console.log('Background fetch task registered');
      } else {
        console.log('Background fetch task already registered');
      }
    };

    registerBackgroundTask();

    return () => {
      // Clean up task when component unmounts
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
        .catch((err: Error) => console.log('Failed to unregister background task:', err));
    };
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'water' : 'water-outline';
            } else if (route.name === 'Alerts') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.lightText,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopColor: COLORS.border,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Alerts" component={AlertsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}