import { ParameterUnit } from '../types';

// Colors
export const COLORS = {
  primary: '#1761B0', // From the logo
  secondary: '#F8F9FA', // From the logo
  background: '#FFFFFF',
  text: '#333333',
  lightText: '#777777',
  border: '#DDDDDD',
  success: '#28A745',
  warning: '#FFC107',
  danger: '#DC3545',
  info: '#17A2B8',
};

// Refresh interval in milliseconds (5 seconds)
export const REFRESH_INTERVAL = 5000;

// Background fetch interval for alerts (15 minutes)
export const BACKGROUND_FETCH_INTERVAL = 15 * 60 * 1000;

// Parameter units and thresholds
export const PARAMETER_UNITS: Record<string, ParameterUnit> = {
  Temperature: {
    unit: '°C',
    label: 'Temperature',
    min: 0,
    max: 40,
    warningMin: 18,
    warningMax: 32,
    criticalMin: 15,
    criticalMax: 35,
  },
  pH: {
    unit: '',
    label: 'pH',
    min: 0,
    max: 14,
    warningMin: 6.0,
    warningMax: 8.5,
    criticalMin: 5.5,
    criticalMax: 9.0,
  },
  DissolvedOxygen: {
    unit: 'mg/L',
    label: 'Dissolved Oxygen',
    min: 0,
    max: 20,
    warningMin: 4,
    criticalMin: 3,
  },
  Turbidity: {
    unit: 'NTU',
    label: 'Turbidity',
    min: 0,
    max: 100,
    warningMax: 30,
    criticalMax: 50,
  },
  Salinity: {
    unit: 'ppt',
    label: 'Salinity',
    min: 0,
    max: 40,
    warningMax: 35,
    criticalMax: 38,
  },
  WaterLevel: {
    unit: 'cm',
    label: 'Water Level',
    min: 0,
    max: 500,
    warningMin: 100,
    criticalMin: 50,
  },
  FlowRate: {
    unit: 'L/min',
    label: 'Flow Rate',
    min: 0,
    max: 100,
    warningMin: 10,
    criticalMin: 5,
  },
  Ammonia: {
    unit: 'mg/L',
    label: 'Ammonia',
    min: 0,
    max: 10,
    warningMax: 1.0,
    criticalMax: 2.0,
  },
  Nitrite: {
    unit: 'mg/L',
    label: 'Nitrite',
    min: 0,
    max: 10,
    warningMax: 0.5,
    criticalMax: 1.0,
  },
  Nitrate: {
    unit: 'mg/L',
    label: 'Nitrate',
    min: 0,
    max: 200,
    warningMax: 100,
    criticalMax: 150,
  },
  // Bacteria Cq values (lower is worse - more bacteria)
  AeromonasHydrophila: {
    unit: 'Cq',
    label: 'Aeromonas Hydrophila',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  StreptococcusIniae: {
    unit: 'Cq',
    label: 'Streptococcus Iniae',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  FrancisellaOrientalis: {
    unit: 'Cq',
    label: 'Francisella Orientalis',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  Flavobacterium: {
    unit: 'Cq',
    label: 'Flavobacterium',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  VibrioSpp: {
    unit: 'Cq',
    label: 'Vibrio Spp',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  PseudomonasSpp: {
    unit: 'Cq',
    label: 'Pseudomonas Spp',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  LactococcusGarvieae: {
    unit: 'Cq',
    label: 'Lactococcus Garvieae',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  ProvidenciaVermicola: {
    unit: 'Cq',
    label: 'Providencia Vermicola',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
  StaphylococcusSpp: {
    unit: 'Cq',
    label: 'Staphylococcus Spp',
    min: 0,
    max: 40,
    warningMin: 25,
    criticalMin: 20,
  },
};

// Group parameters by category
export const PARAMETER_CATEGORIES = {
  'Water Quality': ['Temperature', 'pH', 'DissolvedOxygen', 'Turbidity', 'Salinity', 'WaterLevel', 'FlowRate'],
  'Nitrogen Cycle': ['Ammonia', 'Nitrite', 'Nitrate'],
  'Bacteria': [
    'AeromonasHydrophila', 'StreptococcusIniae', 'FrancisellaOrientalis', 'Flavobacterium', 
    'VibrioSpp', 'PseudomonasSpp', 'LactococcusGarvieae', 'ProvidenciaVermicola', 'StaphylococcusSpp'
  ],
};