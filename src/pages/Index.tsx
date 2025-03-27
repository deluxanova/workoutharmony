
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart, Dumbbell, Scale, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { workoutRoutines } from '@/utils/mockData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredWorkouts = workoutRoutines.slice(0, 3);
  
  return (
    <div className="page-transition pt-6 pb-16 md:py-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <Activity className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">WorkoutHarmony</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Track your workouts, monitor your progress, and achieve your fitness goals all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/create">
              Create Workout <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/progress">View Progress</Link>
          </Button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Dumbbell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Workout Tracking</h3>
              <p className="text-muted-foreground">
                Create and manage custom workout routines tailored to your fitness goals.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BarChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Progress Visualization</h3>
              <p className="text-muted-foreground">
                Track your progress with detailed charts and analytics to stay motivated.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Weight Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your weight changes over time with daily, weekly, and monthly views.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Featured Workouts Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Workouts</h2>
          <Link to="/" className="text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredWorkouts.map(workout => (
            <Link key={workout.id} to={`/workout/${workout.id}`} className="hover-card rounded-lg overflow-hidden">
              <Card>
                <div className="aspect-video bg-primary/5 flex items-center justify-center">
                  <Activity className="w-12 h-12 text-primary/40" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{workout.name}</h3>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {workout.tags.map(tag => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {workout.exerciseCount} exercises
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
