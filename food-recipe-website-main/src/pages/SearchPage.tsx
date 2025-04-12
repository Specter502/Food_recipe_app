
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { searchRecipes } from '@/data/recipes';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isSearching, setIsSearching] = useState(false);
  
  const query = searchParams.get('q') || '';
  const searchResults = searchRecipes(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== query) {
        setSearchParams(searchQuery ? { q: searchQuery } : {});
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, query, setSearchParams]);

  return (
    <MainLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>
        
        <div className="mb-8 max-w-md relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, ingredient, category..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {query && (
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-1">
              {searchResults.length > 0 
                ? `Search results for "${query}"` 
                : `No results found for "${query}"`}
            </h2>
            <p className="text-muted-foreground">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} recipe${searchResults.length === 1 ? '' : 's'}` 
                : 'Try a different search term or browse categories'}
            </p>
          </div>
        )}
        
        {searchResults.length > 0 ? (
          <RecipeGrid recipes={searchResults} />
        ) : !query ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Enter a recipe name, ingredient, or category to find recipes
            </p>
          </div>
        ) : null}
      </div>
    </MainLayout>
  );
};

export default SearchPage;
