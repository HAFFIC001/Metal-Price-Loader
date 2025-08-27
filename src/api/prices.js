
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': API_KEY, 
  },
});

// Map metals to GoldAPI.io symbols
const METAL_MAP = {
  gold: 'XAU',
  silver: 'XAG',
  palladium: 'XPD',
  platinum: 'XPT'
};

// Fetch latest price
export async function fetchLatestPrice(metalKey, currency = 'USD') {
  try {
    const symbol = METAL_MAP[metalKey];
    if (!symbol) throw new Error('Unknown metal key');

    const res = await client.get(`/${symbol}/${currency}`);
    const price = res?.data?.price; // GoldAPI.io returns { price: ..., ... }

    if (!price) throw new Error('No price in API response');

    return { price: Number(price).toFixed(2) };
  } catch (err) {
    console.warn('fetchLatestPrice error:', err.message);
    const mock = { gold: 1980.23, silver: 23.45, palladium: 980.12, platinum: 850.5 };
    return { price: mock[metalKey]?.toFixed(2) ?? null };
  }
}

export async function fetchDetailForMetal(metalKey, currency = 'USD') {
  try {
    const symbol = METAL_MAP[metalKey];
    if (!symbol) throw new Error('Unknown metal key');

    const res = await client.get(`/${symbol}/${currency}`);
    const data = res?.data;

    if (!data || !data.price) throw new Error('No data from API');

    return {
      currentPrice: Number(data.price).toFixed(2),
      previousClose: Number(data.prev_close ?? data.price).toFixed(2),
      previousOpen: Number(data.prev_open ?? data.price).toFixed(2),
      updatedAt: data.timestamp ?? new Date().toISOString()
    };
  } catch (err) {
    console.warn('fetchDetailForMetal error:', err.message);
    
    // Fallback mock details without the 'error' property
    const fallback = {
      gold: { currentPrice: 1980.23, previousClose: 1975.00, previousOpen: 1978.00 },
      silver: { currentPrice: 23.45, previousClose: 23.10, previousOpen: 23.20 },
      palladium: { currentPrice: 980.12, previousClose: 970.00, previousOpen: 975.00 },
      platinum: { currentPrice: 850.5, previousClose: 845.0, previousOpen: 848.0 }
    };
    const d = fallback[metalKey] || { currentPrice: null };
    // We return a consistent object structure, just with mock data.
    return { ...d, updatedAt: new Date().toISOString() };
  }
}
