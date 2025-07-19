import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { fetchPonds, fetchSensorReadings } from '../api';
import { Pond, SensorReading } from '../types';
import { COLORS, REFRESH_INTERVAL, PARAMETER_CATEGORIES, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../utils/constants';
import MetricCard from '../components/MetricCard';
import PondSelector from '../components/PondSelector';

interface HomeScreenProps {
  navigation: any;
}



const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [selectedPondId, setSelectedPondId] = useState<number | null>(null);
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch ponds
  const loadPonds = async () => {
    try {
      const pondsData = await fetchPonds();
      setPonds(pondsData);
      
      // Select the first pond by default if none is selected
      if (pondsData.length > 0 && selectedPondId === null) {
        setSelectedPondId(pondsData[0].id);
      }
    } catch (err) {
      console.error('Error loading ponds:', err);
      setError('Failed to load tanks. Please try again.');
    }
  };

  // Function to fetch sensor readings for the selected pond
  const loadReadings = async () => {
    if (selectedPondId === null) return;
    
    try {
      const readingsData = await fetchSensorReadings({ pondId: selectedPondId, pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE });
      setReadings(readingsData);
      setError(null);
    } catch (err) {
      console.error('Error loading readings:', err);
      setError('Failed to load sensor data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    loadPonds();
  }, []);

  // Load readings when selected pond changes
  useEffect(() => {
    if (selectedPondId !== null) {
      loadReadings();
    }
  }, [selectedPondId]);

  // Set up periodic refresh
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedPondId !== null) {
        loadReadings();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [selectedPondId]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadPonds();
      if (selectedPondId !== null) {
        loadReadings();
      }
    }, [selectedPondId])
  );

  // Handle manual refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPonds();
    if (selectedPondId !== null) {
      await loadReadings();
    } else {
      setRefreshing(false);
    }
  };

  // Group readings by parameter category
  const groupedReadings: Record<string, SensorReading[]> = {};
  
  Object.keys(PARAMETER_CATEGORIES).forEach(category => {
    const categoryParameters = PARAMETER_CATEGORIES[category as keyof typeof PARAMETER_CATEGORIES];
    const categoryReadings = readings.filter(reading => 
      categoryParameters.includes(reading.parameter)
    );
    
    if (categoryReadings.length > 0) {
      groupedReadings[category] = categoryReadings;
    }
  });

  // Handle pond selection
  const handlePondSelect = (pondId: number) => {
    setSelectedPondId(pondId);
    setLoading(true);
  };

  // Navigate to alerts screen
  const navigateToAlerts = () => {
    navigation.navigate('Alerts');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aqua Monitor</Text>
        <TouchableOpacity 
          style={styles.alertButton}
          onPress={navigateToAlerts}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      {ponds.length > 0 && (
        <PondSelector 
          ponds={ponds} 
          selectedPondId={selectedPondId} 
          onSelectPond={handlePondSelect} 
        />
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading sensor data...</Text>
          </View>
        ) : (
          Object.keys(groupedReadings).map(category => (
            <View key={category} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {groupedReadings[category].map(reading => (
                <MetricCard key={`${reading.parameter}-${reading.id}`} reading={reading} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  alertButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.lightText,
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FEE8E8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    marginBottom: 8,
  },
  retryButton: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.danger,
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  categoryContainer: {
    marginTop: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 16,
    marginBottom: 8,
  },
});

export default HomeScreen;