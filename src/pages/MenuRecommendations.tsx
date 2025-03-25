
import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import ChartCard from "@/components/dashboard/ChartCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Utensils, CloudRain, Award, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

// Sample menu item data
const MENU_ITEMS = [
  { id: 1, name: "Classic Cheeseburger", category: "Main", popularity: 92, profit: 5.20, sales: 158 },
  { id: 2, name: "Chicken Alfredo Pasta", category: "Main", popularity: 85, profit: 6.50, sales: 120 },
  { id: 3, name: "Caesar Salad", category: "Starter", popularity: 78, profit: 4.70, sales: 95 },
  { id: 4, name: "Margherita Pizza", category: "Main", popularity: 90, profit: 7.10, sales: 142 },
  { id: 5, name: "Chocolate Brownie", category: "Dessert", popularity: 86, profit: 3.90, sales: 103 },
  { id: 6, name: "Vanilla Milkshake", category: "Beverage", popularity: 75, profit: 2.80, sales: 87 },
  { id: 7, name: "Garlic Bread", category: "Side", popularity: 82, profit: 2.10, sales: 110 },
  { id: 8, name: "Iced Coffee", category: "Beverage", popularity: 79, profit: 1.95, sales: 93 },
];

// Weather-based recommendation data
const WEATHER_RECOMMENDATIONS = [
  { weather: "Hot", items: ["Iced Coffee", "Fresh Lemonade", "Fruit Salad", "Ice Cream Sundae"] },
  { weather: "Cold", items: ["Hot Chocolate", "Soup of the Day", "Warm Apple Pie", "Spiced Latte"] },
  { weather: "Rainy", items: ["Hot Tea", "Comfort Food Bundle", "Warm Cookies", "Hot Soup"] },
  { weather: "Sunny", items: ["Iced Tea", "Summer Salad", "Fruit Smoothie", "Chilled Desserts"] },
];

// Trend data
const TREND_DATA = [
  { name: "Classic Cheeseburger", last: 142, current: 158 },
  { name: "Chicken Alfredo Pasta", last: 105, current: 120 },
  { name: "Caesar Salad", last: 98, current: 95 },
  { name: "Margherita Pizza", last: 125, current: 142 },
  { name: "Chocolate Brownie", last: 95, current: 103 },
];

const MenuRecommendations = () => {
  const [currentWeather, setCurrentWeather] = useState("Sunny");
  const [liveRecommendationsActive, setLiveRecommendationsActive] = useState(false);
  
  // Get weather recommendations based on current weather
  const weatherRecs = WEATHER_RECOMMENDATIONS.find(w => w.weather === currentWeather)?.items || [];
  
  // Top 5 most popular items
  const topItems = [...MENU_ITEMS].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  
  const toggleLiveRecommendations = () => {
    setLiveRecommendationsActive(!liveRecommendationsActive);
    
    if (!liveRecommendationsActive) {
      toast.success("Live Recommendations Activated", {
        description: "Display screens will now show real-time recommendations"
      });
    } else {
      toast.info("Live Recommendations Deactivated", {
        description: "Display screens will return to standard menu"
      });
    }
  };
  
  const updateWeather = (weather: string) => {
    setCurrentWeather(weather);
    toast.success(`Weather updated to ${weather}`, {
      description: "Recommendations have been refreshed"
    });
  };

  return (
    <div className="space-y-8">
      <Header
        title="Menu Recommendations"
        subtitle="Optimize your menu based on data and trends"
      />
      
      {/* Live recommendation control */}
      <Card className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-lg text-asterisk-text">Live Recommendation Feed</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Activate to display recommendations on cashier and customer screens
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className={`flex items-center gap-2 ${liveRecommendationsActive ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={toggleLiveRecommendations}
            >
              <Zap size={18} />
              <span>{liveRecommendationsActive ? 'Active' : 'Activate'} Live Recommendations</span>
            </Button>
          </div>
        </div>
        
        {liveRecommendationsActive && (
          <div className="mt-6 p-4 border border-green-200 bg-green-50 rounded-md">
            <h4 className="font-medium text-green-700 flex items-center">
              <Utensils className="mr-2 h-4 w-4" /> 
              Currently Displaying on Screens
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {topItems.slice(0, 4).map((item, i) => (
                <div key={item.id} className="bg-white p-3 rounded shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="bg-asterisk-primary/10 text-asterisk-primary font-medium text-xs px-2 py-1 rounded">
                      #{i+1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
      
      {/* Weather based recommendations */}
      <Card className="glass-card p-6">
        <div className="flex items-center mb-4">
          <CloudRain className="w-5 h-5 text-asterisk-secondary mr-2" />
          <h3 className="font-medium text-asterisk-text">Weather-Based Recommendations</h3>
        </div>
        
        <div className="mb-4">
          <p className="text-sm mb-2">Current Weather:</p>
          <div className="flex flex-wrap gap-2">
            {["Sunny", "Rainy", "Hot", "Cold"].map(weather => (
              <Button
                key={weather}
                variant={currentWeather === weather ? "default" : "outline"}
                size="sm"
                onClick={() => updateWeather(weather)}
              >
                {weather}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-sm mb-2">Recommended Items for {currentWeather} Weather:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {weatherRecs.map((item, i) => (
              <div key={i} className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Alert className="mt-4">
          <AlertDescription className="text-sm">
            Promote these items by placing them prominently on digital displays and having staff recommend them to customers.
          </AlertDescription>
        </Alert>
      </Card>
      
      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Most Popular Items" description="Based on customer orders">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topItems}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                width={150}
              />
              <Tooltip />
              <Bar 
                dataKey="popularity" 
                fill="#5C98BA" 
                radius={[0, 4, 4, 0]} 
                name="Popularity Score" 
                unit="%" 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Sales Trends" description="Current vs. last month">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={TREND_DATA}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="last" fill="#82B8D9" name="Last Month" />
              <Bar dataKey="current" fill="#3E7A99" name="Current Month" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      {/* Detailed item analysis */}
      <Card className="glass-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-asterisk-primary mr-2" />
              <h3 className="font-medium text-asterisk-text">Menu Performance Analysis</h3>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Item Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Popularity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Sales</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Profit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-asterisk-text">Action</th>
                </tr>
              </thead>
              <tbody>
                {MENU_ITEMS.map(item => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-sm">{item.category}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-asterisk-primary h-2.5 rounded-full" 
                            style={{ width: `${item.popularity}%` }}
                          ></div>
                        </div>
                        <span>{item.popularity}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{item.sales} orders</td>
                    <td className="py-3 px-4 text-sm">${item.profit.toFixed(2)}/unit</td>
                    <td className="py-3 px-4 text-sm">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MenuRecommendations;
