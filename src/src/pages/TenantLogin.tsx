import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, Loader2 } from "lucide-react";
import AnimatedTransition from "@/components/AnimatedTransition";

const IAM_SERVICE_BASE_URL = "https://iam-service-production.up.railway.app";

interface TenantValidationResponse {
  code: number;
  message: string;
  data: {
    id: string | null;
    realm: string;
    redirectURI: string;
  };
}

const TenantLogin: React.FC = () => {
  const [tenantName, setTenantName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.tenantName) {
      setTenantName(location.state.tenantName);
    }
    
    // Check if user is already authenticated
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [location.state, navigate]);
  
  const validateTenant = async (tenantName: string): Promise<TenantValidationResponse> => {
    try {
      // Get the current domain for proper redirect handling
      const currentDomain = window.location.origin;
      console.log("Current domain:", currentDomain);
      
      const response = await fetch(`${IAM_SERVICE_BASE_URL}/iamcontroller/validate-tenant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          tenantName,
          redirectOrigin: currentDomain // Send the current origin to handle redirects properly
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to validate tenant');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Tenant validation error:", error);
      throw error;
    }
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tenantName.trim()) {
      toast.error("Please enter your tenant name");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Clear any existing tokens
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      
      // Store tenant name for the OIDC redirect handler
      localStorage.setItem("tenant_name", tenantName.toLowerCase());
      
      // Validate tenant and get the redirectURI
      const validationResponse = await validateTenant(tenantName.toLowerCase());
      
      if (validationResponse.code === 200 && validationResponse.data.redirectURI) {
        toast.success(`Redirecting to login page...`);
        
        // Log the redirect URI (for debugging)
        const redirectURI = validationResponse.data.redirectURI;
        console.log(`Redirect URI: ${redirectURI}`);
        
        // Redirect in the same tab to the Keycloak login page
        window.location.href = redirectURI;
      } else {
        throw new Error("Invalid tenant response");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please check your tenant name and try again.");
      localStorage.removeItem("tenant_name");
      setIsLoading(false);
    }
  };
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-teal-100 dark:bg-teal-900/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/30 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto mb-10">
          <Link to="/" className="flex items-center space-x-2 w-fit focus:outline-none">
            <div className="h-8 w-8 rounded-md bg-teal-500 flex items-center justify-center">
              <span className="text-white text-lg font-bold">W</span>
            </div>
            <span className="font-display font-semibold text-lg">WorkSphere</span>
          </Link>
        </div>
        
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-purple-600 dark:text-purple-400 mb-1">
              WORKSPHERE
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-center mb-8">
              Please enter your company domain.
            </p>
            
            <form onSubmit={handleLogin} className="w-full">
              <div className="flex w-full mb-4">
                <Input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="Enter your tenant name"
                  className="rounded-r-none border-r-0"
                  disabled={isLoading}
                />
                <div className="flex items-center px-3 border border-l-0 rounded-r-md bg-slate-100 dark:bg-slate-700 border-input">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">.worksphere.com</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </>
                )}
              </Button>
            </form>
            
            <p className="mt-8 text-xs text-center text-slate-500 dark:text-slate-400">
              WORKSPHERE © 2023 All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default TenantLogin;
