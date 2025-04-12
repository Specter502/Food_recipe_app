
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ShoppingList from '@/components/shopping/ShoppingList';

const ShoppingListPage = () => {
  return (
    <MainLayout>
      <section className="py-10">
        <div className="container max-w-4xl">
          <ShoppingList />
        </div>
      </section>
    </MainLayout>
  );
};

export default ShoppingListPage;
