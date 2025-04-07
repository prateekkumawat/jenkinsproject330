
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Button } from "@/components/ui/button";

const IAM_SERVICE_BASE_URL = "https://iam-service-production.up.railway.app";

const OIDCRedirect: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string>("");
  const [params, setParams] = useState<URLSearchParams | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Capture URL parameters when component loads
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setParams(urlParams);
    
    const authCode = urlParams.get("code");
    const sessionState = urlParams.get("session_state");
    
    if (authCode) {
      setDebug(`Received code: ${authCode.substring(0, 15)}... and session_state: ${sessionState?.substring(0, 15)}...`);
    } else {
      setDebug("No code parameter found in URL");
    }
  }, [location.search]);

  useEffect(() => {
    const validateAuthCode = async () => {
      try {
        if (!params) return;
        
        // Parse the URL parameters to get the code
        const authCode = params.get("code");
        const sessionState = params.get("session_state");
        
        if (!authCode) {
          throw new Error("Authorization code not found in the URL");
        }
        
        // Get tenant name from localStorage (set during the login process)
        const tenantName = localStorage.getItem("tenant_name");
        
        if (!tenantName) {
          throw new Error("Tenant name not found. Please try logging in again.");
        }
        
        console.log("Processing auth code for tenant:", tenantName);
        console.log("Auth code:", authCode);
        console.log("Session state:", sessionState);
        
        // Call the backend to validate the auth code
        const response = await fetch(`${IAM_SERVICE_BASE_URL}/iamcontroller/validate-authcode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify({ 
            tenantName,
            authCode
          }),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            errorData = { message: errorText };
          }
          
          throw new Error(errorData?.message || `Failed to validate auth code: ${response.status}`);
        }
        
        const authData = await response.json();
        console.log("Auth validation successful:", authData);
        
        // Store tokens in localStorage
        localStorage.setItem("auth_token", authData.access_token);
        localStorage.setItem("refresh_token", authData.refresh_token);
        
        // Success! Redirect to dashboard
        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Auth code validation error:", error);
        setError((error as Error).message || "Authentication failed. Please try again.");
        toast.error((error as Error).message || "Authentication failed. Please try again.");
        
        // Clear any tokens that might exist
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
      } finally {
        setIsProcessing(false);
      }
    };

    // Add a longer delay to ensure the component is fully mounted and network is ready
    const timer = setTimeout(() => {
      validateAuthCode();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params, navigate]);

  const handleManualLogin = () => {
    navigate("/tenant-login", { replace: true });
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          {isProcessing ? (
            <>
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Processing Login</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Please wait while we complete your authentication...
              </p>
              {debug && (
                <div className="mt-4 p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs text-left overflow-hidden">
                  <code>{debug}</code>
                </div>
              )}
            </>
          ) : error ? (
            <>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
                Authentication Failed
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{error}</p>
              
              <div className="mt-2 mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                  There was an SSL connection issue. Please try again.
                </p>
                <Button onClick={handleManualLogin} className="w-full">
                  Return to Login
                </Button>
              </div>
              
              {debug && (
                <div className="mt-4 p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs text-left overflow-hidden">
                  <code>{debug}</code>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 dark:text-green-400 text-2xl">✓</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">
                Login Successful
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Redirecting to dashboard...
              </p>
            </>
          )}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default OIDCRedirect;
