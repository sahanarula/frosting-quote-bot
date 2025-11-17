import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
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
    "6 inch": 30,
    "8 inch": 45,
    "10 inch": 65,
    "12 inch": 85,
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

const Settings = () => {
  const [config, setConfig] = useState<PricingConfig>(defaultConfig);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("cakePricing");
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("cakePricing", JSON.stringify(config));
    toast({
      title: "Settings saved!",
      description: "Your pricing configuration has been updated.",
    });
  };

  const updatePanSize = (size: string, value: string) => {
    setConfig({
      ...config,
      panSizes: { ...config.panSizes, [size]: parseFloat(value) || 0 },
    });
  };

  const updateFlavor = (flavor: string, value: string) => {
    setConfig({
      ...config,
      flavors: { ...config.flavors, [flavor]: parseFloat(value) || 0 },
    });
  };

  const updateShape = (shape: string, value: string) => {
    setConfig({
      ...config,
      shapes: { ...config.shapes, [shape]: parseFloat(value) || 0 },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pricing Settings</h1>
            <p className="text-muted-foreground">Configure your cake pricing options</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pan Sizes</CardTitle>
              <CardDescription>Base prices for different pan sizes</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {Object.entries(config.panSizes).map(([size, price]) => (
                <div key={size} className="space-y-2">
                  <Label htmlFor={`pan-${size}`}>{size}</Label>
                  <Input
                    id={`pan-${size}`}
                    type="number"
                    value={price}
                    onChange={(e) => updatePanSize(size, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Flavors</CardTitle>
              <CardDescription>Additional cost for different flavors</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {Object.entries(config.flavors).map(([flavor, price]) => (
                <div key={flavor} className="space-y-2">
                  <Label htmlFor={`flavor-${flavor}`}>{flavor}</Label>
                  <Input
                    id={`flavor-${flavor}`}
                    type="number"
                    value={price}
                    onChange={(e) => updateFlavor(flavor, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shapes</CardTitle>
              <CardDescription>Additional cost for different shapes</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {Object.entries(config.shapes).map(([shape, price]) => (
                <div key={shape} className="space-y-2">
                  <Label htmlFor={`shape-${shape}`}>{shape}</Label>
                  <Input
                    id={`shape-${shape}`}
                    type="number"
                    value={price}
                    onChange={(e) => updateShape(shape, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add-ons</CardTitle>
              <CardDescription>Price per unit for additional elements</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fondant">Fondant Elements (per element)</Label>
                <Input
                  id="fondant"
                  type="number"
                  value={config.fondantElements}
                  onChange={(e) => setConfig({ ...config, fondantElements: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colors">Additional Colors (per color)</Label>
                <Input
                  id="colors"
                  type="number"
                  value={config.colors}
                  onChange={(e) => setConfig({ ...config, colors: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fakeFlowers">Fake Flowers (per flower)</Label>
                <Input
                  id="fakeFlowers"
                  type="number"
                  value={config.fakeFlowers}
                  onChange={(e) => setConfig({ ...config, fakeFlowers: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="realFlowers">Real Flowers (per flower)</Label>
                <Input
                  id="realFlowers"
                  type="number"
                  value={config.realFlowers}
                  onChange={(e) => setConfig({ ...config, realFlowers: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="macarons">Macarons (per piece)</Label>
                <Input
                  id="macarons"
                  type="number"
                  value={config.macarons}
                  onChange={(e) => setConfig({ ...config, macarons: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full sm:w-auto" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
