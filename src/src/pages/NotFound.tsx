
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "@/components/AnimatedTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-teal-100 dark:bg-teal-900/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/30 rounded-full blur-[100px]" />
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12 max-w-md w-full text-center">
          <h1 className="text-7xl font-display font-bold text-slate-900 dark:text-white mb-4">404</h1>
          <p className="text-2xl text-slate-600 dark:text-slate-300 mb-6">
            Oops! Page not found
          </p>
          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button size="lg" className="group bg-teal-500 hover:bg-teal-600">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default NotFound;
