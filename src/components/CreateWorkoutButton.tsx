
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreateWorkoutButton: React.FC = () => {
  return (
    <Link 
      to="/create" 
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-40 hover:bg-primary/90 transition-all duration-300 hover:scale-105"
      aria-label="Create new workout"
    >
      <Plus className="w-6 h-6" />
    </Link>
  );
};
