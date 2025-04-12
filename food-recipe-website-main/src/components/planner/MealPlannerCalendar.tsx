
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Recipe, recipes } from '@/data/recipes';
import { MealPlan, getMealPlanWithRecipes, mealPlans } from '@/data/meal-planner';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const MealPlannerCalendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan | null>(null);

  // Function to format date to match meal plan data format
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Find meal plan for the selected date
  React.useEffect(() => {
    if (date) {
      const formattedDate = formatDate(date);
      const mealPlan = mealPlans.find(mp => mp.date === formattedDate) || null;
      setSelectedMealPlan(mealPlan);
    }
  }, [date]);

  // Function to check if a date has a meal plan
  const hasMealPlan = (day: Date) => {
    return mealPlans.some(mp => mp.date === formatDate(day));
  };

  const handleAddRecipe = (mealType: string) => {
    toast({
      title: "Recipe Selection",
      description: `Add recipe to ${mealType} on ${date?.toLocaleDateString()}`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: (props) => (
              <div
                className={cn(
                  "flex items-center justify-center",
                  hasMealPlan(props.date) && "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-accent"
                )}
              >
                {props.date.getDate()}
              </div>
            ),
          }}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {date?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (date) {
                  const newDate = new Date(date);
                  newDate.setDate(newDate.getDate() - 1);
                  setDate(newDate);
                }
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (date) {
                  const newDate = new Date(date);
                  newDate.setDate(newDate.getDate() + 1);
                  setDate(newDate);
                }
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {!selectedMealPlan ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground mb-4">No meal plan for this day</p>
            <Button variant="outline">
              Create Meal Plan
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <MealSection 
              title="Breakfast" 
              recipeId={selectedMealPlan.breakfast} 
              onAddRecipe={() => handleAddRecipe('breakfast')} 
            />
            <Separator />
            <MealSection 
              title="Lunch" 
              recipeId={selectedMealPlan.lunch} 
              onAddRecipe={() => handleAddRecipe('lunch')} 
            />
            <Separator />
            <MealSection 
              title="Dinner" 
              recipeId={selectedMealPlan.dinner} 
              onAddRecipe={() => handleAddRecipe('dinner')} 
            />
            <Separator />
            <MealSection 
              title="Snacks" 
              recipeIds={selectedMealPlan.snacks} 
              onAddRecipe={() => handleAddRecipe('snacks')} 
            />

            {selectedMealPlan.notes && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <p className="text-muted-foreground">{selectedMealPlan.notes}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface MealSectionProps {
  title: string;
  recipeId?: string;
  recipeIds?: string[];
  onAddRecipe: () => void;
}

const MealSection: React.FC<MealSectionProps> = ({ title, recipeId, recipeIds, onAddRecipe }) => {
  let content;

  if (recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    content = recipe ? (
      <div className="flex items-center gap-4">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="h-20 w-20 rounded-md object-cover"
        />
        <div>
          <h4 className="font-medium">{recipe.title}</h4>
          <div className="flex gap-2 mt-1">
            {recipe.categories.slice(0, 2).map(category => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ) : null;
  } else if (recipeIds && recipeIds.length > 0) {
    const snackRecipes = recipeIds.map(id => recipes.find(r => r.id === id)).filter(Boolean) as Recipe[];
    content = (
      <div className="space-y-3">
        {snackRecipes.map(recipe => (
          <div key={recipe.id} className="flex items-center gap-4">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <h4 className="font-medium">{recipe.title}</h4>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="py-2">
        <p className="text-muted-foreground">No {title.toLowerCase()} planned</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onAddRecipe}>
          <Plus className="h-4 w-4 mr-1" />
          Add Recipe
        </Button>
      </div>
      {content}
    </div>
  );
};

export default MealPlannerCalendar;
