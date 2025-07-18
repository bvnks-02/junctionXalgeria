import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAlerts, fetchPonds } from '../api';
import { Alert, Pond } from '../types';
import { COLORS } from '../utils/constants';
import AlertItem from '../components/AlertItem';
import { getAlertSeverity } from '../utils/notifications';

interface AlertsScreenProps {
  navigation: any;
}

const AlertsScreen: React.FC<AlertsScreenProps> = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [ponds, setPonds] = useState<Record<number, string>>({});
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load ponds for mapping pond IDs to names
  const loadPonds = async () => {
    try {
      const pondsData = await fetchPonds();
      const pondsMap: Record<number, string> = {};
      pondsData.forEach(pond => {
        pondsMap[pond.id] = pond.name;
      });
      setPonds(pondsMap);
    } catch (err) {
      console.error('Error loading ponds:', err);
    }
  };

  // Load alerts from the last 24 hours
  const loadAlerts = async () => {
    try {
      const alertsData = await fetchAlerts();
      
      // Add severity to each alert
      const processedAlerts = alertsData.map(alert => ({
        ...alert,
        severity: getAlertSeverity(alert),
      }));
      
      // Sort by timestamp (newest first) and severity
      processedAlerts.sort((a, b) => {
        // First sort by severity (critical > warning > info)
        const severityOrder = { critical: 0, warning: 1, info: 2 };
        const severityDiff = severityOrder[a.severity!] - severityOrder[b.severity!];
        
        if (severityDiff !== 0) return severityDiff;
        
        // Then sort by timestamp (newest first)
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
      
      setAlerts(processedAlerts);
      setError(null);
    } catch (err) {
      console.error('Error loading alerts:', err);
      setError('Failed to load alerts. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    const loadData = async () => {
      await loadPonds();
      await loadAlerts();
    };
    loadData();
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        await loadPonds();
        await loadAlerts();
      };
      loadData();
    }, [])
  );

  // Handle manual refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPonds();
    await loadAlerts();
  };

  // Render an alert item
  const renderAlertItem = ({ item }: { item: Alert }) => (
    <AlertItem alert={item} pondName={ponds[item.pondId]} />
  );

  // Group alerts by date
  const groupAlertsByDate = () => {
    const grouped: Record<string, Alert[]> = {};
    
    alerts.forEach(alert => {
      const date = new Date(alert.timestamp).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(alert);
    });
    
    return grouped;
  };

  const groupedAlerts = groupAlertsByDate();
  const dates = Object.keys(groupedAlerts).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      
      {loading ? (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Loading alerts...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : alerts.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noAlertsText}>No alerts in the last 24 hours</Text>
        </View>
      ) : (
        <FlatList
          data={alerts}
          renderItem={renderAlertItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <Text style={styles.subtitle}>Last 24 hours</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.lightText,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.lightText,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: 'center',
  },
  noAlertsText: {
    fontSize: 16,
    color: COLORS.success,
    textAlign: 'center',
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
});

export default AlertsScreen;