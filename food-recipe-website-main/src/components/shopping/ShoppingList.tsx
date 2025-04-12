
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingItem, getShoppingItemsByCategory, shoppingItems } from '@/data/meal-planner';
import { Check, Plus, Search, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShoppingList = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ShoppingItem[]>(shoppingItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  const categorizedItems = React.useMemo(() => {
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const categories = [...new Set(filteredItems.map(item => item.category))];
    return categories.map(category => ({
      category,
      items: filteredItems.filter(item => item.category === category)
    }));
  }, [items, searchQuery]);

  const handleToggleItem = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name",
        variant: "destructive"
      });
      return;
    }

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      amount: newItemAmount || '1',
      isChecked: false,
      category: 'Other'
    };

    setItems(prevItems => [...prevItems, newItem]);
    setNewItemName('');
    setNewItemAmount('');

    toast({
      title: "Item Added",
      description: `${newItemName} has been added to your shopping list`,
    });
  };

  const handleClearCompleted = () => {
    setItems(prevItems => prevItems.filter(item => !item.isChecked));
    toast({
      title: "Completed Items Cleared",
      description: "All checked items have been removed from your list",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shopping List</h1>
        <Button variant="outline" onClick={handleClearCompleted}>
          <Trash className="mr-2 h-4 w-4" />
          Clear Completed
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add item..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddItem();
              }
            }}
          />
          <Input
            placeholder="Amount"
            className="max-w-[100px]"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddItem();
              }
            }}
          />
          <Button onClick={handleAddItem}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {categorizedItems.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No items found</p>
          </div>
        ) : (
          categorizedItems.map(({ category, items }) => (
            <div key={category}>
              <div className="mb-2 flex items-center">
                <h2 className="text-lg font-medium">{category}</h2>
                <Badge className="ml-2">{items.length}</Badge>
              </div>
              <div className="space-y-2 rounded-md border p-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={item.isChecked}
                      onCheckedChange={() => handleToggleItem(item.id)}
                    />
                    <div className="flex flex-1 items-center justify-between">
                      <Label
                        htmlFor={`item-${item.id}`}
                        className={`flex-1 ${item.isChecked ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {item.name}
                      </Label>
                      <span className="text-sm text-muted-foreground">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
