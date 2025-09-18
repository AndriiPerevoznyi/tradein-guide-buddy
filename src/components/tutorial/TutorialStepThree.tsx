import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ExternalLink, PlayCircle, Code, AlertTriangle, Sparkles, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TutorialStepThreeProps {
  onComplete: () => void;
  onNext: () => void;
  isCompleted: boolean;
}

export const TutorialStepThree = ({ onComplete, onNext, isCompleted }: TutorialStepThreeProps) => {
  const [cartType, setCartType] = useState<'page' | 'drawer' | null>(() => {
    const saved = localStorage.getItem("shopify-tutorial-carttype");
    return saved ? JSON.parse(saved) : null;
  });
  const [extensionInstalled, setExtensionInstalled] = useState(() => {
    const saved = localStorage.getItem("shopify-tutorial-extension-installed");
    return saved ? JSON.parse(saved) : false;
  });
  const [codeSnippetCopied, setCodeSnippetCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (extensionInstalled && !isCompleted) {
      onComplete();
    }
  }, [extensionInstalled, isCompleted, onComplete]);

  const markExtensionInstalled = () => {
    setExtensionInstalled(true);
    localStorage.setItem("shopify-tutorial-extension-installed", JSON.stringify(true));
    
    toast({
      title: "Extension installed successfully!",
      description: "Your trade-in functionality is now active on your storefront",
    });
  };

  const openThemeEditor = () => {
    // In a real Shopify app, this would use Shopify App Bridge to navigate
    window.open('/admin/themes/current/editor?previewPath=/cart', '_blank');
  };

  const copyCodeSnippet = () => {
    const codeSnippet = `<div id="tradein-extension-mount" class="tradein-container">
  <!-- Trade-in Pro extension will render here -->
</div>`;
    
    navigator.clipboard.writeText(codeSnippet);
    setCodeSnippetCopied(true);
    setTimeout(() => setCodeSnippetCopied(false), 2000);
    
    toast({
      title: "Code copied!",
      description: "Paste this code in your cart-drawer.liquid file",
    });
  };

  return (
    <Card className="shadow-tutorial-lg bg-gradient-card border-0">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-success text-success-foreground animate-success-bounce' : 'bg-primary text-primary-foreground'
          }`}>
            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <CardTitle className="text-2xl">Install Trade-in Extensions</CardTitle>
            <CardDescription className="text-base">
              Add trade-in functionality to your {cartType === 'drawer' ? 'cart drawer' : 'cart page'}
            </CardDescription>
          </div>
        </div>
        
        {isCompleted && (
          <div className="bg-success-light border border-success/20 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Extensions installed successfully!</span>
            </div>
            <p className="text-sm text-success mt-1">
              Your trade-in functionality is now live on your storefront
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {cartType === 'page' ? (
          /* Cart Page Installation */
          <div className="space-y-6">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-success mb-1">Simple Installation Process</p>
                  <p className="text-sm text-muted-foreground">
                    Cart page extensions can be installed directly through Shopify's theme editor
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="install" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="install">Installation Steps</TabsTrigger>
                <TabsTrigger value="video">Video Guide</TabsTrigger>
              </TabsList>
              
              <TabsContent value="install" className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-accent/30 rounded-lg p-6 border border-accent">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-primary" />
                      Step-by-Step Installation
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</div>
                        <div>
                          <p className="font-medium mb-1">Open Theme Editor</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Click the button below to open your cart page in the theme editor
                          </p>
                          <Button onClick={openThemeEditor} variant="outline" size="sm" className="hover:bg-primary/5">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open Cart Page Editor
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</div>
                        <div>
                          <p className="font-medium mb-1">Add Trade-in Block</p>
                          <p className="text-sm text-muted-foreground">
                            In the left sidebar, click "Add block" and select "Trade-in Pro" from the list of available blocks
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</div>
                        <div>
                          <p className="font-medium mb-1">Position the Block</p>
                          <p className="text-sm text-muted-foreground">
                            Drag the Trade-in Pro block to the top of your cart template, above the cart items
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">4</div>
                        <div>
                          <p className="font-medium mb-1">Save Changes</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Click "Save" in the theme editor to publish your changes
                          </p>
                          <Button 
                            onClick={markExtensionInstalled}
                            className="bg-gradient-success hover:opacity-90 border-0"
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Installed
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="space-y-4">
                <div className="bg-accent/30 rounded-lg p-6 border border-accent text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <PlayCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Video Tutorial</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Watch our step-by-step video guide for installing the cart page extension
                  </p>
                  <Button variant="outline" className="hover:bg-primary/5">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Watch Installation Video
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          /* Cart Drawer Installation */
          <div className="space-y-6">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-warning mb-1">Developer Assistance Recommended</p>
                  <p className="text-sm text-muted-foreground">
                    Cart drawer integration requires custom code modifications to your theme files
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="code">Code Setup</TabsTrigger>
                <TabsTrigger value="steps">Installation</TabsTrigger>
                <TabsTrigger value="video">Video Guide</TabsTrigger>
              </TabsList>
              
              <TabsContent value="code" className="space-y-4">
                <div className="bg-accent/30 rounded-lg p-6 border border-accent">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    Required Code Addition
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Add this code snippet to your <code className="bg-muted px-1 rounded">cart-drawer.liquid</code> file, 
                    positioned before the checkout button:
                  </p>
                  
                  <div className="bg-background rounded-lg p-4 border border-border font-mono text-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-muted-foreground">cart-drawer.liquid</span>
                      <Button
                        onClick={copyCodeSnippet}
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs"
                      >
                        {codeSnippetCopied ? (
                          <><Check className="w-3 h-3 mr-1" /> Copied</>
                        ) : (
                          <><Copy className="w-3 h-3 mr-1" /> Copy</>
                        )}
                      </Button>
                    </div>
                    <pre className="text-foreground overflow-x-auto">{`<div id="tradein-extension-mount" class="tradein-container">
  <!-- Trade-in Pro extension will render here -->
</div>`}</pre>
                  </div>
                  
                  <div className="mt-4 p-3 bg-info/10 border border-info/20 rounded text-sm">
                    <p className="font-medium text-info mb-1">💡 Pro Tip</p>
                    <p className="text-muted-foreground text-xs">
                      Place this div right before your checkout button for optimal user experience
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="steps" className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-accent/30 rounded-lg p-6 border border-accent">
                    <h4 className="font-semibold mb-4">Installation Steps</h4>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</div>
                        <div>
                          <p className="font-medium mb-1">Locate cart-drawer.liquid</p>
                          <p className="text-sm text-muted-foreground">
                            Find your theme's cart drawer file in the sections or snippets folder
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</div>
                        <div>
                          <p className="font-medium mb-1">Add Extension Mount Point</p>
                          <p className="text-sm text-muted-foreground">
                            Insert the provided code snippet before the checkout button
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</div>
                        <div>
                          <p className="font-medium mb-1">Install Extension</p>
                          <p className="text-sm text-muted-foreground">
                            Add the Trade-in Pro drawer extension through the theme editor
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">4</div>
                        <div>
                          <p className="font-medium mb-1">Test & Save</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Test the trade-in functionality in your cart drawer and save changes
                          </p>
                          <Button 
                            onClick={markExtensionInstalled}
                            className="bg-gradient-success hover:opacity-90 border-0"
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Installed
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="space-y-4">
                <div className="bg-accent/30 rounded-lg p-6 border border-accent text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <PlayCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Cart Drawer Integration Video</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed video tutorial showing exactly how to modify your cart drawer theme files
                  </p>
                  <Button variant="outline" className="hover:bg-primary/5">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Watch Developer Guide
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Need Help Section */}
        <div className="bg-info/10 border border-info/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-info mb-1">Need Help with Installation?</p>
              <p className="text-muted-foreground mb-3 text-xs">
                Our team can help you with the technical setup. We offer installation support and custom styling services.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Contact Support
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Schedule Call
                </Button>
              </div>
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
              Complete Setup
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};