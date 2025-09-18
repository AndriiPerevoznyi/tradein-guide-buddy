import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, DollarSign, Tag, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  discount: number;
}

interface TutorialStepOneProps {
  onComplete: () => void;
  onNext: () => void;
  isCompleted: boolean;
}

export const TutorialStepOne = ({ onComplete, onNext, isCompleted }: TutorialStepOneProps) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("shopify-tutorial-categories");
    return saved ? JSON.parse(saved) : [];
  });
  const [newCategory, setNewCategory] = useState({ name: "", discount: "" });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("shopify-tutorial-categories", JSON.stringify(categories));
    
    // Auto-complete step if we have at least one category
    if (categories.length > 0 && !isCompleted) {
      onComplete();
    }
  }, [categories, isCompleted, onComplete]);

  const addCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a name for the trade-in category",
        variant: "destructive"
      });
      return;
    }

    if (!newCategory.discount || parseFloat(newCategory.discount) <= 0) {
      toast({
        title: "Valid discount required",
        description: "Please enter a discount amount greater than 0",
        variant: "destructive"
      });
      return;
    }

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      discount: parseFloat(newCategory.discount)
    };

    setCategories(prev => [...prev, category]);
    setNewCategory({ name: "", discount: "" });
    
    toast({
      title: "Category added successfully",
      description: `${category.name} category created with ${category.discount}% discount`,
    });
  };

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast({
      title: "Category removed",
      description: "Trade-in category has been deleted",
    });
  };

  const suggestedCategories = [
    { name: "Electronics", discount: 15 },
    { name: "Clothing", discount: 20 },
    { name: "Books", discount: 10 },
    { name: "Home & Garden", discount: 25 },
    { name: "Sports Equipment", discount: 18 }
  ];

  const addSuggestedCategory = (suggested: { name: string; discount: number }) => {
    const category: Category = {
      id: Date.now().toString(),
      name: suggested.name,
      discount: suggested.discount
    };
    setCategories(prev => [...prev, category]);
    
    toast({
      title: "Category added",
      description: `${category.name} added with ${category.discount}% discount`,
    });
  };

  return (
    <Card className="shadow-tutorial-lg bg-gradient-card border-0">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-success text-success-foreground animate-success-bounce' : 'bg-primary text-primary-foreground'
          }`}>
            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
          </div>
          <div>
            <CardTitle className="text-2xl">Create Trade-in Categories</CardTitle>
            <CardDescription className="text-base">
              Set up product categories that customers can trade in for discounts
            </CardDescription>
          </div>
        </div>
        
        {isCompleted && (
          <div className="bg-success-light border border-success/20 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Step completed successfully!</span>
            </div>
            <p className="text-sm text-success mt-1">
              You've created {categories.length} trade-in {categories.length === 1 ? 'category' : 'categories'}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Add New Category Form */}
        <div className="bg-accent/30 rounded-lg p-6 border border-accent">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Add New Category
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                placeholder="e.g., Electronics, Clothing..."
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discount">Discount Percentage</Label>
              <div className="relative">
                <Input
                  id="discount"
                  type="number"
                  placeholder="e.g., 15"
                  value={newCategory.discount}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, discount: e.target.value }))}
                  className="bg-background pr-8"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={addCategory}
            className="bg-gradient-primary hover:opacity-90 border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Suggested Categories */}
        {categories.length === 0 && (
          <div>
            <h3 className="font-semibold mb-3 text-muted-foreground">Quick Start - Popular Categories:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {suggestedCategories.map((suggested) => (
                <Button
                  key={suggested.name}
                  variant="outline"
                  size="sm"
                  onClick={() => addSuggestedCategory(suggested)}
                  className="justify-start h-auto p-3 hover:bg-primary/5 hover:border-primary/30"
                >
                  <div className="text-left">
                    <div className="font-medium">{suggested.name}</div>
                    <div className="text-xs text-muted-foreground">{suggested.discount}% discount</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Current Categories */}
        {categories.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Your Trade-in Categories</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'}
              </Badge>
            </div>
            
            <div className="grid gap-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:shadow-tutorial-sm transition-all duration-fast"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Tag className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {category.discount}% trade-in discount
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCategory(category.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="bg-info/10 border border-info/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-info mb-1">How Trade-in Categories Work</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Customers select a category when submitting trade-in items</li>
                <li>• Each category has a discount percentage that applies to approved trade-ins</li>
                <li>• You can add multiple languages later in your Shopify admin</li>
                <li>• Categories help you organize and price different types of trade-ins</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Step Button */}
        {isCompleted && (
          <div className="pt-4">
            <Button
              onClick={onNext}
              size="lg"
              className="w-full bg-gradient-primary hover:opacity-90 border-0"
            >
              Continue to Cart Detection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};