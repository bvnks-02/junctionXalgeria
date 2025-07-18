export interface SensorReading {
  id: number;
  parameter: string;
  value: number;
  timestamp: string;
  pondId: number;
}

export interface Alert {
  id: number;
  parameter: string;
  value: number;
  timestamp: string;
  pondId: number;
  severity?: 'info' | 'warning' | 'critical';
}

export interface Pond {
  id: number;
  name: string;
}

export interface Threshold {
  id: number;
  parameter: string;
  minValue: number;
  maxValue: number;
  pondId: number;
}

export type ParameterUnit = {
  unit: string;
  label: string;
  min: number;
  max: number;
  warningMin?: number;
  warningMax?: number;
  criticalMin?: number;
  criticalMax?: number;
};