
# 🌊 Aqua Monitor

**Aqua Monitor** is a cross-platform aquaculture monitoring system built in 48 hours at **JunctionXAlgeria 2025**. It enables real-time fish pond health monitoring through virtual sensor data, alerting, and pathogen detection via a simulated qPCR module.

The platform combines:
- 📱 A mobile app (React Native + Expo)
- ⚙️ A backend (ASP.NET Core + EF Core + SQLite)
- 🌐 A web admin interface (Next.js, optional)
- 🧪 Simulated sensors and mock qPCR module

---

## 🚀 Features

- **Mobile App (React Native + Expo)**  
  - Real-time overview of pond metrics  
  - Push notifications for alerts  
  - Multi-pond selection with graphs  

- **Backend API (.NET Core)**  
  - RESTful API for readings, alerts, thresholds, and ponds  
  - Alert engine with dynamic thresholds  
  - Mocked sensor and qPCR data generation  
  - SQLite persistence with EF Core  

- **Sensor Simulation**  
  - Background task simulating temperature, pH, ammonia, nitrate, nitrite  
  - Periodic alert generation when thresholds are breached  

---

## 📁 Project Structure

```
.
├── junctionXalgeria.sln           # Solution file (optional global)
├── mobile/                        # React Native Expo app
├── server/                        # ASP.NET Core backend
├── web/                           # Optional frontend (Next.js)
└── README.md                      # This file
```

---

## 📱 Mobile App

### Built With
- React Native (Expo)
- TypeScript
- Expo Notifications

### Key Screens
- **HomeScreen**: Real-time metric cards (temperature, pH, ammonia, etc.)
- **AlertsScreen**: View all triggered alerts
- **PondSelector**: Dropdown to switch between ponds

### Components
- `MetricCard`, `AlertItem`, `PondSelector`, `SensorTrendGraph`

### Run Mobile App Locally

```bash
cd mobile
npm install
npx expo start
```

To enable push notifications:
1. Use Expo Go on your physical device (Android or iOS)
2. Register for Expo push token in `App.tsx`

---

## ⚙️ Backend Server (ASP.NET Core 9)

### Stack
- ASP.NET Core 9 (Minimal API)
- Entity Framework Core
- SQLite (`ponds.db` file)

### Key Endpoints

| Route                               | Description                  |
|------------------------------------|------------------------------|
| GET `/api/sensorreading`           | Get latest readings          |
| GET `/api/alert`                   | List alerts                  |
| GET `/api/threshold`               | Configured thresholds        |
| GET `/api/pond`                    | Pond metadata                |

### Sensor Simulation

- Runs in background every minute (`SensorsMock/SensorSimulator.cs`)
- Generates values and triggers alerts if outside configured thresholds

### Run Server Locally

```bash
cd server
dotnet run dev
```

By default, runs on: `http://localhost:5000`

You can test endpoints via `server.http` or Swagger (auto-enabled in development).

---

## 🧪 qPCR Simulation (Part of Server)

- Every 60 minutes (configurable), mock Cq values are generated
- Evaluates simulated detection of pathogens: *Streptococcus*, *Aeromonas*, *TiLV*
- Thresholds hardcoded in `Service/PcrAnalyzer.cs`

---

## 🌐 Web Admin Panel (Optional)

### Built With
- Next.js
- Tailwind CSS
- React Charts

### Usage
A read-only frontend for dashboards and visualizing trends. Not necessary for main functionality.

```bash
cd web
npm install
npm run dev
```

Runs at: `http://localhost:3000`

---

## 🛠 Configuration Files

- `server/appsettings.json` – General config
- `server/ponds.db` – SQLite database
- `mobile/app.json` – App name, Expo config
- `mobile/assets/` – Icons, images, logos

---

## 🧪 Testing Without Hardware

No hardware is needed. Sensors and qPCR results are simulated:

- Modify thresholds in the database manually or via backend
- Restart server to reset fake values
- Watch alerts trigger in mobile or Swagger UI

---

## 🧠 Contributors

Built by Team **Ingeniums** during JunctionXAlgeria 2025  
Contact: [yourname@example.com] or [LinkedIn link]

---

## 📚 References

- Liberty16 by [Ubiquitome](https://www.ubi.com/products/liberty16/)
- Lo et al., 2023 – Aquaculture Pathogen Database  
- Rieder et al., 2025 – eDNA Pathogen Detection in Aquaculture  
- Benedicenti et al., 2024 – eDNA/eRNA Sampling in Salmon Farming  
