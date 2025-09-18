import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Sparkles, ShoppingCart, Settings, Rocket } from "lucide-react";
import { TutorialStepOne } from "@/components/tutorial/TutorialStepOne";
import { TutorialStepTwo } from "@/components/tutorial/TutorialStepTwo";
import { TutorialStepThree } from "@/components/tutorial/TutorialStepThree";
import { TutorialStepFour } from "@/components/tutorial/TutorialStepFour";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
  component: React.ComponentType<{ onComplete: () => void; onNext: () => void; isCompleted: boolean }>;
}

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialData, setTutorialData] = useState(() => {
    // Load saved tutorial progress from localStorage
    const saved = localStorage.getItem("shopify-tutorial-progress");
    return saved ? JSON.parse(saved) : {
      completedSteps: [],
      currentStep: 0,
      categories: [],
      cartType: null,
      extensionInstalled: false
    };
  });

  const steps: TutorialStep[] = [
    {
      id: "categories",
      title: "Create Trade-in Categories",
      description: "Set up product categories with discounts for trade-ins",
      icon: Settings,
      completed: tutorialData.completedSteps.includes("categories"),
      component: TutorialStepOne
    },
    {
      id: "cart-detection",
      title: "Detect Cart Type",
      description: "We'll check your store's cart configuration",
      icon: ShoppingCart,
      completed: tutorialData.completedSteps.includes("cart-detection"),
      component: TutorialStepTwo
    },
    {
      id: "extension-setup",
      title: "Install Extensions",
      description: "Add trade-in functionality to your storefront",
      icon: Sparkles,
      completed: tutorialData.completedSteps.includes("extension-setup"),
      component: TutorialStepThree
    },
    {
      id: "launch",
      title: "Launch Your Trade-in",
      description: "You're ready to start offering trade-ins!",
      icon: Rocket,
      completed: tutorialData.completedSteps.includes("launch"),
      component: TutorialStepFour
    }
  ];

  const progressPercentage = (tutorialData.completedSteps.length / steps.length) * 100;

  useEffect(() => {
    // Save tutorial progress
    localStorage.setItem("shopify-tutorial-progress", JSON.stringify(tutorialData));
  }, [tutorialData]);

  const handleStepComplete = (stepId: string) => {
    if (!tutorialData.completedSteps.includes(stepId)) {
      setTutorialData(prev => ({
        ...prev,
        completedSteps: [...prev.completedSteps, stepId]
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTutorialData(prev => ({ ...prev, currentStep: currentStep + 1 }));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTutorialData(prev => ({ ...prev, currentStep: currentStep - 1 }));
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Setup Your Trade-in Program
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's get your trade-in program configured in a few simple steps.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Setup Progress</CardTitle>
              <Badge variant="secondary">
                {tutorialData.completedSteps.length} of {steps.length} completed
              </Badge>
            </div>
            <Progress value={progressPercentage} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer hover:bg-accent/50 ${
                    index === currentStep ? 'bg-primary/10 border border-primary/20' : ''
                  } ${step.completed ? 'bg-success/10' : ''}`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-success text-success-foreground' 
                      : index === currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${
                      step.completed ? 'text-success' : index === currentStep ? 'text-primary' : 'text-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Current Step Content */}
        <div>
          <CurrentStepComponent
            onComplete={() => handleStepComplete(steps[currentStep].id)}
            onNext={handleNext}
            isCompleted={steps[currentStep].completed}
          />
        </div>

        {/* Navigation */}
        <Card className="mt-8">
          <CardFooter className="flex justify-between items-center p-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1 || !steps[currentStep].completed}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? "Complete Setup" : "Next Step"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact us at{" "}
            <a href="mailto:support@iceep.io" className="text-primary hover:underline font-medium">
              support@iceep.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;