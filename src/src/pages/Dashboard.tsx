import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Box, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import AnimatedTransition from "@/components/AnimatedTransition";

const ModuleCard = ({ title, icon, description, path }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="bg-white dark:bg-slate-800 hover:shadow-md transition-all cursor-pointer border border-slate-200 dark:border-slate-700 p-6 flex flex-col h-full"
      onClick={() => navigate(path)}
    >
      <div className="p-2 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm flex-grow">{description}</p>
      <div className="flex justify-end mt-4">
        <Button variant="ghost" size="sm" className="text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20">
          Access
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

const DashboardOverview = () => {
  // In a real app, these would come from the onboarding process selection
  const [selectedModules, setSelectedModules] = useState([
    { id: "hrms", title: "HRMS", icon: <Users className="h-5 w-5" />, description: "Manage employee information, leaves, attendance and more", path: "/dashboard/hrms" },
    { id: "hiring", title: "Hiring", icon: <Briefcase className="h-5 w-5" />, description: "Post jobs, manage applications and hiring process", path: "/dashboard/hiring" },
    { id: "asset", title: "Asset Management", icon: <Box className="h-5 w-5" />, description: "Track company assets and their allocation", path: "/dashboard/assets" }
  ]);

  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-bold">Welcome back, John</h2>
        <p className="text-muted-foreground">Access your company modules</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selectedModules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            icon={module.icon}
            description={module.description}
            path={module.path}
          />
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { title: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, path: "/dashboard" },
    { title: "HRMS", icon: <Users className="h-5 w-5" />, path: "/dashboard/hrms" },
    { title: "Hiring", icon: <Briefcase className="h-5 w-5" />, path: "/dashboard/hiring" },
    { title: "Asset Management", icon: <Box className="h-5 w-5" />, path: "/dashboard/assets" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  // Check if we're on the exact dashboard path
  const isMainDashboard = location.pathname === '/dashboard';

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Mobile Sidebar Toggle - Only show if not on main dashboard */}
      {!isMainDashboard && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-slate-800 shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Sidebar - Only show if NOT on main dashboard */}
      {!isMainDashboard && (
        <aside 
          className={`fixed md:relative inset-y-0 left-0 h-full md:h-screen w-64 bg-white dark:bg-slate-800 shadow-sm z-40 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } flex flex-col`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 pb-4">
              <div className="h-8 w-8 rounded-md bg-teal-500 flex items-center justify-center">
                <span className="text-white text-lg font-bold">W</span>
              </div>
              <span className="font-display font-semibold text-lg">WorkSphere</span>
            </div>
            
            <Separator className="mb-4" />
            
            {/* Back to Dashboard Button */}
            <Button 
              variant="outline" 
              className="mb-4 flex items-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
            
            {/* Navigation */}
            <nav className="space-y-1 flex-1">
              {navigationItems.filter(item => item.path !== '/dashboard').map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActiveRoute(item.path)
                      ? "bg-teal-50 text-teal-600 font-medium dark:bg-teal-900/20 dark:text-teal-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
            
            <Separator className="my-4" />
            
            {/* User */}
            <div className="mt-auto">
              <div className="flex items-center p-2 mt-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@acme.com</p>
                </div>
                <Button variant="ghost" size="icon" className="relative ml-2">
                  <Bell size={18} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-teal-500 rounded-full"></span>
                </Button>
              </div>
            </div>
          </div>
        </aside>
      )}
      
      {/* Main content - Full width on main dashboard */}
      <main className={`relative flex-1 overflow-y-auto pb-10 ${isMainDashboard ? 'w-full' : ''}`}>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <AnimatedTransition>
            {isMainDashboard ? (
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
              </Routes>
            ) : (
              <Outlet />
            )}
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
