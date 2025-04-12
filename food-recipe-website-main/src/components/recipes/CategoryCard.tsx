
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/data/recipes';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="group relative overflow-hidden rounded-lg"
    >
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10"></div>
      <img 
        src={category.image} 
        alt={category.name} 
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 text-white">
        <h3 className="text-xl font-bold">{category.name}</h3>
        <p className="mt-1 text-sm opacity-90">{category.description}</p>
        <div className="mt-2 flex items-center text-sm font-medium">
          <span>Explore</span>
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
