
import { NavLink } from 'react-router-dom';
import { Activity, BarChart, Dumbbell, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/70 border-b">
      <div className="app-container flex h-16 items-center">
        <div className="flex items-center gap-2 font-medium">
          <Activity className="w-5 h-5 text-primary" />
          <span className="text-lg">WorkoutHarmony</span>
        </div>
        <nav className="flex items-center ml-auto">
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-primary", 
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/weight" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-primary", 
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              Weight
            </NavLink>
            <NavLink 
              to="/progress" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-primary", 
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              Progress
            </NavLink>
            <NavLink 
              to="/create" 
              className="btn-primary"
            >
              Create Workout
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-lg border-t z-50">
        <div className="flex items-center justify-around h-16">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              cn("flex flex-col items-center py-2 px-4 text-xs font-medium transition-colors", 
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
            end
          >
            <Dumbbell className="w-5 h-5 mb-1" />
            <span>Workouts</span>
          </NavLink>
          <NavLink 
            to="/weight" 
            className={({ isActive }) => 
              cn("flex flex-col items-center py-2 px-4 text-xs font-medium transition-colors", 
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Scale className="w-5 h-5 mb-1" />
            <span>Weight</span>
          </NavLink>
          <NavLink 
            to="/progress" 
            className={({ isActive }) => 
              cn("flex flex-col items-center py-2 px-4 text-xs font-medium transition-colors", 
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <BarChart className="w-5 h-5 mb-1" />
            <span>Progress</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
