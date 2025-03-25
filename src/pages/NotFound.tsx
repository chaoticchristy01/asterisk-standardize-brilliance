
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4 animate-fade-in">
        <div className="w-24 h-24 bg-asterisk-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-asterisk-primary">404</span>
        </div>
        <h1 className="text-3xl font-bold text-asterisk-text mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Button asChild className="bg-asterisk-primary hover:bg-asterisk-secondary">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
