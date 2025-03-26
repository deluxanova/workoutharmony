
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { detailedWorkout } from '@/utils/mockData';
import { ExerciseItem } from '@/components/ExerciseItem';
import { Calendar, ChevronLeft, Clock, Edit, PlayCircle } from 'lucide-react';

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isStarted, setIsStarted] = useState(false);
  
  // In a real app, we would fetch the workout data based on the ID
  const workout = detailedWorkout;
  
  return (
    <div className="page-transition pt-6 pb-16 md:py-10">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to workouts
      </Link>
      
      <div className="glass-panel rounded-xl p-5 mb-6 animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{workout.name}</h1>
            {workout.description && (
              <p className="text-muted-foreground mt-1">{workout.description}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-3">
              {workout.tags.map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mt-4">
              <div className="flex items-center mr-4">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Created: {workout.createdAt.toLocaleDateString()}</span>
              </div>
              {workout.lastPerformed && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Last performed: {workout.lastPerformed.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex">
            <Link 
              to={`/workout/${id}/edit`}
              className="p-2 rounded-full hover:bg-secondary"
              aria-label="Edit workout"
            >
              <Edit className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Exercises ({workout.exercises.length})</h2>
        <button 
          onClick={() => setIsStarted(!isStarted)}
          className={`btn-primary inline-flex items-center ${
            isStarted ? 'bg-green-600 hover:bg-green-700' : ''
          }`}
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          {isStarted ? 'End Workout' : 'Start Workout'}
        </button>
      </div>
      
      {workout.exercises.map((exercise) => (
        <ExerciseItem 
          key={exercise.id} 
          exercise={exercise} 
          isEditable={!isStarted}
        />
      ))}
    </div>
  );
};

export default WorkoutDetail;
