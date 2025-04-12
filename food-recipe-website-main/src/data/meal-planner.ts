
import { Recipe } from './recipes';

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snacks?: string[];
  notes?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  isChecked: boolean;
  category: string;
}

// Sample data for meal planning
export const mealPlans: MealPlan[] = [
  {
    id: '1',
    date: '2025-04-13',
    breakfast: '1', // Classic Pancakes
    lunch: '4', // Vegetable Stir Fry
    dinner: '2', // Spaghetti Carbonara
    notes: 'Shopping day'
  },
  {
    id: '2',
    date: '2025-04-14',
    breakfast: '6', // Avocado Toast
    lunch: '5', // Chicken Noodle Soup
    dinner: '4', // Vegetable Stir Fry
  },
  {
    id: '3',
    date: '2025-04-15',
    breakfast: '1', // Classic Pancakes
    lunch: '5', // Chicken Noodle Soup
    dinner: '2', // Spaghetti Carbonara
    snacks: ['3'], // Chocolate Chip Cookies
  }
];

// Sample data for shopping list
export const shoppingItems: ShoppingItem[] = [
  { id: '1', name: 'All-purpose flour', amount: '2 cups', isChecked: false, category: 'Baking' },
  { id: '2', name: 'Eggs', amount: '1 dozen', isChecked: false, category: 'Dairy' },
  { id: '3', name: 'Milk', amount: '1 gallon', isChecked: true, category: 'Dairy' },
  { id: '4', name: 'Butter', amount: '1 lb', isChecked: false, category: 'Dairy' },
  { id: '5', name: 'Chicken breasts', amount: '2 lbs', isChecked: false, category: 'Meat' },
  { id: '6', name: 'Broccoli', amount: '1 head', isChecked: true, category: 'Produce' },
  { id: '7', name: 'Carrots', amount: '1 bag', isChecked: false, category: 'Produce' },
  { id: '8', name: 'Avocados', amount: '3', isChecked: false, category: 'Produce' },
  { id: '9', name: 'Spaghetti', amount: '1 box', isChecked: true, category: 'Pasta & Grains' },
  { id: '10', name: 'Chicken broth', amount: '32 oz', isChecked: false, category: 'Canned Goods' },
];

// Helper function to convert recipe IDs in meal plans to actual recipe objects
export const getMealPlanWithRecipes = (mealPlan: MealPlan, recipes: Recipe[]) => {
  const getRecipe = (id?: string) => id ? recipes.find(r => r.id === id) : undefined;
  
  return {
    ...mealPlan,
    breakfastRecipe: getRecipe(mealPlan.breakfast),
    lunchRecipe: getRecipe(mealPlan.lunch),
    dinnerRecipe: getRecipe(mealPlan.dinner),
    snackRecipes: mealPlan.snacks?.map(id => getRecipe(id)).filter(Boolean) || []
  };
};

// Group shopping items by category
export const getShoppingItemsByCategory = () => {
  const categories = [...new Set(shoppingItems.map(item => item.category))];
  return categories.map(category => ({
    category,
    items: shoppingItems.filter(item => item.category === category)
  }));
};
