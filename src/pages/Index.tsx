
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart, Dumbbell, Scale, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { workoutRoutines } from '@/utils/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  const featuredWorkouts = workoutRoutines.slice(0, isMobile ? 2 : 3);
  
  return (
    <div className="page-transition pt-4 pb-16 md:py-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <Activity className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">WorkoutHarmony</h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mb-6 md:mb-8 px-2">
          Track your workouts, monitor your progress, and achieve your fitness goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full px-4 sm:px-0 sm:w-auto">
          <Button asChild size={isMobile ? "default" : "lg"} className="gap-2 w-full sm:w-auto">
            <Link to="/create">
              Create Workout <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
            <Link to="/progress">View Progress</Link>
          </Button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mb-8 md:mb-16 px-2 md:px-0">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-3 md:mb-4">
                <Dumbbell className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-2">Workout Tracking</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Create and manage custom workout routines tailored to your fitness goals.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-3 md:mb-4">
                <BarChart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-2">Progress Visualization</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Track your progress with detailed charts and analytics to stay motivated.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="bg-primary/10 p-3 rounded-full mb-3 md:mb-4">
                <Scale className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-2">Weight Tracking</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Monitor your weight changes over time with daily, weekly, and monthly views.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Featured Workouts Section */}
      <div className="px-2 md:px-0">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Featured Workouts</h2>
          <Link to="/" className="text-primary hover:underline flex items-center gap-1 text-sm md:text-base">
            View all <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredWorkouts.map(workout => (
            <Link key={workout.id} to={`/workout/${workout.id}`} className="hover-card rounded-lg overflow-hidden">
              <Card>
                <div className="aspect-video bg-primary/5 flex items-center justify-center">
                  <Activity className="w-10 h-10 md:w-12 md:h-12 text-primary/40" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-base md:text-lg mb-1">{workout.name}</h3>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {workout.tags.map(tag => (
                      <span key={tag} className="badge text-xs">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
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
