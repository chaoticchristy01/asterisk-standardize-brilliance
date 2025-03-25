
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Inventory from "@/pages/Inventory";
import NotFound from "./pages/NotFound";

// Placeholder components for the routes we haven't implemented yet
const EmployeePerformance = () => <div className="p-8">Employee Performance Page</div>;
const CustomerFeedback = () => <div className="p-8">Customer Feedback Page</div>;
const MenuRecommendations = () => <div className="p-8">Menu Recommendations Page</div>;
const BranchManagement = () => <div className="p-8">Branch Management Page</div>;
const Settings = () => <div className="p-8">Settings Page</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<EmployeePerformance />} />
            <Route path="/feedback" element={<CustomerFeedback />} />
            <Route path="/menu" element={<MenuRecommendations />} />
            <Route path="/branches" element={<BranchManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
