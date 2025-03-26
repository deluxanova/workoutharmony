
export type ExerciseType = "strength" | "cardio" | "flexibility";

export interface Set {
  id: string;
  reps: number;
  weight: number; // in kg, 0 for bodyweight
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  sets: Set[];
  notes?: string;
  restTime?: number; // in seconds
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  tags: string[];
  createdAt: Date;
  lastPerformed?: Date;
}

export interface WorkoutLog {
  id: string;
  workoutId: string;
  date: Date;
  exercises: {
    exerciseId: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
  completed: boolean;
  notes?: string;
}

export interface ProgressData {
  exercise: string;
  date: string;
  weight: number;
  reps: number;
}

export interface WorkoutSummary {
  id: string;
  name: string;
  exerciseCount: number;
  lastPerformed?: string;
  tags: string[];
}
