import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Alert } from '../types';
import { COLORS, PARAMETER_UNITS } from '../utils/constants';
import { getAlertSeverity, getAlertColor } from '../utils/notifications';

interface AlertItemProps {
  alert: Alert;
  pondName?: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, pondName }) => {
  const { parameter, value, timestamp } = alert;
  const paramConfig = PARAMETER_UNITS[parameter] || { label: parameter, unit: '' };
  
  // Get severity and color
  const severity = getAlertSeverity(alert);
  const color = getAlertColor(severity);
  
  // Format the timestamp
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  
  return (
    <View style={[styles.container, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <View style={styles.severityContainer}>
          <View style={[styles.severityIndicator, { backgroundColor: color }]} />
          <Text style={[styles.severityText, { color }]}>
            {severity.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formattedDate} {formattedTime}</Text>
      </View>
      
      <Text style={styles.title}>{paramConfig.label}</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.value}>
          {value.toFixed(2)} {paramConfig.unit}
        </Text>
        {pondName && (
          <Text style={styles.pond}>Tank: {pondName}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  severityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  pond: {
    fontSize: 14,
    color: COLORS.lightText,
  },
});

export default AlertItem;