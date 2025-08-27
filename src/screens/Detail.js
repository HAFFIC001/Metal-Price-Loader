import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { fetchDetailForMetal } from '../api/prices';
import moment from 'moment';

export default function Detail({ route }) {
  const { metal, metalKey } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchDetailForMetal(metalKey)
      .then(res => {
        if (!mounted) return;
        setData(res);
        setError(res?.error ?? null);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err.message || 'Error fetching details');
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [metalKey]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={styles.center}><Text style={{color:'red'}}>{error}</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{metal} — Details</Text>
      <View style={styles.row}><Text style={styles.label}>Today's Date:</Text><Text style={styles.value}>{moment().format('YYYY-MM-DD')}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Current Price:</Text><Text style={styles.value}>{data.currentPrice != null ? `USD ${data.currentPrice}` : '—'}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Previous Close:</Text><Text style={styles.value}>{data.previousClose != null ? `USD ${data.previousClose}` : '—'}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Previous Open:</Text><Text style={styles.value}>{data.previousOpen != null ? `USD ${data.previousOpen}` : '—'}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Last Updated:</Text><Text style={styles.value}>{data.updatedAt ? moment(data.updatedAt).format('YYYY-MM-DD HH:mm:ss') : '—'}</Text></View>
      <View style={{height:40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex:1, justifyContent:'center', alignItems:'center' },
  container: { padding:16 },
  heading: { fontSize:22, fontWeight:'700', marginBottom:12 },
  row: { flexDirection:'row', justifyContent:'space-between', paddingVertical:10, borderBottomWidth:1, borderColor:'#eee' },
  label: { fontSize:16, color:'#333' },
  value: { fontSize:16, fontWeight:'600' }
});
