
import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeManagement from "./EmployeeManagement";
import HolidayManagement from "./HolidayManagement";

const HRMSAdmin = () => {
  const location = useLocation();
  
  // Extract the path from the location pathname
  const currentPath = location.pathname;
  
  // Check if we're on the holidays page
  const isHolidaysPage = currentPath.includes("/holidays");
  
  console.log("Current path:", currentPath);
  console.log("Is holidays page:", isHolidaysPage);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          {isHolidaysPage ? 
            <CardTitle>Company Holidays</CardTitle> : 
            <CardTitle>Employee Management</CardTitle>
          }
        </CardHeader>
        <CardContent>
          {isHolidaysPage ? <HolidayManagement /> : <EmployeeManagement />}
        </CardContent>
      </Card>
    </div>
  );
};

export default HRMSAdmin;
