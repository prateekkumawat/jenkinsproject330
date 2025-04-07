
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname.includes("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Clear any existing auth tokens to ensure a fresh login
    localStorage.removeItem("auth_token");
    localStorage.removeItem("tenant_name");
    // Navigate to tenant login page
    navigate("/tenant-login", { replace: true });
  };

  // Don't show public navbar in dashboard
  if (isDashboard) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled || !isHomePage
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent",
        isMobileMenuOpen ? "bg-white dark:bg-gray-900 shadow-sm" : ""
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">W</span>
            </div>
            <span className="font-display font-semibold text-lg">WorkSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/#features" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/#modules" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
            >
              Modules
            </Link>
            <Link 
              to="/#pricing" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/#contact" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" onClick={handleLoginClick}>Log in</Button>
            <Link to="/onboarding">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-screen pb-6" : "max-h-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <Link 
            to="/#features" 
            className="block py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/#modules" 
            className="block py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            Modules
          </Link>
          <Link 
            to="/#pricing" 
            className="block py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link 
            to="/#contact" 
            className="block py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
          <div className="pt-4 space-y-3">
            <Button variant="outline" className="w-full" onClick={handleLoginClick}>Log in</Button>
            <Link to="/onboarding" className="block w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
