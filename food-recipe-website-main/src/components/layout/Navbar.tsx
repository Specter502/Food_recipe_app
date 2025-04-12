
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CookingPot, Calendar, Search, ShoppingBasket } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <CookingPot className="h-6 w-6 text-accent" />
          <span className="text-xl font-semibold">Kitchen Story</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition-colors hover:text-accent ${isActive ? 'text-accent font-medium' : 'text-foreground'}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/categories" 
            className={({ isActive }) => 
              `transition-colors hover:text-accent ${isActive ? 'text-accent font-medium' : 'text-foreground'}`
            }
          >
            Categories
          </NavLink>
          <NavLink 
            to="/planner" 
            className={({ isActive }) => 
              `transition-colors hover:text-accent ${isActive ? 'text-accent font-medium' : 'text-foreground'}`
            }
          >
            Meal Planner
          </NavLink>
          <NavLink 
            to="/shopping" 
            className={({ isActive }) => 
              `transition-colors hover:text-accent ${isActive ? 'text-accent font-medium' : 'text-foreground'}`
            }
          >
            Shopping List
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link to="/planner">
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Meal Planner</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link to="/shopping">
              <ShoppingBasket className="h-5 w-5" />
              <span className="sr-only">Shopping List</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
