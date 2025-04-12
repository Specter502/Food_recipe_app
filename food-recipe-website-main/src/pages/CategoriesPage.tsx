
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { categories } from '@/data/recipes';
import CategoryCard from '@/components/recipes/CategoryCard';

const CategoriesPage = () => {
  return (
    <MainLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Recipe Categories</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Browse recipes by category to find exactly what you're looking for. From quick breakfasts to hearty dinners, we've got you covered.
        </p>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
