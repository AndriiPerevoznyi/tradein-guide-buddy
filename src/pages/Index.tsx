import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, ShoppingCart, TrendingUp } from "lucide-react";

const Index = () => {
  const goToTutorial = () => {
    window.location.href = '/tutorial';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-4xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-tutorial-glow">
            <Sparkles className="w-4 h-4" />
            Trade-in Pro
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Shopify Trade-in Solution
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Boost customer engagement and increase order values with our comprehensive trade-in program for your Shopify store.
          </p>
          
          <Button 
            onClick={goToTutorial}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 border-0 text-lg px-8 py-6"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Setup Tutorial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-tutorial-md bg-gradient-card border-0 text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Easy Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seamlessly integrate with both cart pages and cart drawers with our guided setup.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-tutorial-md bg-gradient-card border-0 text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-lg">Boost Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Increase average order values by 20-40% with customer trade-in incentives.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-tutorial-md bg-gradient-card border-0 text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-info" />
              </div>
              <CardTitle className="text-lg">Customer Loyalty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build stronger relationships with sustainable trade-in programs that customers love.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="shadow-tutorial-lg bg-gradient-hero text-white border-0 text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Ready to Get Started?</CardTitle>
            <CardDescription className="text-white/90 text-base">
              Our step-by-step tutorial will have you up and running in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={goToTutorial}
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            >
              Launch Setup Tutorial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="mt-6 flex justify-center gap-6 text-sm text-white/80">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                ✓ 4-Step Setup
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                ✓ Video Guides
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                ✓ Full Support
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
