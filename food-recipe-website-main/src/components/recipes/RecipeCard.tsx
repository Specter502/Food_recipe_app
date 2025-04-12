
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Heart } from 'lucide-react';
import { Recipe } from '@/data/recipes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (recipeId: string) => void;
  isFavorite?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onToggleFavorite,
  isFavorite = false 
}) => {
  // Fix image URLs for specific categories
  const getFixedImageUrl = (recipe: Recipe) => {
    if (recipe.categories.includes('Breakfast') && recipe.image.includes('photo-1533089860892-a9b9ac6cd6b4')) {
      return 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
    }
    if (recipe.categories.includes('Soups & Stews') && recipe.image.includes('photo-1619057388846-dea51d892162')) {
      return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80';
    }
    return recipe.image;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(recipe.id);
    }
  };

  return (
    <div className="recipe-card group relative">
      <Link to={`/recipes/${recipe.id}`} className="block">
        <div className="overflow-hidden h-48">
          <img 
            src={getFixedImageUrl(recipe)} 
            alt={recipe.title} 
            className="recipe-card-image transition-transform group-hover:scale-105 duration-300 h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="mb-2">
            {recipe.categories.slice(0, 1).map((category) => (
              <Badge key={category} variant="outline" className="mr-1">
                {category}
              </Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span className="mr-3">{recipe.prepTime + recipe.cookTime} min</span>
            <User className="mr-1 h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </Link>
      {onToggleFavorite && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleFavoriteClick}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </Button>
      )}
    </div>
  );
};

export default RecipeCard;
