
import React from 'react';
import { WeightRecord, TimePeriod } from '@/utils/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subMonths, subWeeks, subDays, isAfter, parseISO } from 'date-fns';

interface WeightChartProps {
  data: WeightRecord[];
  period: TimePeriod;
}

export const WeightChart: React.FC<WeightChartProps> = ({ data, period }) => {
  const formatDate = (date: Date) => {
    switch (period) {
      case 'daily':
        return format(date, 'dd MMM');
      case 'weekly':
        return format(date, 'dd MMM');
      case 'monthly':
        return format(date, 'MMM yyyy');
      case 'bimonthly':
        return format(date, 'MMM yyyy');
      default:
        return format(date, 'dd MMM yyyy');
    }
  };

  const filterDataByPeriod = (records: WeightRecord[]): WeightRecord[] => {
    const now = new Date();
    let cutoffDate: Date;

    switch (period) {
      case 'daily':
        cutoffDate = subDays(now, 14); // Show last 14 days
        break;
      case 'weekly':
        cutoffDate = subWeeks(now, 12); // Show last 12 weeks
        break;
      case 'monthly':
        cutoffDate = subMonths(now, 6); // Show last 6 months
        break;
      case 'bimonthly':
        cutoffDate = subMonths(now, 12); // Show last 12 months
        break;
      default:
        cutoffDate = subMonths(now, 1); // Default to 1 month
    }

    return records
      .filter(record => isAfter(record.date, cutoffDate))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const transformedData = filterDataByPeriod(data).map(record => ({
    date: formatDate(record.date),
    weight: record.weight,
    fullDate: record.date.toISOString(),
  }));

  return (
    <div className="h-64 sm:h-72 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={transformedData}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={['dataMin - 1', 'dataMax + 1']}
            tick={{ fontSize: 12 }}
            label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value} kg`, 'Weight']}
            labelFormatter={(label, items) => {
              const activeItem = items[0];
              if (activeItem && activeItem.payload) {
                const { fullDate } = activeItem.payload;
                return format(new Date(fullDate), 'PPPP');
              }
              return label;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
