
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { categories, getRecipesByCategory } from '@/data/recipes';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.id === id);
  const recipes = id ? getRecipesByCategory(id) : [];

  if (!category) {
    return (
      <MainLayout>
        <div className="container py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist or has been removed.</p>
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
        
        <div className="relative mb-8 h-60 overflow-hidden rounded-lg">
          <img 
            src={category.image} 
            alt={category.name} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white">{category.name}</h1>
            <p className="mt-2 text-lg text-white/90">{category.description}</p>
          </div>
        </div>
        
        {recipes.length > 0 ? (
          <RecipeGrid recipes={recipes} />
        ) : (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">No recipes found in this category</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
