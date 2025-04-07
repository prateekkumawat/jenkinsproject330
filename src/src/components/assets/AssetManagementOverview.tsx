import React from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  CheckSquare, 
  ClipboardList, 
  PackageSearch, 
  SendHorizonal,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AssetManagementOverview: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
        <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
          Asset Management <span className="text-2xl">🖥️</span>
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Register, allocate, and track company assets
        </p>
      </div>
      
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link to="/dashboard/assets/registration">
          <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Box className="h-5 w-5 text-teal-500" />
                    <h3 className="font-semibold">Asset Registration</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Register new assets in the system
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/assets/allocation">
          <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Asset Allocation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allocate assets to employees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/assets/requests">
          <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <SendHorizonal className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold">Request Asset</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request new or replacement assets
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/assets/tracking">
          <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <PackageSearch className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold">Asset Tracking</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Track status and location of assets
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/assets/allocated">
          <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold">Allocated Assets</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    View all allocated assets and their details
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/assets/damaged">
          <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <h3 className="font-semibold">Lost/Damaged Assets</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Report and manage damaged or lost assets
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AssetManagementOverview;
