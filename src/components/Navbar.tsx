
import { NavLink } from 'react-router-dom';
import { Activity, BarChart, Dumbbell, Scale, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/70 border-b">
      <div className="app-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <Activity className="w-5 h-5 text-primary" />
          <span className="text-lg">WorkoutHarmony</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-6">
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

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <NavLink 
                to="/" 
                onClick={closeSheet}
                className={({ isActive }) => 
                  cn("flex items-center gap-2 px-2 py-3 text-base font-medium rounded-md transition-colors hover:bg-accent", 
                    isActive ? "text-primary bg-accent/50" : "text-foreground"
                  )
                }
                end
              >
                <Dumbbell className="w-5 h-5" />
                Home
              </NavLink>
              <NavLink 
                to="/weight" 
                onClick={closeSheet}
                className={({ isActive }) => 
                  cn("flex items-center gap-2 px-2 py-3 text-base font-medium rounded-md transition-colors hover:bg-accent", 
                    isActive ? "text-primary bg-accent/50" : "text-foreground"
                  )
                }
              >
                <Scale className="w-5 h-5" />
                Weight
              </NavLink>
              <NavLink 
                to="/progress" 
                onClick={closeSheet}
                className={({ isActive }) => 
                  cn("flex items-center gap-2 px-2 py-3 text-base font-medium rounded-md transition-colors hover:bg-accent", 
                    isActive ? "text-primary bg-accent/50" : "text-foreground"
                  )
                }
              >
                <BarChart className="w-5 h-5" />
                Progress
              </NavLink>
              <NavLink 
                to="/create" 
                onClick={closeSheet}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Activity className="w-5 h-5" />
                Create Workout
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Bottom Navigation */}
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
