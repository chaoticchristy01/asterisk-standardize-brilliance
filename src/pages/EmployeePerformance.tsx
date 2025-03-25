
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import ChartCard from "@/components/dashboard/ChartCard";
import { employees } from "@/utils/demoData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line
} from "recharts";
import { Award, Medal, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const EmployeePerformance = () => {
  const [distributingBonuses, setDistributingBonuses] = useState(false);

  // Sort employees by performance for display
  const sortedEmployees = [...employees].sort((a, b) => b.performance - a.performance);
  
  // Format data for the performance chart
  const performanceData = employees.map(emp => ({
    name: emp.name.split(' ')[0], // Use first name for brevity
    performance: emp.performance,
  }));
  
  // Simulated historical data for the trends chart
  const trendData = [
    { month: "Jan", average: 76 },
    { month: "Feb", average: 78 },
    { month: "Mar", average: 74 },
    { month: "Apr", average: 79 },
    { month: "May", average: 81 },
    { month: "Jun", average: 83 },
  ];

  const handleDistributeBonuses = () => {
    setDistributingBonuses(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setDistributingBonuses(false);
      toast.success("Bonuses distributed successfully", {
        description: "Notifications have been sent to eligible employees"
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <Header
        title="Employee Performance"
        subtitle="Monitor and reward employee achievements"
      />
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Individual Performance" description="Current month">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip />
              <Bar 
                dataKey="performance" 
                fill="#5C98BA" 
                radius={[4, 4, 0, 0]} 
                name="Performance Score" 
                unit="%" 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Performance Trends" description="Last 6 months">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[70, 90]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#3E7A99" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
                name="Avg. Performance" 
                unit="%" 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      {/* Top Performers & Bonus Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-asterisk-primary mr-2" />
              <h3 className="font-medium text-asterisk-text">Top Performers</h3>
            </div>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleDistributeBonuses}
              disabled={distributingBonuses}
            >
              {distributingBonuses ? "Processing..." : "Distribute Bonuses"}
            </Button>
          </div>
          
          <div className="space-y-4">
            {sortedEmployees.slice(0, 5).map((employee, index) => (
              <div key={employee.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center">
                  <div className="mr-3 w-8 h-8 flex items-center justify-center rounded-full bg-asterisk-primary/10 text-asterisk-primary font-medium text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.role} • {employee.branch}</p>
                  </div>
                </div>
                <div className="font-semibold text-sm flex items-center">
                  {employee.performance}%
                  {index === 0 && <Medal className="ml-2 h-4 w-4 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="glass-card p-6 col-span-1">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-asterisk-primary mr-2" />
            <h3 className="font-medium text-asterisk-text">Performance Insights</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Average Performance</p>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-asterisk-primary rounded-full" style={{ width: "82%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>82% across all branches</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Highest Performing Branch</p>
              <p className="text-xs text-muted-foreground">Downtown (86% average)</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Lowest Performing Branch</p>
              <p className="text-xs text-muted-foreground">Westside (74% average)</p>
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium mb-1">Upcoming Reviews</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>• Sarah Johnson (Downtown) - Tomorrow</p>
                <p>• Mike Peterson (Eastside) - In 2 days</p>
                <p>• Linda Carter (Northside) - Next week</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePerformance;
