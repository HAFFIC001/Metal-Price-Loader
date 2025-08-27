import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchLatestPrice } from '../api/prices';

export default function MetalTile({ metalKey, label, unit, onPress }) {
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchLatestPrice(metalKey)
      .then(res => {
        if (!mounted) return;
        setPrice(res.price ?? null);
        setError(res.error ?? null);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err.message || 'Error');
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [metalKey]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.tile} activeOpacity={0.8}>
      <Text style={styles.title}>{label} ({unit})</Text>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : error ? (
        <Text style={styles.error}>Error</Text>
      ) : (
        <Text style={styles.price}>{price != null ? `USD ${price}` : '—'}</Text>
      )}
      <Text style={styles.small}>Updated: {new Date().toLocaleTimeString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: '700' },
  small: { fontSize: 12, color: '#666', marginTop: 8 },
  error: { color: 'red' },
});
