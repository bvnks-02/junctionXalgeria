import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SensorReading } from '../types';
import { COLORS, PARAMETER_UNITS } from '../utils/constants';

interface MetricCardProps {
  reading: SensorReading;
}

const MetricCard: React.FC<MetricCardProps> = ({ reading }) => {
  const { parameter, value, timestamp } = reading;
  const paramConfig = PARAMETER_UNITS[parameter] || { label: parameter, unit: '', min: 0, max: 100 };
  
  // Calculate if the value is in warning or critical range
  const isWarning = (
    (paramConfig.warningMin !== undefined && value < paramConfig.warningMin) ||
    (paramConfig.warningMax !== undefined && value > paramConfig.warningMax)
  );
  
  const isCritical = (
    (paramConfig.criticalMin !== undefined && value < paramConfig.criticalMin) ||
    (paramConfig.criticalMax !== undefined && value > paramConfig.criticalMax)
  );
  
  // Determine the status color
  let statusColor = COLORS.success;
  if (isCritical) {
    statusColor = COLORS.danger;
  } else if (isWarning) {
    statusColor = COLORS.warning;
  }
  
  // Calculate the percentage for the progress bar
  const percentage = Math.max(0, Math.min(100, ((value - paramConfig.min) / (paramConfig.max - paramConfig.min)) * 100));
  
  // Format the timestamp
  const formattedTime = new Date(timestamp).toLocaleTimeString();
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{paramConfig.label}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={styles.value}>
          {value.toFixed(2)} <Text style={styles.unit}>{paramConfig.unit}</Text>
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View 
            style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: statusColor }]} 
          />
        </View>
      </View>
      
      <Text style={styles.timestamp}>Updated: {formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  valueContainer: {
    marginBottom: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  unit: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBackground: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.lightText,
    textAlign: 'right',
  },
});

export default MetricCard;