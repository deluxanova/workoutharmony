
import { CalendarDays, ChevronRight, Dumbbell } from 'lucide-react';
import { WorkoutSummary } from '@/utils/types';
import { Link } from 'react-router-dom';

interface WorkoutCardProps {
  workout: WorkoutSummary;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link 
      to={`/workout/${workout.id}`}
      className="glass-panel rounded-xl p-5 hover-card animate-fade-in"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{workout.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Dumbbell className="w-4 h-4 mr-1" />
            <span>{workout.exerciseCount} exercises</span>
            {workout.lastPerformed && (
              <>
                <span className="mx-2">•</span>
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>Last: {workout.lastPerformed}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {workout.tags.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </Link>
  );
};
