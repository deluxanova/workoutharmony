
import { useState } from 'react';
import { ProgressChart } from '@/components/ProgressChart';
import { progressData } from '@/utils/mockData';
import { Activity, Calendar, TrendingUp } from 'lucide-react';

const Progress = () => {
  const uniqueExercises = Array.from(new Set(progressData.map(item => item.exercise)));
  
  // Calculate statistics
  const workoutCount = 23;  // In a real app, this would be calculated from data
  const currentStreak = 4;   // In a real app, this would be calculated from data
  const bestStreak = 12;     // In a real app, this would be calculated from data
  
  return (
    <div className="page-transition pt-6 pb-16 md:py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Your Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel rounded-xl p-5 animate-fade-in">
          <div className="flex items-center mb-3">
            <Activity className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-medium">Total Workouts</h3>
          </div>
          <p className="text-3xl font-bold">{workoutCount}</p>
        </div>
        
        <div className="glass-panel rounded-xl p-5 animate-fade-in">
          <div className="flex items-center mb-3">
            <Calendar className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-medium">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold">{currentStreak} days</p>
        </div>
        
        <div className="glass-panel rounded-xl p-5 animate-fade-in">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-medium">Best Streak</h3>
          </div>
          <p className="text-3xl font-bold">{bestStreak} days</p>
        </div>
      </div>
      
      <ProgressChart 
        data={progressData}
        exercises={uniqueExercises}
      />
    </div>
  );
};

export default Progress;
