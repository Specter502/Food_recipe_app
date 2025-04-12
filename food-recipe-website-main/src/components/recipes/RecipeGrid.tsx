
import React from 'react';
import { Recipe } from '@/data/recipes';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

interface RecipeGridProps {
  recipes: Recipe[];
  title?: string;
  onToggleFavorite?: (recipeId: string) => void;
  favoriteIds?: string[];
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  title, 
  onToggleFavorite,
  favoriteIds = []
}) => {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-2xl font-bold tracking-tight text-gradient">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="hover-scale"
          >
            <RecipeCard 
              recipe={recipe} 
              onToggleFavorite={onToggleFavorite}
              isFavorite={favoriteIds.includes(recipe.id)}
            />
          </motion.div>
        ))}
      </div>
      {recipes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No recipes found
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
