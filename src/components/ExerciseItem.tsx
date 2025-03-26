
import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Edit } from 'lucide-react';
import { Exercise } from '@/utils/types';

interface ExerciseItemProps {
  exercise: Exercise;
  isEditable?: boolean;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  isEditable = false 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="glass-panel rounded-xl mb-4 overflow-hidden animate-fade-in">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h4 className="font-medium">{exercise.name}</h4>
          <div className="text-sm text-muted-foreground">
            {exercise.sets.length} sets
            {exercise.restTime && (
              <span className="flex items-center ml-2 inline-flex">
                • <Clock className="w-3 h-3 mx-1" /> {exercise.restTime}s rest
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {isEditable && (
            <button 
              className="p-2 rounded-full hover:bg-secondary"
              onClick={(e) => {
                e.stopPropagation();
                // Edit logic here
              }}
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          {expanded ? (
            <ChevronUp className="ml-2 w-5 h-5" />
          ) : (
            <ChevronDown className="ml-2 w-5 h-5" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 animate-slide-down">
          <div className="bg-background/50 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Set</th>
                  <th className="text-left py-2 px-3 font-medium">Reps</th>
                  <th className="text-left py-2 px-3 font-medium">Weight</th>
                  {!isEditable && (
                    <th className="text-left py-2 px-3 font-medium">Done</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {exercise.sets.map((set, index) => (
                  <tr key={set.id} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">{set.reps}</td>
                    <td className="py-2 px-3">
                      {set.weight > 0 ? `${set.weight} kg` : 'Bodyweight'}
                    </td>
                    {!isEditable && (
                      <td className="py-2 px-3">
                        <input 
                          type="checkbox" 
                          checked={set.completed}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          readOnly
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {exercise.notes && (
            <div className="mt-3 text-sm">
              <span className="font-medium">Notes:</span> {exercise.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
