import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MetalTile from '../components/MetalTile';

const METALS = [
  { key: 'gold', label: 'Gold', unit: '24K' },
  { key: 'silver', label: 'Silver', unit: '999' },
  { key: 'palladium', label: 'Palladium', unit: 'Pure' },
  { key: 'platinum', label: 'Platinum', unit: 'Pure' },
];

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Live Metal Prices</Text>
      <View style={styles.grid}>
        {METALS.map(m => (
          <MetalTile
            key={m.key}
            metalKey={m.key}
            label={m.label}
            unit={m.unit}
            onPress={() => navigation.navigate('Detail', { metal: m.label, metalKey: m.key })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  grid: { width: '100%' },
});
