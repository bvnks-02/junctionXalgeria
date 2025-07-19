# 🌊 Aqua Monitor

Aqua Monitor is a cross-platform mobile application designed to monitor fish pond health in real-time using virtual sensor data. Built in 48 hours during JunctionXAlgeria 2025, the project combines a React Native frontend with a robust ASP.NET Core backend to simulate sensor data, process alerts, and notify users about water quality anomalies.

## 🚀 Features

- 📱 **Cross-platform mobile app** (React Native + Expo)
- 💧 **Simulated IoT sensor readings** (temperature, pH, etc.)
- 🔔 **Real-time alerts** for abnormal conditions
- 📊 **Visual dashboards** for monitoring multiple ponds
- 📡 **Push notifications**
- 🧪 **Sensor data simulation** for testing without hardware

---

## 📱 Mobile App

### Built With:
- React Native (Expo)
- TypeScript
- Expo Notifications

### Screens:
- `HomeScreen`: Real-time overview of selected pond metrics
- `AlertsScreen`: List of triggered alerts
- Components include:
  - `MetricCard`
  - `AlertItem`
  - `PondSelector`

### Run Locally:
```bash
npm install
npx expo start
