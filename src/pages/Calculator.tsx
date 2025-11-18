import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Settings, Cake } from "lucide-react";
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
    "4 inch bento": { price: 20, servings: "2" },
    "5 inch tall": { price: 35, servings: "6-8" },
    "6 inch round": { price: 40, servings: "4-6" },
    "6 inch tall": { price: 60, servings: "12-15" },
    "8 inch round": { price: 60, servings: "6-10" },
    "8 inch tall": { price: 85, servings: "24-28" },
    "10 inch tall": { price: 120, servings: "40–45" },
    "12 inch tall": { price: 165, servings: "55-60" },
  },
  flavors: {
    "Vanilla": 0,
    "Pineapple": 0,
    "Mango": 0,
    "Strawberry": 0,
    "Chocolate": 0,
    "Marble": 0,
    "Carrot": 5,
    "Blueberry": 0,
    "Caramel": 0,
    "Oreo": 5,
    "Pina Collada": 0,
    "Lemon": 0,
    "Red Velvet": 5,
    "Coconut + Vanilla": 5,
    "Mixed Fresh Fruit": 15,
    "Butterscotch": 0,
    "Dulce de leche": 0,
    "Biscoff": 0,
    "Rasmalai": 10,
    "Gulab Jamun": 10,
    "Kulfi Faluda": 0,
    "Rose Pistachio": 5,
    "Kesar Pista": 5,
    "Nutella": 5,
    "Ferrero Rocher": ,
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
    "misc1": { name: "Misc Item 1", price: 0 },
    "misc2": { name: "Misc Item 2", price: 0 },
    "misc3": { name: "Misc Item 3", price: 0 },
    "misc4": { name: "Misc Item 4", price: 0 },
  },
};

const Calculator = () => {
  const [config, setConfig] = useState<PricingConfig>(defaultConfig);
  const [panSize, setPanSize] = useState<string>("");
  const [flavor, setFlavor] = useState<string>("");
  const [shape, setShape] = useState<string>("");
  const [smallFondantCount, setSmallFondantCount] = useState<number>(0);
  const [mediumFondantCount, setMediumFondantCount] = useState<number>(0);
  const [largeFondantCount, setLargeFondantCount] = useState<number>(0);
  const [colorCount, setColorCount] = useState<number>(0);
  const [fakeFlowerCount, setFakeFlowerCount] = useState<number>(0);
  const [realFlowerCount, setRealFlowerCount] = useState<number>(0);
  const [macaronCount, setMacaronCount] = useState<number>(0);
  const [stickerPrintCount, setStickerPrintCount] = useState<number>(0);
  const [ediblePrintCount, setEdiblePrintCount] = useState<number>(0);
  const [miscItemCounts, setMiscItemCounts] = useState<{ [key: string]: number }>({
    misc1: 0,
    misc2: 0,
    misc3: 0,
    misc4: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("cakePricing");
    if (saved) {
      setConfig(JSON.parse(saved));
    }

    // Load from URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get("panSize")) setPanSize(params.get("panSize") || "");
    if (params.get("flavor")) setFlavor(params.get("flavor") || "");
    if (params.get("shape")) setShape(params.get("shape") || "");
    if (params.get("smallFondant")) setSmallFondantCount(parseInt(params.get("smallFondant") || "0"));
    if (params.get("mediumFondant")) setMediumFondantCount(parseInt(params.get("mediumFondant") || "0"));
    if (params.get("largeFondant")) setLargeFondantCount(parseInt(params.get("largeFondant") || "0"));
    if (params.get("colors")) setColorCount(parseInt(params.get("colors") || "0"));
    if (params.get("fakeFlowers")) setFakeFlowerCount(parseInt(params.get("fakeFlowers") || "0"));
    if (params.get("realFlowers")) setRealFlowerCount(parseInt(params.get("realFlowers") || "0"));
    if (params.get("macarons")) setMacaronCount(parseInt(params.get("macarons") || "0"));
    if (params.get("stickerPrints")) setStickerPrintCount(parseInt(params.get("stickerPrints") || "0"));
    if (params.get("ediblePrint")) setEdiblePrintCount(parseInt(params.get("ediblePrint") || "0"));
    
    // Load misc items from URL
    if (params.get("misc1")) setMiscItemCounts(prev => ({ ...prev, misc1: parseInt(params.get("misc1") || "0") }));
    if (params.get("misc2")) setMiscItemCounts(prev => ({ ...prev, misc2: parseInt(params.get("misc2") || "0") }));
    if (params.get("misc3")) setMiscItemCounts(prev => ({ ...prev, misc3: parseInt(params.get("misc3") || "0") }));
    if (params.get("misc4")) setMiscItemCounts(prev => ({ ...prev, misc4: parseInt(params.get("misc4") || "0") }));
  }, []);

  // Update URL params whenever selections change
  useEffect(() => {
    const params = new URLSearchParams();
    if (panSize) params.set("panSize", panSize);
    if (flavor) params.set("flavor", flavor);
    if (shape) params.set("shape", shape);
    if (smallFondantCount > 0) params.set("smallFondant", smallFondantCount.toString());
    if (mediumFondantCount > 0) params.set("mediumFondant", mediumFondantCount.toString());
    if (largeFondantCount > 0) params.set("largeFondant", largeFondantCount.toString());
    if (colorCount > 0) params.set("colors", colorCount.toString());
    if (fakeFlowerCount > 0) params.set("fakeFlowers", fakeFlowerCount.toString());
    if (realFlowerCount > 0) params.set("realFlowers", realFlowerCount.toString());
    if (macaronCount > 0) params.set("macarons", macaronCount.toString());
    if (stickerPrintCount > 0) params.set("stickerPrints", stickerPrintCount.toString());
    if (ediblePrintCount > 0) params.set("ediblePrint", ediblePrintCount.toString());
    
    // Add misc items to URL params
    if (miscItemCounts.misc1 > 0) params.set("misc1", miscItemCounts.misc1.toString());
    if (miscItemCounts.misc2 > 0) params.set("misc2", miscItemCounts.misc2.toString());
    if (miscItemCounts.misc3 > 0) params.set("misc3", miscItemCounts.misc3.toString());
    if (miscItemCounts.misc4 > 0) params.set("misc4", miscItemCounts.misc4.toString());
    
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [panSize, flavor, shape, smallFondantCount, mediumFondantCount, largeFondantCount, colorCount, fakeFlowerCount, realFlowerCount, macaronCount, stickerPrintCount, ediblePrintCount, miscItemCounts]);

  const calculateTotal = (): number => {
    let total = 0;
    
    if (panSize) total += config.panSizes[panSize]?.price || 0;
    if (flavor) total += config.flavors[flavor] || 0;
    if (shape) total += config.shapes[shape] || 0;
    
    total += smallFondantCount * config.smallFondant;
    total += mediumFondantCount * config.mediumFondant;
    total += largeFondantCount * config.largeFondant;
    total += colorCount * config.colors;
    total += fakeFlowerCount * config.fakeFlowers;
    total += realFlowerCount * config.realFlowers;
    total += macaronCount * config.macarons;
    total += stickerPrintCount * config.stickerPrints;
    total += ediblePrintCount * config.ediblePrint;
    
    // Add misc items to total
    Object.entries(miscItemCounts).forEach(([key, count]) => {
      if (config.miscItems[key]) {
        total += count * config.miscItems[key].price;
      }
    });
    
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
                      {Object.entries(config.panSizes).map(([size, data]) => (
                        <div key={size} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={size} id={`size-${size}`} />
                          <Label htmlFor={`size-${size}`} className="flex-1 cursor-pointer font-normal">
                            {size} <span className="text-muted-foreground">(${data.price} • {data.servings} servings)</span>
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
                    <Label htmlFor="smallFondant">Small Fondant Element (${config.smallFondant} each)</Label>
                    <Input
                      id="smallFondant"
                      type="number"
                      min="0"
                      value={smallFondantCount}
                      onChange={(e) => setSmallFondantCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mediumFondant">Medium Fondant Element (${config.mediumFondant} each)</Label>
                    <Input
                      id="mediumFondant"
                      type="number"
                      min="0"
                      value={mediumFondantCount}
                      onChange={(e) => setMediumFondantCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="largeFondant">Large Fondant Element (${config.largeFondant} each)</Label>
                    <Input
                      id="largeFondant"
                      type="number"
                      min="0"
                      value={largeFondantCount}
                      onChange={(e) => setLargeFondantCount(parseInt(e.target.value) || 0)}
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
                  <div className="space-y-2">
                    <Label htmlFor="stickerPrints">Sticker Prints (${config.stickerPrints} each)</Label>
                    <Input
                      id="stickerPrints"
                      type="number"
                      min="0"
                      value={stickerPrintCount}
                      onChange={(e) => setStickerPrintCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ediblePrint">Edible Print (${config.ediblePrint} each)</Label>
                    <Input
                      id="ediblePrint"
                      type="number"
                      min="0"
                      value={ediblePrintCount}
                      onChange={(e) => setEdiblePrintCount(parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Miscellaneous Items</CardTitle>
                <CardDescription>Optional additional items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(config.miscItems).map(([key, item]) => {
                    // Only show if item has a name and price > 0
                    if (!item.name || item.name === `Misc Item ${key.replace('misc', '')}` || item.price === 0) {
                      return null;
                    }
                    return (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{item.name} (${item.price} each)</Label>
                        <Input
                          id={key}
                          type="number"
                          min="0"
                          value={miscItemCounts[key] || 0}
                          onChange={(e) => setMiscItemCounts({ ...miscItemCounts, [key]: parseInt(e.target.value) || 0 })}
                          className="w-full"
                        />
                      </div>
                    );
                  })}
                </div>
                {Object.values(config.miscItems).every(item => !item.name || item.name.startsWith('Misc Item') || item.price === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No miscellaneous items configured. Add items in Settings.
                  </p>
                )}
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
                      <span className="font-medium">${config.panSizes[panSize]?.price}</span>
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
                  {smallFondantCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Small Fondant ({smallFondantCount})</span>
                      <span className="font-medium">${smallFondantCount * config.smallFondant}</span>
                    </div>
                  )}
                  {mediumFondantCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Medium Fondant ({mediumFondantCount})</span>
                      <span className="font-medium">${mediumFondantCount * config.mediumFondant}</span>
                    </div>
                  )}
                  {largeFondantCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Large Fondant ({largeFondantCount})</span>
                      <span className="font-medium">${largeFondantCount * config.largeFondant}</span>
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
                  {stickerPrintCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Sticker Prints ({stickerPrintCount})</span>
                      <span className="font-medium">${stickerPrintCount * config.stickerPrints}</span>
                    </div>
                  )}
                  {ediblePrintCount > 0 && (
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Edible Print ({ediblePrintCount})</span>
                      <span className="font-medium">${ediblePrintCount * config.ediblePrint}</span>
                    </div>
                  )}
                  {Object.entries(miscItemCounts).map(([key, count]) => {
                    if (count > 0 && config.miscItems[key] && config.miscItems[key].price > 0) {
                      return (
                        <div key={key} className="flex justify-between pb-2 border-b">
                          <span className="text-muted-foreground">{config.miscItems[key].name} ({count})</span>
                          <span className="font-medium">${count * config.miscItems[key].price}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
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
