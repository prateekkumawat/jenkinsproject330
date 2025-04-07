
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");
    
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Only show toast if we're not already on the login page or OIDC redirect
      if (location.pathname !== "/tenant-login" && !location.pathname.includes("/oidc/redirect")) {
        toast.error("Please login to access this page");
      }
    }
  }, [location.pathname]);
  
  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }
  
  // If not authenticated, redirect to tenant login page with current location
  if (!isAuthenticated) {
    return <Navigate to="/tenant-login" state={{ from: location.pathname }} replace />;
  }
  
  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
