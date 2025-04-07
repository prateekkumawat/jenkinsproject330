
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import TenantLogin from "./pages/TenantLogin";
import OIDCRedirect from "./pages/OIDCRedirect";
import NotFound from "./pages/NotFound";
import HRMSDashboard from "./pages/HRMSDashboard";
import AssetManagement from "./pages/AssetManagement";
import HiringDashboard from "./pages/HiringDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/tenant-login" element={<TenantLogin />} />
          {/* Make sure OIDC redirect route is outside of any protected routes */}
          <Route path="/oidc/redirect" element={<OIDCRedirect />} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route path="hrms/*" element={
              <ProtectedRoute>
                <HRMSDashboard />
              </ProtectedRoute>
            } />
            <Route path="assets/*" element={
              <ProtectedRoute>
                <AssetManagement />
              </ProtectedRoute>
            } />
            <Route path="hiring/*" element={
              <ProtectedRoute>
                <HiringDashboard />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
