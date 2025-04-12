
import React from 'react';
import { Recipe } from '@/data/recipes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarPlus, Clock, ShoppingCart, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const { toast } = useToast();

  const handleAddToShoppingList = () => {
    toast({
      title: "Added to shopping list",
      description: `Ingredients for ${recipe.title} have been added`,
    });
  };

  const handleAddToMealPlan = () => {
    toast({
      title: "Added to meal plan",
      description: `${recipe.title} has been added to your meal plan`,
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="mb-2 flex flex-wrap gap-2">
            {recipe.categories.map((category) => (
              <Badge key={category} variant="secondary" className="bg-white/20 text-white">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{recipe.title}</h1>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-accent font-medium">{ingredient.amount}</span>
                  <span>{ingredient.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    {index + 1}
                  </span>
                  <span className="mt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {recipe.notes && (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">Chef's Notes</h3>
              <p className="text-muted-foreground text-sm">{recipe.notes}</p>
            </div>
          )}
        </div>

        <div>
          <div className="rounded-lg border p-4 shadow-sm">
            <h3 className="font-medium mb-4">Recipe Info</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Prep Time</span>
                </div>
                <span className="text-sm font-medium">{recipe.prepTime} mins</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Cook Time</span>
                </div>
                <span className="text-sm font-medium">{recipe.cookTime} mins</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Time</span>
                </div>
                <span className="text-sm font-medium">{recipe.prepTime + recipe.cookTime} mins</span>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Servings</span>
                </div>
                <span className="text-sm font-medium">{recipe.servings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Difficulty</span>
                <Badge variant={
                  recipe.difficulty === 'Easy' ? 'secondary' :
                  recipe.difficulty === 'Medium' ? 'outline' : 'default'
                }>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button onClick={handleAddToMealPlan} className="w-full" variant="secondary">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add to Meal Plan
              </Button>
              <Button onClick={handleAddToShoppingList} className="w-full" variant="default">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Shopping List
              </Button>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-4 shadow-sm">
            <h3 className="font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
