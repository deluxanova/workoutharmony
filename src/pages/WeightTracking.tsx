
import React, { useState } from 'react';
import { WeightInput } from '@/components/WeightInput';
import { WeightChart } from '@/components/WeightChart';
import { WeightHistory } from '@/components/WeightHistory';
import { WeightRecord, TimePeriod } from '@/utils/types';
import { mockWeightData } from '@/utils/mockWeightData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Activity, Calendar, TrendingUp } from 'lucide-react';

const WeightTracking = () => {
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(mockWeightData);
  const [period, setPeriod] = useState<TimePeriod>('weekly');
  const [editingRecord, setEditingRecord] = useState<WeightRecord | null>(null);
  const isMobile = useIsMobile();
  
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
    <div className="page-transition pt-4 pb-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">Weight Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-1">
          <WeightInput 
            onAddWeight={handleAddWeight} 
            editingRecord={editingRecord}
          />
          
          {latestRecord && (
            <div className="glass-panel rounded-xl p-4 mt-4 animate-fade-in">
              <h3 className="text-lg font-semibold mb-3">Stats</h3>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="glass-panel rounded-xl p-2 md:p-3 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <Activity className="w-4 h-4 text-primary mb-1" />
                    <span className="text-xs md:text-sm text-muted-foreground">Current</span>
                    <span className="text-sm md:text-base font-semibold">{latestRecord.weight} kg</span>
                  </div>
                </div>
                
                <div className="glass-panel rounded-xl p-2 md:p-3 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <Calendar className="w-4 h-4 text-primary mb-1" />
                    <span className="text-xs md:text-sm text-muted-foreground">Starting</span>
                    <span className="text-sm md:text-base font-semibold">{oldestRecord.weight} kg</span>
                  </div>
                </div>
                
                <div className="glass-panel rounded-xl p-2 md:p-3 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <TrendingUp className="w-4 h-4 text-primary mb-1" />
                    <span className="text-xs md:text-sm text-muted-foreground">Change</span>
                    <span className={`text-sm md:text-base font-semibold ${totalChange < 0 ? 'text-green-500' : totalChange > 0 ? 'text-red-500' : ''}`}>
                      {totalChange > 0 ? '+' : ''}{totalChange.toFixed(1)} kg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-xl p-4 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">Weight Trend</h3>
            
            <Tabs defaultValue={period} onValueChange={(value) => setPeriod(value as TimePeriod)} className="mb-4">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="daily">
                  {isMobile ? 'Day' : 'Daily'}
                </TabsTrigger>
                <TabsTrigger value="weekly">
                  {isMobile ? 'Week' : 'Weekly'}
                </TabsTrigger>
                <TabsTrigger value="monthly">
                  {isMobile ? 'Month' : 'Monthly'}
                </TabsTrigger>
                <TabsTrigger value="bimonthly">
                  {isMobile ? '2 Mo.' : 'Bi-Monthly'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <WeightChart data={weightRecords} period={period} />
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-6">
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
