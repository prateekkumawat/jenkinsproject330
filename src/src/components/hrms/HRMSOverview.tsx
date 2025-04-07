import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  Calendar, 
  FileText, 
  Users, 
  ClipboardList,
  CircleDollarSign,
  UserCog,
  ScrollText,
  Briefcase,
  Building,
  Lock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const HRMSOverview: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <div className="space-y-4">
      {/* Hero section with admin toggle */}
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
              Hello John Doe <span className="text-2xl">👋</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage your HR resources from here
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Label htmlFor="admin-mode" className="text-sm font-medium">
              {isAdmin ? "Admin View" : "Employee View"}
            </Label>
            <Switch 
              id="admin-mode" 
              checked={isAdmin} 
              onCheckedChange={setIsAdmin}
            />
          </div>
        </div>
      </div>
      
      {/* Render different card sets based on the user mode */}
      {isAdmin ? <AdminCards /> : <EmployeeCards />}
    </div>
  );
};

const AdminCards = () => (
  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {/* Employee Management */}
    <Link to="/dashboard/hrms/admin?tab=employees">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Employee Management</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add, edit or remove employees
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Company Holidays */}
    <Link to="/dashboard/hrms/admin?tab=holidays">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Company Holidays</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage company holidays
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Manager Assignments */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserCog className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold">Manager Assignments</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Assign managers to employees
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Publish Notices */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-teal-500" />
                <h3 className="font-semibold">Publish Notices</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Create and publish company notices
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Leave Management */}
    <Link to="/dashboard/hrms/leaves">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Leave Management</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage employee leave requests
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Department Management */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Department Management</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage company departments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Access Control */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold">Access Control</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage employee access levels
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* HRMS Settings */}
    <Link to="/dashboard/hrms/admin">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold">HRMS Administration</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Configure HRMS settings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  </div>
);

const EmployeeCards = () => (
  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {/* View Notices */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-teal-500" />
                <h3 className="font-semibold">View Notices</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View all company notices
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Apply for Leave */}
    <Link to="/dashboard/hrms/leaves">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Apply for Leave</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Request time off work
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Fill Timesheet */}
    <Link to="/dashboard/hrms/timesheet">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Fill Timesheet</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Track your work hours
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* View Holidays */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">View Holidays</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                See upcoming company holidays
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* Salary Slip */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold">Salary Slip</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View your salary details
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* My Profile */}
    <Link to="/dashboard/hrms/profile">
      <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-100 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserCog className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-purple-800 dark:text-purple-300">My Profile</h3>
              </div>
              <p className="text-sm text-purple-700/70 dark:text-purple-300/70">
                View and update your profile
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* My Team */}
    <Link to="#">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">My Team</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View your team members
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    {/* My Assets */}
    <Link to="/dashboard/hrms/assets">
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-teal-500" />
                <h3 className="font-semibold">My Assets</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View your allocated assets
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  </div>
);

export default HRMSOverview;
