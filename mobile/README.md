# Aqua Monitor Mobile App

## Overview

Aqua Monitor is a mobile application for monitoring aquaculture farm tanks. The app provides real-time monitoring of various sensor metrics, including pH, suspended solids, salinity, ammonia, nitrite, nitrate, and bacteria Cq values. It also displays alerts for abnormal sensor readings and sends push notifications even when the app is closed.

## Features

- **Real-time Monitoring**: Fetches sensor data every 5 seconds from the REST API
- **Tank Switching**: Easily switch between different tanks/ponds
- **Categorized Metrics**: Metrics are grouped by category (Water Quality, Nitrogen Cycle, Bacteria)
- **Visual Status Indicators**: Color-coded indicators show the status of each parameter
- **Alerts Page**: View alerts from the last 24 hours
- **Push Notifications**: Receive notifications for alerts even when the app is closed
  - Blue: Information alerts
  - Yellow: Warning alerts
  - Red: Critical alerts

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation
- Axios for API calls
- Expo Notifications for push notifications
- Expo Task Manager for background tasks

## Project Structure

```
mobile/
├── assets/                # App icons and images
├── src/
│   ├── api/              # API service functions
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions and constants
├── App.tsx               # Main app component
├── app.json              # Expo configuration
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
2. Navigate to the mobile directory: `cd mobile`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm start` or `yarn start`
5. Use the Expo Go app on your mobile device to scan the QR code and run the app

### Configuration

The API base URL is configured in `src/api/index.ts`. Update this URL if your API endpoint changes.

## API Integration

The app integrates with the following API endpoints:

- `GET /api/pond` - Get all ponds/tanks
- `GET /api/sensorreading/{pondId}` - Get sensor readings for a specific pond
- `GET /api/alert` - Get alerts from the last 24 hours

## License

This project is part of the JunctionX Algeria hackathon.