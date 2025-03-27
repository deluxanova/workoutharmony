
import { WeightRecord } from './types';
import { subDays } from 'date-fns';

// Generate some mock weight data for the past few months
const generateMockWeightData = (): WeightRecord[] => {
  const now = new Date();
  const records: WeightRecord[] = [];
  
  // Starting weight
  let currentWeight = 80.5;
  
  // Generate 90 days of data with some variation and gaps
  for (let i = 90; i >= 0; i -= 2) {
    // Skip some days to make the data more realistic
    if (i % 7 === 0) continue;
    
    // Add some random variation (between -0.3 and +0.3)
    const variation = (Math.random() * 0.6) - 0.3;
    
    // General downward trend
    const trendChange = -0.03;
    
    currentWeight += variation + trendChange;
    
    // Ensure weight doesn't go too low
    currentWeight = Math.max(currentWeight, 70);
    
    records.push({
      id: `weight-${i}`,
      date: subDays(now, i),
      weight: parseFloat(currentWeight.toFixed(1)),
      notes: i % 15 === 0 ? 'After workout' : undefined,
    });
  }
  
  return records;
};

export const mockWeightData: WeightRecord[] = generateMockWeightData();
