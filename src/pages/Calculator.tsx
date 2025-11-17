import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Settings, Cake } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingConfig {
  panSizes: { [key: string]: number };
  flavors: { [key: string]: number };
  shapes: { [key: string]: number };
  fondantElements: number;
  colors: number;
  fakeFlowers: number;
  realFlowers: number;
  macarons: number;
}

const defaultConfig: PricingConfig = {
  panSizes: {
    "4 inch bento": 20,
    "4 inch tall": 25,
    "6 inch round": 25,
    "6 inch tall": 30,
    "8 inch round": 30,
  },
  flavors: {
    "Vanilla": 0,
    "Chocolate": 5,
    "Red Velvet": 10,
    "Lemon": 8,
    "Strawberry": 8,
  },
  shapes: {
    "Round": 0,
    "Square": 5,
    "Heart": 15,
    "Custom": 25,
  },
  fondantElements: 15,
  colors: 5,
  fakeFlowers: 10,
  realFlowers: 25,
  macarons: 3,
};

const Calculator = () => {
  const [config, setConfig] = useState<PricingConfig>(defaultConfig);
  const [panSize, setPanSize] = useState<string>("");
  const [flavor, setFlavor] = useState<string>("");
  const [shape, setShape] = useState<string>("");
  const [fondantCount, setFondantCount] = useState<number>(0);
  const [colorCount, setColorCount] = useState<number>(0);
  const [fakeFlowerCount, setFakeFlowerCount] = useState<number>(0);
  const [realFlowerCount, setRealFlowerCount] = useState<number>(0);
  const [macaronCount, setMacaronCount] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("cakePricing");
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const calculateTotal = (): number => {
    let total = 0;
    
    if (panSize) total += config.panSizes[panSize] || 0;
    if (flavor) total += config.flavors[flavor] || 0;
    if (shape) total += config.shapes[shape] || 0;
    
    total += fondantCount * config.fondantElements;
    total += colorCount * config.colors;
    total += fakeFlowerCount * config.fakeFlowers;
    total += realFlowerCount * config.realFlowers;
    total += macaronCount * config.macarons;
    
    return total;
  };

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Cake className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cake Price Calculator</h1>
              <p className="text-muted-foreground">Select your options to get an instant quote</p>
            </div>
          </div>
          <Link to="/settings">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Options</CardTitle>
                <CardDescription>Choose your base cake configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Pan Size</Label>
                  <RadioGroup value={panSize} onValueChange={setPanSize}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {Object.entries(config.panSizes).map(([size, price]) => (
                        <div key={size} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={size} id={`size-${size}`} />
                          <Label htmlFor={`size-${size}`} className="flex-1 cursor-pointer font-normal">
                            {size} <span className="text-muted-foreground">(${price})</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Flavor</Label>
                  <RadioGroup value={flavor} onValueChange={setFlavor}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {Object.entries(config.flavors).map(([flavorName, price]) => (
                        <div key={flavorName} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={flavorName} id={`flavor-${flavorName}`} />
                          <Label htmlFor={`flavor-${flavorName}`} className="flex-1 cursor-pointer font-normal">
                            {flavorName} {price > 0 && <span className="text-muted-foreground">(+${price})</span>}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Shape</Label>
                  <RadioGroup value={shape} onValueChange={setShape}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {Object.entries(config.shapes).map(([shapeName, price]) => (
                        <div key={shapeName} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={shapeName} id={`shape-${shapeName}`} />
                          <Label htmlFor={`shape-${shapeName}`} className="flex-1 cursor-pointer font-normal">
                            {shapeName} {price > 0 && <span className="text-muted-foreground">(+${price})</span>}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add-ons</CardTitle>
                <CardDescription>Customize your cake with additional elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fondant">Fondant Elements (${config.fondantElements} each)</Label>
                    <Input
                      id="fondant"
                      type="number"
                      min="0"
                      value={fondantCount}
                      onChange={(e) => setFondantCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colors">Additional Colors (${config.colors} each)</Label>
                    <Input
                      id="colors"
                      type="number"
                      min="0"
                      value={colorCount}
                      onChange={(e) => setColorCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fakeFlowers">Fake Flowers (${config.fakeFlowers} each)</Label>
                    <Input
                      id="fakeFlowers"
                      type="number"
                      min="0"
                      value={fakeFlowerCount}
                      onChange={(e) => setFakeFlowerCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="realFlowers">Real Flowers (${config.realFlowers} each)</Label>
                    <Input
                      id="realFlowers"
                      type="number"
                      min="0"
                      value={realFlowerCount}
                      onChange={(e) => setRealFlowerCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="macarons">Macarons (${config.macarons} each)</Label>
                    <Input
                      id="macarons"
                      type="number"
                      min="0"
                      value={macaronCount}
                      onChange={(e) => setMacaronCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Price Quote</CardTitle>
                <CardDescription>Your custom cake estimate</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  {panSize && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Pan Size: {panSize}</span>
                      <span className="font-medium">${config.panSizes[panSize]}</span>
                    </div>
                  )}
                  {flavor && config.flavors[flavor] > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Flavor: {flavor}</span>
                      <span className="font-medium">${config.flavors[flavor]}</span>
                    </div>
                  )}
                  {shape && config.shapes[shape] > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Shape: {shape}</span>
                      <span className="font-medium">${config.shapes[shape]}</span>
                    </div>
                  )}
                  {fondantCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Fondant ({fondantCount})</span>
                      <span className="font-medium">${fondantCount * config.fondantElements}</span>
                    </div>
                  )}
                  {colorCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Colors ({colorCount})</span>
                      <span className="font-medium">${colorCount * config.colors}</span>
                    </div>
                  )}
                  {fakeFlowerCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Fake Flowers ({fakeFlowerCount})</span>
                      <span className="font-medium">${fakeFlowerCount * config.fakeFlowers}</span>
                    </div>
                  )}
                  {realFlowerCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Real Flowers ({realFlowerCount})</span>
                      <span className="font-medium">${realFlowerCount * config.realFlowers}</span>
                    </div>
                  )}
                  {macaronCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Macarons ({macaronCount})</span>
                      <span className="font-medium">${macaronCount * config.macarons}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t-2 border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {total === 0 && (
                  <p className="mt-4 text-xs text-center text-muted-foreground">
                    Select options above to calculate your price
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
