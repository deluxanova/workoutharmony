
import { Workout, ProgressData, WorkoutSummary } from './types';

// Mock workout routines for display
export const workoutRoutines: WorkoutSummary[] = [
  {
    id: '1',
    name: 'Upper Body Power',
    exerciseCount: 5,
    lastPerformed: 'Yesterday',
    tags: ['Strength', 'Upper Body'],
  },
  {
    id: '2',
    name: 'Lower Body Focus',
    exerciseCount: 6,
    lastPerformed: '3 days ago',
    tags: ['Strength', 'Lower Body'],
  },
  {
    id: '3',
    name: 'Full Body Workout',
    exerciseCount: 8,
    lastPerformed: '1 week ago',
    tags: ['Full Body', 'Strength'],
  },
  {
    id: '4',
    name: 'Core & Cardio',
    exerciseCount: 4,
    lastPerformed: '2 weeks ago',
    tags: ['Cardio', 'Core'],
  },
];

// Mock detailed workout
export const detailedWorkout: Workout = {
  id: '1',
  name: 'Upper Body Power',
  description: 'Focus on building strength in chest, shoulders, and arms',
  exercises: [
    {
      id: 'ex1',
      name: 'Bench Press',
      type: 'strength',
      sets: [
        { id: 's1', reps: 8, weight: 70, completed: false },
        { id: 's2', reps: 8, weight: 75, completed: false },
        { id: 's3', reps: 6, weight: 80, completed: false },
      ],
      notes: 'Focus on controlled movement and full range of motion',
      restTime: 90,
    },
    {
      id: 'ex2',
      name: 'Overhead Press',
      type: 'strength',
      sets: [
        { id: 's4', reps: 8, weight: 45, completed: false },
        { id: 's5', reps: 8, weight: 45, completed: false },
        { id: 's6', reps: 6, weight: 50, completed: false },
      ],
      restTime: 90,
    },
    {
      id: 'ex3',
      name: 'Pull-ups',
      type: 'strength',
      sets: [
        { id: 's7', reps: 8, weight: 0, completed: false },
        { id: 's8', reps: 8, weight: 0, completed: false },
        { id: 's9', reps: 6, weight: 5, completed: false },
      ],
      notes: 'Add weight for last set if possible',
      restTime: 90,
    },
    {
      id: 'ex4',
      name: 'Barbell Row',
      type: 'strength',
      sets: [
        { id: 's10', reps: 10, weight: 60, completed: false },
        { id: 's11', reps: 10, weight: 60, completed: false },
        { id: 's12', reps: 8, weight: 65, completed: false },
      ],
      restTime: 90,
    },
    {
      id: 'ex5',
      name: 'Tricep Dips',
      type: 'strength',
      sets: [
        { id: 's13', reps: 12, weight: 0, completed: false },
        { id: 's14', reps: 12, weight: 0, completed: false },
        { id: 's15', reps: 10, weight: 0, completed: false },
      ],
      restTime: 60,
    },
  ],
  tags: ['Strength', 'Upper Body'],
  createdAt: new Date('2023-08-15'),
  lastPerformed: new Date('2023-10-20'),
};

// Mock progress data for charts
export const progressData: ProgressData[] = [
  { exercise: 'Bench Press', date: '2023-09-01', weight: 65, reps: 8 },
  { exercise: 'Bench Press', date: '2023-09-08', weight: 70, reps: 8 },
  { exercise: 'Bench Press', date: '2023-09-15', weight: 70, reps: 10 },
  { exercise: 'Bench Press', date: '2023-09-22', weight: 75, reps: 8 },
  { exercise: 'Bench Press', date: '2023-09-29', weight: 75, reps: 10 },
  { exercise: 'Bench Press', date: '2023-10-06', weight: 80, reps: 8 },
  { exercise: 'Bench Press', date: '2023-10-13', weight: 80, reps: 9 },
  { exercise: 'Bench Press', date: '2023-10-20', weight: 85, reps: 6 },
  
  { exercise: 'Squat', date: '2023-09-01', weight: 85, reps: 8 },
  { exercise: 'Squat', date: '2023-09-08', weight: 90, reps: 8 },
  { exercise: 'Squat', date: '2023-09-15', weight: 95, reps: 8 },
  { exercise: 'Squat', date: '2023-09-22', weight: 100, reps: 6 },
  { exercise: 'Squat', date: '2023-09-29', weight: 100, reps: 8 },
  { exercise: 'Squat', date: '2023-10-06', weight: 105, reps: 6 },
  { exercise: 'Squat', date: '2023-10-13', weight: 105, reps: 8 },
  { exercise: 'Squat', date: '2023-10-20', weight: 110, reps: 6 },
];

export const recentExercises = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Pull-ups',
  'Barbell Row',
  'Leg Press',
];
