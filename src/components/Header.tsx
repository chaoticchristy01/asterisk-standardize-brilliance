
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="mb-6 flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-asterisk-text">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="rounded-full pl-9 bg-white border-gray-200"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-asterisk-text hover:text-asterisk-primary hover:bg-asterisk-primary/10"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
