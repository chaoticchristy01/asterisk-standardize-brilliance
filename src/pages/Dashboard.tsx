
import Header from "@/components/Header";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import { ShoppingBag, Users, TrendingUp, Package, AlertTriangle, Award, ThumbsUp } from "lucide-react";
import { dashboardStats, monthlySales, satisfactionData, branchPerformance, stockItems, employees } from "@/utils/demoData";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  // Filter low stock items
  const lowStockItems = stockItems.filter(item => item.status === "low");
  
  // Top performing employees
  const topEmployees = [...employees].sort((a, b) => b.performance - a.performance).slice(0, 3);
  
  // Colors for the pie chart
  const BRANCH_COLORS = ["#5C98BA", "#3E7A99", "#82B8D9", "#C0D6E4"];
  
  return (
    <div className="space-y-8">
      <Header 
        title="Dashboard" 
        subtitle="Welcome to Asterisk - Your Franchise Standardization System"
      />
      
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value={dashboardStats.totalSales} 
          icon={<ShoppingBag size={20} />} 
          trend={dashboardStats.salesTrend}
        />
        <StatCard 
          title="Total Customers" 
          value={dashboardStats.customers} 
          icon={<Users size={20} />} 
          trend={dashboardStats.customersTrend}
        />
        <StatCard 
          title="Daily Orders" 
          value={dashboardStats.orders} 
          icon={<TrendingUp size={20} />} 
          trend={dashboardStats.ordersTrend}
        />
        <StatCard 
          title="Inventory Level" 
          value={dashboardStats.inventory} 
          icon={<Package size={20} />} 
          trend={dashboardStats.inventoryTrend}
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Sales" description="Last 9 months performance">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={monthlySales}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5C98BA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#5C98BA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#5C98BA" 
                fillOpacity={1} 
                fill="url(#salesGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Customer Satisfaction" description="Percentage by month">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={satisfactionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip />
              <Bar dataKey="satisfaction" fill="#82B8D9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      {/* Quick Summaries Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <Card className="glass-card p-6 col-span-1">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <h3 className="font-medium text-asterisk-text">Low Stock Alerts</h3>
          </div>
          <div className="space-y-4">
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">No low stock alerts.</p>
            ) : (
              lowStockItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.branch}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-500">{item.quantity} left</p>
                    <p className="text-xs text-muted-foreground">Threshold: {item.threshold}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
        
        {/* Top Performers */}
        <Card className="glass-card p-6 col-span-1">
          <div className="flex items-center mb-4">
            <Award className="w-5 h-5 text-asterisk-primary mr-2" />
            <h3 className="font-medium text-asterisk-text">Top Performers</h3>
          </div>
          <div className="space-y-4">
            {topEmployees.map((employee, index) => (
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
                <div className="font-semibold text-sm">{employee.performance}%</div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Branch Performance */}
        <Card className="glass-card p-6 col-span-1">
          <div className="flex items-center mb-4">
            <ThumbsUp className="w-5 h-5 text-asterisk-secondary mr-2" />
            <h3 className="font-medium text-asterisk-text">Branch Performance</h3>
          </div>
          <div className="flex justify-center mt-2">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={branchPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="sales"
                  label={({ name }) => name}
                  labelLine={false}
                >
                  {branchPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BRANCH_COLORS[index % BRANCH_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
