
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { recipes, categories } from '@/data/recipes';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import CategoryCard from '@/components/recipes/CategoryCard';
import { CookingPot, ChevronDown, Info, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  
  // Get featured recipes (recipes with the 'Featured' tag)
  const featuredRecipes = recipes.filter(recipe => recipe.tags.includes('Featured'));
  
  // Get limited recipes (first 4 recipes for initial display)
  const displayedRecipes = showAllRecipes ? featuredRecipes : featuredRecipes.slice(0, 4);
  
  // Get favorite recipes based on favoriteRecipes state
  const displayedFavorites = recipes.filter(recipe => favoriteRecipes.includes(recipe.id));

  const handleToggleFavorite = (recipeId: string) => {
    setFavoriteRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // If no recipes have the Featured tag, use most viewed recipes instead
  useEffect(() => {
    // This would normally fetch data from an API, but for demo purposes we're setting it in localStorage
    const initFavorites = localStorage.getItem('favoriteRecipes');
    if (initFavorites) {
      setFavoriteRecipes(JSON.parse(initFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  }, [favoriteRecipes]);

  return (
    <MainLayout>
      <section className="py-10">
        <div className="container">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 animate-fade-in text-gradient-primary">Kitchen Story</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover, plan, and cook delicious meals with your personal recipe collection
            </p>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-center">
              <CookingPot className="h-6 w-6 mr-2 text-accent" />
              <h2 className="text-2xl font-bold">Browse Categories</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <RecipeGrid 
              recipes={displayedRecipes} 
              title="Featured Recipes" 
              onToggleFavorite={handleToggleFavorite}
              favoriteIds={favoriteRecipes}
            />
            
            {!showAllRecipes && featuredRecipes.length > 4 && (
              <div className="text-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAllRecipes(true)}
                  className="animate-fade-in hover-scale"
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show More Recipes
                </Button>
              </div>
            )}
          </div>

          {displayedFavorites.length > 0 && (
            <div className="mb-12">
              <RecipeGrid 
                recipes={displayedFavorites} 
                title="Your Favorites" 
                onToggleFavorite={handleToggleFavorite}
                favoriteIds={favoriteRecipes}
              />
            </div>
          )}

          <div className="mb-12">
            <div className="mb-6 flex items-center">
              <Info className="h-6 w-6 mr-2 text-accent" />
              <h2 className="text-2xl font-bold">About Kitchen Story</h2>
            </div>
            <Card className="animate-fade-in glass-card">
              <CardContent className="pt-6">
                <p className="leading-relaxed mb-4">
                  Welcome to Kitchen Story, your personal recipe manager and meal planning assistant. 
                  Our app helps you discover new recipes, organize your favorites, and plan your meals efficiently.
                </p>
                <p className="leading-relaxed">
                  Browse through different categories, search for specific recipes, and save your favorites for quick access.
                  Kitchen Story makes cooking fun and convenient with a beautiful collection of delicious recipes for every occasion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
