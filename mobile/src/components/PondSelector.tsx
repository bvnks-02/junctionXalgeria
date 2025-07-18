import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Pond } from '../types';
import { COLORS } from '../utils/constants';

interface PondSelectorProps {
  ponds: Pond[];
  selectedPondId: number | null;
  onSelectPond: (pondId: number) => void;
}

const PondSelector: React.FC<PondSelectorProps> = ({ ponds, selectedPondId, onSelectPond }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Tank:</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {ponds.map((pond) => (
          <TouchableOpacity
            key={pond.id}
            style={[
              styles.pondButton,
              selectedPondId === pond.id && styles.selectedPondButton
            ]}
            onPress={() => onSelectPond(pond.id)}
          >
            <Text 
              style={[
                styles.pondButtonText,
                selectedPondId === pond.id && styles.selectedPondButtonText
              ]}
            >
              {pond.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  pondButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginHorizontal: 4,
  },
  selectedPondButton: {
    backgroundColor: COLORS.primary,
  },
  pondButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  selectedPondButtonText: {
    color: COLORS.secondary,
  },
});

export default PondSelector;