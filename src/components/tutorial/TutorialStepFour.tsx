import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, CheckCircle, Sparkles, ExternalLink, TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TutorialStepFourProps {
  onComplete: () => void;
  onNext: () => void;
  isCompleted: boolean;
}

export const TutorialStepFour = ({ onComplete, onNext, isCompleted }: TutorialStepFourProps) => {
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-complete this step since it's the final congratulatory step
    if (!isCompleted) {
      onComplete();
    }
  }, [isCompleted, onComplete]);

  const completeSetup = async () => {
    setIsLaunching(true);
    
    // Simulate final setup completion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSetupCompleted(true);
    localStorage.setItem("shopify-tutorial-completed", JSON.stringify(true));
    setIsLaunching(false);
    
    toast({
      title: "🎉 Setup Complete!",
      description: "Your trade-in program is now live and ready to boost customer engagement!",
    });
  };

  const goToDashboard = () => {
    // Navigate to main app dashboard
    window.location.href = '/app';
  };

  const quickStats = [
    {
      icon: Users,
      title: "Customer Engagement",
      description: "Trade-ins increase customer retention by 35%",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Average Order Value",
      description: "See 20-40% increase in order values",
      color: "text-green-600"
    },
    {
      icon: DollarSign,
      title: "Revenue Growth",
      description: "Merchants report 25% revenue boost",
      color: "text-purple-600"
    }
  ];

  return (
    <Card className="shadow-lg bg-card border">
      <div className="bg-success absolute inset-x-0 top-0 h-1"></div>
      
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center animate-bounce">
            <Rocket className="w-8 h-8 text-success-foreground" />
          </div>
        </div>
        
        <CardTitle className="text-3xl mb-2 text-success">
          🎉 Congratulations!
        </CardTitle>
        <CardDescription className="text-lg">
          Your trade-in program is now live and ready to engage customers
        </CardDescription>

        <div className="flex justify-center mt-4">
          <Badge className="bg-success text-success-foreground border-0 px-4 py-2 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            iceep Trade-in Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Success Message */}
        <div className="bg-success-light border border-success/20 rounded-lg p-6 text-center">
          <Sparkles className="w-8 h-8 text-success mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-success mb-2">Setup Complete!</h3>
          <p className="text-sm text-success/80">
            Your customers can now trade in items for discounts during checkout. 
            Start seeing increased engagement and higher order values right away.
          </p>
        </div>

        {/* What's Next */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What happens now?</h3>
          
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg border border-accent">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Trade-in Form Available</p>
                <p className="text-sm text-muted-foreground">
                  Customers will see the trade-in option in their cart with your configured categories
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg border border-accent">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Review Trade-in Submissions</p>
                <p className="text-sm text-muted-foreground">
                  Manage and approve trade-ins from your dashboard to process customer discounts
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-accent/30 rounded-lg border border-accent">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Monitor Performance</p>
                <p className="text-sm text-muted-foreground">
                  Track conversion rates, average order values, and customer engagement metrics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Expected Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickStats.map((stat) => (
              <div key={stat.title} className="text-center p-4 bg-background rounded-lg border border-border">
                <div className={`w-10 h-10 mx-auto mb-3 rounded-full bg-accent flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <h4 className="font-medium mb-1 text-sm">{stat.title}</h4>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          {!setupCompleted ? (
            <Button 
              onClick={completeSetup}
              disabled={isLaunching}
              size="lg"
              className="w-full bg-success hover:bg-success/90 text-success-foreground text-lg py-6"
            >
              {isLaunching ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                  Launching...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Trading In!
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-3">
              <Button 
                onClick={goToDashboard}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" size="lg">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Storefront
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Customer Guide
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Support & Resources */}
        <div className="bg-info/10 border border-info/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-info mb-1">Need Help Getting Started?</p>
              <p className="text-muted-foreground mb-3 text-xs">
                Check out our resources or contact support for optimization tips and best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Best Practices Guide
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Video Tutorials
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Thank you for choosing <strong className="text-primary">iceep</strong>! 
            We're excited to help you grow your business with sustainable trade-in solutions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};