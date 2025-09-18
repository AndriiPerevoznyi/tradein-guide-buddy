import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, Loader2, AlertTriangle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TutorialStepTwoProps {
  onComplete: () => void;
  onNext: () => void;
  isCompleted: boolean;
}

type CartType = 'page' | 'drawer' | null;

export const TutorialStepTwo = ({ onComplete, onNext, isCompleted }: TutorialStepTwoProps) => {
  const [cartType, setCartType] = useState<CartType>(() => {
    const saved = localStorage.getItem("shopify-tutorial-carttype");
    return saved ? JSON.parse(saved) : null;
  });
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cartType) {
      localStorage.setItem("shopify-tutorial-carttype", JSON.stringify(cartType));
      if (!isCompleted) {
        onComplete();
      }
    }
  }, [cartType, isCompleted, onComplete]);

  // Simulate cart type detection
  const detectCartType = async () => {
    setIsDetecting(true);
    
    // Simulate API call to analyze the store
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, randomly assign cart type
    // In real implementation, this would analyze the store's theme
    const detectedType: CartType = Math.random() > 0.5 ? 'drawer' : 'page';
    
    setCartType(detectedType);
    setDetectionComplete(true);
    setIsDetecting(false);
    
    toast({
      title: "Cart type detected",
      description: `Your store uses ${detectedType === 'drawer' ? 'a slide-out cart drawer' : 'a dedicated cart page'}`,
    });
  };

  const manuallySetCartType = async (type: CartType) => {
    setIsLoading(true);
    
    // Simulate configuration saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCartType(type);
    setDetectionComplete(true);
    setIsLoading(false);
    
    toast({
      title: "Cart type set",
      description: `Manually set to ${type === 'drawer' ? 'cart drawer' : 'cart page'}`,
    });
  };

  return (
    <Card className="shadow-tutorial-lg bg-gradient-card border-0">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-success text-success-foreground animate-success-bounce' : 'bg-primary text-primary-foreground'
          }`}>
            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          </div>
          <div>
            <CardTitle className="text-2xl">Detect Your Cart Type</CardTitle>
            <CardDescription className="text-base">
              We need to understand how your store's cart works to install the right features
            </CardDescription>
          </div>
        </div>
        
        {isCompleted && (
          <div className="bg-success-light border border-success/20 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Cart type detected successfully!</span>
            </div>
            <p className="text-sm text-success mt-1">
              Your store uses {cartType === 'drawer' ? 'a slide-out cart drawer' : 'a dedicated cart page'}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Detection Process */}
        {!detectionComplete && (
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Let's analyze your cart setup</h3>
              <p className="text-muted-foreground">
                We'll check your store's theme to determine how your cart works
              </p>
            </div>

            {!isDetecting ? (
              <Button 
                onClick={detectCartType}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Detect Cart Type
              </Button>
            ) : (
              <div className="space-y-4">
                <Button 
                  disabled
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing your store...
                </Button>
                <p className="text-sm text-muted-foreground">
                  This may take a few seconds while we examine your theme files
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Know your cart type? Set it manually:
              </p>
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => manuallySetCartType('page')}
                  disabled={isLoading}
                >
                  {isLoading ? 'Setting...' : 'Cart Page'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => manuallySetCartType('drawer')}
                  disabled={isLoading}
                >
                  {isLoading ? 'Setting...' : 'Cart Drawer'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Detection Results */}
        {detectionComplete && cartType && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cart Type Detected</h3>
              <Badge variant="outline" className="bg-success-light text-success border-success/20 text-lg px-4 py-2">
                {cartType === 'drawer' ? 'Cart Drawer' : 'Cart Page'}
              </Badge>
            </div>

            {/* Cart Type Explanation */}
            <div className="bg-accent/30 rounded-lg p-6 border border-accent">
              {cartType === 'drawer' ? (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Cart Drawer Setup
                  </h4>
                  <div className="space-y-3 text-sm">
                    <p>Your store uses a <strong>slide-out cart drawer</strong> that appears when customers add items to their cart.</p>
                    
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-warning mb-1">Developer Assistance Recommended</p>
                          <p className="text-muted-foreground">
                            Cart drawer integration requires adding custom code to your theme. We recommend having a developer help with this step.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                      <h5 className="font-medium mb-2">What we'll install:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Cart drawer extension for trade-in form</li>
                        <li>• Custom div element in cart-drawer.liquid</li>
                        <li>• Trade-in button before checkout</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Cart Page Setup
                  </h4>
                  <div className="space-y-3 text-sm">
                    <p>Your store uses a <strong>dedicated cart page</strong> where customers review their items before checkout.</p>
                    
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-success mb-1">Easy Installation</p>
                          <p className="text-muted-foreground">
                            Cart page extensions are easier to install and can be added directly through the theme editor.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                      <h5 className="font-medium mb-2">What we'll install:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Cart page extension with trade-in form</li>
                        <li>• Block placement at top of cart template</li>
                        <li>• Trade-in submission integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Manual Override Option */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">
                Not correct? You can change this:
              </p>
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => manuallySetCartType('page')}
                  className={`hover:bg-primary/5 ${cartType === 'page' ? 'bg-primary/10 border-primary/20' : ''}`}
                >
                  Cart Page
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => manuallySetCartType('drawer')}
                  className={`hover:bg-primary/5 ${cartType === 'drawer' ? 'bg-primary/10 border-primary/20' : ''}`}
                >
                  Cart Drawer
                </Button>
              </div>
            </div>

            {/* Next Step Button */}
            <div className="pt-4">
              <Button
                onClick={onNext}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continue to Extension Setup
              </Button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-info/10 border border-info/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ShoppingCart className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-info mb-1">Not sure which cart type you have?</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• <strong>Cart Page:</strong> Customers click "View Cart" and go to /cart page</li>
                <li>• <strong>Cart Drawer:</strong> A sidebar slides out when adding items to cart</li>
                <li>• Check your theme settings or ask your developer if unsure</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};