
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MealPlannerCalendar from '@/components/planner/MealPlannerCalendar';

const PlannerPage = () => {
  return (
    <MainLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-2">Meal Planner</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Plan your meals for the week, organize your menu, and make grocery shopping easier.
        </p>
        
        <MealPlannerCalendar />
      </div>
    </MainLayout>
  );
};

export default PlannerPage;
