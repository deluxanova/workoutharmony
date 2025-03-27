
import React, { useState } from 'react';
import { WeightInput } from '@/components/WeightInput';
import { WeightChart } from '@/components/WeightChart';
import { WeightHistory } from '@/components/WeightHistory';
import { WeightRecord, TimePeriod } from '@/utils/types';
import { mockWeightData } from '@/utils/mockWeightData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const WeightTracking = () => {
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(mockWeightData);
  const [period, setPeriod] = useState<TimePeriod>('weekly');
  const [editingRecord, setEditingRecord] = useState<WeightRecord | null>(null);
  
  const handleAddWeight = (date: Date, weight: number, notes?: string) => {
    if (editingRecord) {
      // Update existing record
      const updatedRecords = weightRecords.map(record => 
        record.id === editingRecord.id 
          ? { ...record, date, weight, notes } 
          : record
      );
      setWeightRecords(updatedRecords);
      setEditingRecord(null);
      toast.success('Weight record updated!');
    } else {
      // Add new record
      const newRecord: WeightRecord = {
        id: `weight-${Date.now()}`,
        date,
        weight,
        notes
      };
      setWeightRecords([...weightRecords, newRecord]);
      toast.success('Weight record added!');
    }
  };
  
  const handleDeleteRecord = (id: string) => {
    setWeightRecords(weightRecords.filter(record => record.id !== id));
    toast.success('Weight record deleted!');
  };
  
  const handleEditRecord = (record: WeightRecord) => {
    setEditingRecord(record);
    // Scroll to the input form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Calculate stats
  const latestRecord = [...weightRecords].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  )[0];
  
  const oldestRecord = [...weightRecords].sort((a, b) => 
    a.date.getTime() - b.date.getTime()
  )[0];
  
  const totalChange = latestRecord && oldestRecord 
    ? latestRecord.weight - oldestRecord.weight 
    : 0;
  
  return (
    <div className="page-transition pt-6 pb-16 md:py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Weight Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WeightInput 
            onAddWeight={handleAddWeight} 
          />
          
          {latestRecord && (
            <div className="glass-panel rounded-xl p-5 mt-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-3">Stats</h3>
              <p className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Current Weight:</span> 
                <span className="font-medium">{latestRecord.weight} kg</span>
              </p>
              <p className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Starting Weight:</span> 
                <span className="font-medium">{oldestRecord.weight} kg</span>
              </p>
              <p className="flex justify-between py-1">
                <span className="text-muted-foreground">Total Change:</span> 
                <span className={`font-medium ${totalChange < 0 ? 'text-green-500' : totalChange > 0 ? 'text-red-500' : ''}`}>
                  {totalChange > 0 ? '+' : ''}{totalChange.toFixed(1)} kg
                </span>
              </p>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-xl p-5 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">Weight Trend</h3>
            
            <Tabs defaultValue={period} onValueChange={(value) => setPeriod(value as TimePeriod)} className="mb-4">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="bimonthly">Bi-Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <WeightChart data={weightRecords} period={period} />
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <WeightHistory 
          data={weightRecords}
          onDelete={handleDeleteRecord}
          onEdit={handleEditRecord}
        />
      </div>
    </div>
  );
};

export default WeightTracking;
