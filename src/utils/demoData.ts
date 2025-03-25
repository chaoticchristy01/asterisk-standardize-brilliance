
// Stock data
export const stockItems = [
  { id: 1, name: "Coffee Beans (Arabica)", quantity: 45, threshold: 20, branch: "Main Branch", status: "normal" },
  { id: 2, name: "Milk (Whole)", quantity: 12, threshold: 15, branch: "Downtown Cafe", status: "low" },
  { id: 3, name: "Sugar (Brown)", quantity: 32, threshold: 10, branch: "Main Branch", status: "normal" },
  { id: 4, name: "Tea (Green)", quantity: 8, threshold: 10, branch: "Airport Location", status: "low" },
  { id: 5, name: "Chocolate Syrup", quantity: 18, threshold: 5, branch: "Mall Kiosk", status: "normal" },
  { id: 6, name: "Vanilla Extract", quantity: 3, threshold: 5, branch: "Downtown Cafe", status: "low" },
  { id: 7, name: "Caramel Sauce", quantity: 7, threshold: 5, branch: "Main Branch", status: "normal" },
  { id: 8, name: "Cinnamon Powder", quantity: 4, threshold: 3, branch: "Airport Location", status: "normal" },
];

// Employee data
export const employees = [
  { id: 1, name: "Jane Smith", role: "Barista", performance: 92, branch: "Main Branch" },
  { id: 2, name: "John Doe", role: "Shift Manager", performance: 87, branch: "Downtown Cafe" },
  { id: 3, name: "Emily Johnson", role: "Barista", performance: 78, branch: "Airport Location" },
  { id: 4, name: "Michael Brown", role: "Cashier", performance: 95, branch: "Mall Kiosk" },
  { id: 5, name: "Sarah Wilson", role: "Barista", performance: 89, branch: "Main Branch" },
];

// Customer feedback data
export const customerFeedback = [
  { 
    id: 1, 
    customer: "Alex Johnson", 
    rating: 4.5, 
    comment: "Great service, but the coffee could be a bit hotter.", 
    date: "2023-08-25", 
    branch: "Main Branch", 
    sentiment: "positive" 
  },
  { 
    id: 2, 
    customer: "Maria Garcia", 
    rating: 3, 
    comment: "Waited too long for my order. Staff was friendly though.", 
    date: "2023-08-24", 
    branch: "Downtown Cafe", 
    sentiment: "neutral" 
  },
  { 
    id: 3, 
    customer: "David Kim", 
    rating: 5, 
    comment: "Perfect experience! The new caramel latte is amazing.", 
    date: "2023-08-23", 
    branch: "Airport Location", 
    sentiment: "positive" 
  },
  { 
    id: 4, 
    customer: "Rachel Lee", 
    rating: 2, 
    comment: "Very disappointed with the cleanliness of the tables.", 
    date: "2023-08-22", 
    branch: "Mall Kiosk", 
    sentiment: "negative" 
  },
];

// Menu items data
export const menuItems = [
  { id: 1, name: "Caramel Macchiato", price: 4.95, popularity: 95, category: "Coffee" },
  { id: 2, name: "Avocado Toast", price: 8.50, popularity: 87, category: "Food" },
  { id: 3, name: "Vanilla Latte", price: 4.50, popularity: 82, category: "Coffee" },
  { id: 4, name: "Blueberry Muffin", price: 3.75, popularity: 78, category: "Bakery" },
  { id: 5, name: "Green Tea", price: 3.50, popularity: 65, category: "Tea" },
];

// Branch data
export const branches = [
  { 
    id: 1, 
    name: "Main Branch", 
    location: "123 Main Street, Downtown", 
    manager: "Robert Wilson", 
    performance: 92, 
    openDate: "2018-03-15" 
  },
  { 
    id: 2, 
    name: "Downtown Cafe", 
    location: "45 Park Avenue, City Center", 
    manager: "Amanda Johnson", 
    performance: 87, 
    openDate: "2019-07-22" 
  },
  { 
    id: 3, 
    name: "Airport Location", 
    location: "Terminal 3, International Airport", 
    manager: "Carlos Rodriguez", 
    performance: 78, 
    openDate: "2020-11-08" 
  },
  { 
    id: 4, 
    name: "Mall Kiosk", 
    location: "Central Mall, 2nd Floor", 
    manager: "Jennifer Lee", 
    performance: 83, 
    openDate: "2021-05-30" 
  },
];

// Dashboard stats
export const dashboardStats = {
  totalSales: "$56,789",
  salesTrend: { value: 12.5, isPositive: true },
  customers: "1,234",
  customersTrend: { value: 5.3, isPositive: true },
  orders: "958",
  ordersTrend: { value: 2.1, isPositive: false },
  inventory: "83%",
  inventoryTrend: { value: 3.2, isPositive: true },
};

// Sales by month for chart
export const monthlySales = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 4500 },
  { month: "Mar", sales: 5500 },
  { month: "Apr", sales: 4700 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 8000 },
  { month: "Jul", sales: 9000 },
  { month: "Aug", sales: 8500 },
  { month: "Sep", sales: 7500 },
];

// Customer satisfaction data for chart
export const satisfactionData = [
  { month: "Jan", satisfaction: 85 },
  { month: "Feb", satisfaction: 87 },
  { month: "Mar", satisfaction: 89 },
  { month: "Apr", satisfaction: 86 },
  { month: "May", satisfaction: 90 },
  { month: "Jun", satisfaction: 92 },
  { month: "Jul", satisfaction: 91 },
  { month: "Aug", satisfaction: 93 },
  { month: "Sep", satisfaction: 94 },
];

// Branch performance data
export const branchPerformance = [
  { name: "Main Branch", performance: 92, sales: 28500 },
  { name: "Downtown Cafe", performance: 87, sales: 22400 },
  { name: "Airport Location", performance: 78, sales: 18700 },
  { name: "Mall Kiosk", performance: 83, sales: 14600 },
];

// Menu popularity data
export const menuPopularity = [
  { name: "Caramel Macchiato", value: 95 },
  { name: "Avocado Toast", value: 87 },
  { name: "Vanilla Latte", value: 82 },
  { name: "Blueberry Muffin", value: 78 },
  { name: "Green Tea", value: 65 },
];
