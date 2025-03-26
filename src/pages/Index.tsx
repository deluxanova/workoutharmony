
import { useState } from 'react';
import { workoutRoutines } from '@/utils/mockData';
import { WorkoutCard } from '@/components/WorkoutCard';
import { CreateWorkoutButton } from '@/components/CreateWorkoutButton';
import { Activity, Search } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredWorkouts = workoutRoutines.filter(workout => 
    workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workout.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="page-transition pt-6 pb-16 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Workouts</h1>
          <p className="text-muted-foreground mt-1">Manage and track your fitness routines</p>
        </div>
        
        <div className="relative mt-4 md:mt-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search workouts..."
            className="pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center">
          <Activity className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No workouts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 
              "No workouts match your search criteria." : 
              "You haven't created any workout routines yet."
            }
          </p>
          <a href="/create" className="btn-primary">Create Your First Workout</a>
        </div>
      )}
      
      <CreateWorkoutButton />
    </div>
  );
};

export default Index;
