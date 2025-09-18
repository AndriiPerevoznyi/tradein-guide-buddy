import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CreditCard } from "lucide-react";

const Index = () => {
  const handleSubscriptionApproval = () => {
    // This would redirect to Shopify's native subscription approval page
    // For now, we'll simulate and go to tutorial
    window.location.href = '/tutorial';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto py-16 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            Welcome to iceep
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Start your trade-in program and boost customer engagement with sustainable shopping options.
          </p>
          
          <Card className="text-left">
            <CardHeader>
              <CardTitle>Start Your Free Trial</CardTitle>
              <CardDescription>
                Approve your subscription to begin setting up your trade-in program. You'll get 14 days free to try all features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSubscriptionApproval}
                size="lg"
                className="w-full"
              >
                Approve Subscription & Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          
          <p className="text-sm text-muted-foreground mt-6">
            Need help? Contact us at{" "}
            <a href="mailto:support@iceep.io" className="text-primary hover:underline">
              support@iceep.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
