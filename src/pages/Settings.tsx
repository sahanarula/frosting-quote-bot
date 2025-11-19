import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingConfig {
  panSizes: { [key: string]: { price: number; servings: string } };
  flavors: { [key: string]: number };
  shapes: { [key: string]: number };
  smallFondant: number;
  mediumFondant: number;
  largeFondant: number;
  colors: number;
  fakeFlowers: number;
  realFlowers: number;
  macarons: number;
  stickerPrints: number;
  ediblePrint: number;
  miscItems: { [key: string]: { name: string; price: number } };
}

const defaultConfig: PricingConfig = {
  panSizes: {
    "4 inch bento": { price: 20, servings: "4-6" },
    "4 inch tall": { price: 30, servings: "6-8" },
    "6 inch round": { price: 30, servings: "10-12" },
    "6 inch tall": { price: 45, servings: "15-18" },
    "8 inch round": { price: 45, servings: "20-24" },
    "8 inch tall": { price: 60, servings: "30-35" },
    "10 inch round": { price: 65, servings: "30-38" },
    "10 inch tall": { price: 80, servings: "45-50" },
    "12 inch round": { price: 85, servings: "40-50" },
    "12 inch tall": { price: 100, servings: "60-70" },
  },
  flavors: {
    "Vanilla": 0,
    "Pineapple": 0,
    "Mango": 0,
    "Strawberry": 0,
    "Chocolate": 0,
    "Marble": 0,
    "Carrot": 15,
    "Blueberry": 0,
    "Caramel": 0,
    "Oreo": 15,
    "Pina Collada": 0,
    "Lemon": 0,
    "Red Velvet": 15,
    "Coconut + Vanilla": 5,
    "Mixed Fresh Fruit": 15,
    "Butterscotch": 0,
    "Dulce de leche": 0,
    "Biscoff": 10,
    "Rasmalai": 15,
    "Gulab Jamun": 15,
    "Kulfi Faluda": 15,
    "Rose Pistachio": 10,
    "Kesar Pista": 10,
    "Nutella": 10,
    "Ferrero Rocher": 15,
    "Kit-Kat": 10,
  },
  shapes: {
    "Round": 0,
    "Square": 5,
    "Heart": 10,
    "Custom": 15,
  },
  smallFondant: 8,
  mediumFondant: 15,
  largeFondant: 20,
  colors: 5,
  fakeFlowers: 3,
  realFlowers: 9,
  macarons: 3,
  stickerPrints: 5,
  ediblePrint: 10,
  miscItems: {
    "misc1": { name: "Gift Box", price: 10 },
    "misc2": { name: "Candles", price: 5 },
    "misc3": { name: "Cake Topper", price: 8 },
    "misc4": { name: "Special Decoration", price: 12 },
  },
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
      panSizes: { 
        ...config.panSizes, 
        [size]: { ...config.panSizes[size], price: parseFloat(value) || 0 }
      },
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

  const updateMiscItemName = (key: string, name: string) => {
    setConfig({
      ...config,
      miscItems: { ...config.miscItems, [key]: { ...config.miscItems[key], name } },
    });
  };

  const updateMiscItemPrice = (key: string, value: string) => {
    setConfig({
      ...config,
      miscItems: { ...config.miscItems, [key]: { ...config.miscItems[key], price: parseFloat(value) || 0 } },
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
              {Object.entries(config.panSizes).map(([size, data]) => (
                <div key={size} className="space-y-2">
                  <Label htmlFor={`pan-${size}`}>{size} ({data.servings} servings)</Label>
                  <Input
                    id={`pan-${size}`}
                    type="number"
                    value={data.price}
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
                <Label htmlFor="smallFondant">Small Fondant Element (per element)</Label>
                <Input
                  id="smallFondant"
                  type="number"
                  value={config.smallFondant}
                  onChange={(e) => setConfig({ ...config, smallFondant: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mediumFondant">Medium Fondant Element (per element)</Label>
                <Input
                  id="mediumFondant"
                  type="number"
                  value={config.mediumFondant}
                  onChange={(e) => setConfig({ ...config, mediumFondant: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="largeFondant">Large Fondant Element (per element)</Label>
                <Input
                  id="largeFondant"
                  type="number"
                  value={config.largeFondant}
                  onChange={(e) => setConfig({ ...config, largeFondant: parseFloat(e.target.value) || 0 })}
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
              <div className="space-y-2">
                <Label htmlFor="stickerPrints">Sticker Prints (per piece)</Label>
                <Input
                  id="stickerPrints"
                  type="number"
                  value={config.stickerPrints}
                  onChange={(e) => setConfig({ ...config, stickerPrints: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ediblePrint">Edible Print (per piece)</Label>
                <Input
                  id="ediblePrint"
                  type="number"
                  value={config.ediblePrint}
                  onChange={(e) => setConfig({ ...config, ediblePrint: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Miscellaneous Items</CardTitle>
              <CardDescription>Configure custom items with prices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {Object.entries(config.miscItems).map(([key, item]) => (
                  <div key={key} className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-name`}>Item Name</Label>
                      <Input
                        id={`${key}-name`}
                        type="text"
                        value={item.name}
                        onChange={(e) => updateMiscItemName(key, e.target.value)}
                        placeholder="e.g., Gift Box"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${key}-price`}>Price (per item)</Label>
                      <Input
                        id={`${key}-price`}
                        type="number"
                        value={item.price}
                        onChange={(e) => updateMiscItemPrice(key, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
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
