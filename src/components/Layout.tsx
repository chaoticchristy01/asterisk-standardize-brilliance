
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Home,
  LineChart,
  MessageSquare,
  Utensils,
  Building2,
  Settings,
  Package,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SidebarLinkProps {
  icon: ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarLink = ({ icon, label, to, isActive }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm group transition-all duration-300",
        isActive
          ? "bg-asterisk-primary text-white"
          : "text-asterisk-text hover:bg-asterisk-primary/10"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-5 h-5 transition-all duration-300",
          isActive ? "text-white" : "text-asterisk-text group-hover:text-asterisk-primary"
        )}
      >
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { icon: <Home size={18} />, label: "Dashboard", path: "/" },
    { icon: <Package size={18} />, label: "Inventory", path: "/inventory" },
    { icon: <LineChart size={18} />, label: "Employee Performance", path: "/employees" },
    { icon: <MessageSquare size={18} />, label: "Customer Feedback", path: "/feedback" },
    { icon: <Utensils size={18} />, label: "Menu Recommendations", path: "/menu" },
    { icon: <Building2 size={18} />, label: "Branch Management", path: "/branches" },
    { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-asterisk-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "h-screen glass-card border-0 border-r border-gray-200 flex flex-col transition-all duration-300 z-20",
          sidebarCollapsed ? "w-[70px]" : "w-[250px]"
        )}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-asterisk-primary text-white h-8 w-8 rounded-md flex items-center justify-center font-bold">
              A
            </div>
            {!sidebarCollapsed && (
              <span className="font-semibold text-lg text-asterisk-primary animate-fade-in">
                Asterisk
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-asterisk-text hover:bg-asterisk-primary/10 hover:text-asterisk-primary"
          >
            {sidebarCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-none">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.path}
              icon={item.icon}
              label={item.label}
              to={item.path}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-asterisk-primary to-asterisk-accent flex items-center justify-center text-white font-medium">
            A
          </div>
          {!sidebarCollapsed && (
            <div className="animate-fade-in">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@asterisk.com</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-asterisk-background">
        <div className="container py-6 mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
