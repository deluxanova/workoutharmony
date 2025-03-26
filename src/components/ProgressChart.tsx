
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ProgressData } from '@/utils/types';

interface ProgressChartProps {
  data: ProgressData[];
  exercises: string[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, exercises }) => {
  const [selectedExercise, setSelectedExercise] = useState<string>(exercises[0]);
  
  const filteredData = data.filter(item => item.exercise === selectedExercise);
  
  return (
    <div className="glass-panel rounded-xl p-5 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {exercises.map((exercise) => (
          <button
            key={exercise}
            onClick={() => setSelectedExercise(exercise)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              selectedExercise === exercise
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {exercise}
          </button>
        ))}
      </div>
      
      <div className="h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis 
              yAxisId="weight"
              orientation="left"
              tick={{ fontSize: 12 }}
              label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <YAxis 
              yAxisId="reps"
              orientation="right"
              tick={{ fontSize: 12 }}
              label={{ value: 'Reps', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [value, name === 'weight' ? 'Weight (kg)' : 'Reps']}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              }}
            />
            <Legend />
            <Line 
              yAxisId="weight"
              type="monotone" 
              dataKey="weight" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              activeDot={{ r: 6 }}
              name="Weight"
            />
            <Line 
              yAxisId="reps"
              type="monotone" 
              dataKey="reps" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              name="Reps"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
