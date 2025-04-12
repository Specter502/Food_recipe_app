
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { recipes } from '@/data/recipes';
import RecipeDetail from '@/components/recipes/RecipeDetail';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const recipe = recipes.find(r => r.id === id);
  
  // Get similar recipes (same category, excluding current recipe)
  const similarRecipes = recipe 
    ? recipes
        .filter(r => 
          r.id !== recipe.id && 
          r.categories.some(cat => recipe.categories.includes(cat))
        )
        .slice(0, 3)
    : [];

  if (!recipe) {
    return (
      <MainLayout>
        <div className="container py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <RecipeDetail recipe={recipe} />
        
        {similarRecipes.length > 0 && (
          <div className="mt-16">
            <RecipeGrid recipes={similarRecipes} title="You Might Also Like" />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RecipeDetailPage;
