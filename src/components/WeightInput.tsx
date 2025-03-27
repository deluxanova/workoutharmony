
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface WeightInputProps {
  onAddWeight: (date: Date, weight: number, notes?: string) => void;
}

export const WeightInput: React.FC<WeightInputProps> = ({ onAddWeight }) => {
  const [weight, setWeight] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || isNaN(parseFloat(weight))) {
      toast.error('Please enter a valid weight');
      return;
    }
    
    const weightValue = parseFloat(weight);
    
    onAddWeight(date, weightValue, notes || undefined);
    setWeight('');
    setNotes('');
    toast.success('Weight recorded successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 glass-panel rounded-xl p-5 animate-fade-in">
      <h3 className="text-lg font-semibold">Record Weight</h3>
      
      <div className="grid gap-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          placeholder="Enter your weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="col-span-3"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date || new Date());
                setCalendarOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Add any notes about this measurement"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <Button type="submit" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Record Weight
      </Button>
    </form>
  );
};
