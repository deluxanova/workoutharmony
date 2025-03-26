
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Save } from 'lucide-react';
import { recentExercises } from '@/utils/mockData';
import { Exercise } from '@/utils/types';

const CreateWorkout = () => {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [exercises, setExercises] = useState<Partial<Exercise>[]>([]);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: `temp-${Date.now()}`,
        name: '',
        type: 'strength',
        sets: [{ id: `set-${Date.now()}`, reps: 8, weight: 0, completed: false }],
      },
    ]);
  };
  
  const handleSaveWorkout = () => {
    // In a real app, we would save the workout data
    console.log({ workoutName, description, tags, exercises });
    navigate('/');
  };
  
  return (
    <div className="page-transition pt-6 pb-16 md:py-10">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to workouts
      </Link>
      
      <div className="glass-panel rounded-xl p-5 mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Create New Workout</h1>
        
        <div className="mb-4">
          <label htmlFor="workoutName" className="block text-sm font-medium mb-1">
            Workout Name
          </label>
          <input
            id="workoutName"
            type="text"
            placeholder="e.g., Upper Body Power"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            placeholder="Describe your workout..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[60px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <div key={tag} className="badge flex items-center gap-1 pr-1">
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="rounded-full w-4 h-4 flex items-center justify-center hover:bg-black/10"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              id="tags"
              type="text"
              placeholder="Add a tag (e.g., Upper Body)"
              className="flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              onClick={handleAddTag}
              className="bg-secondary text-secondary-foreground px-3 rounded-r-md hover:bg-secondary/80"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Exercises ({exercises.length})</h2>
      </div>
      
      {exercises.length === 0 ? (
        <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center">
          <Plus className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No exercises added yet</h3>
          <p className="text-muted-foreground mb-4">
            Add exercises to your workout routine
          </p>
          <button onClick={handleAddExercise} className="btn-primary">
            Add Exercise
          </button>
        </div>
      ) : (
        <div className="mb-6">
          {/* Exercise inputs would go here */}
          <p className="text-center text-muted-foreground py-4">
            Exercise builder coming soon...
          </p>
        </div>
      )}
      
      {exercises.length > 0 && (
        <button onClick={handleAddExercise} className="btn-secondary mb-8 w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Another Exercise
        </button>
      )}
      
      <div className="glass-panel rounded-xl p-5 mb-6 animate-fade-in">
        <h3 className="text-lg font-medium mb-3">Quick Add</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Choose from your recent exercises:
        </p>
        <div className="flex flex-wrap gap-2">
          {recentExercises.map((exercise) => (
            <button
              key={exercise}
              className="btn-secondary"
              onClick={() => {
                // Add exercise logic would go here
              }}
            >
              {exercise}
            </button>
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 flex gap-2">
        <button 
          onClick={handleSaveWorkout}
          className="bg-primary text-primary-foreground rounded-full px-6 py-3 flex items-center shadow-lg hover:bg-primary/90 transition-all duration-300"
          disabled={!workoutName || exercises.length === 0}
        >
          <Save className="w-5 h-5 mr-2" />
          Save Workout
        </button>
      </div>
    </div>
  );
};

export default CreateWorkout;
