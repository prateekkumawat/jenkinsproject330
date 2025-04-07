
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AnimatedTransition from "@/components/AnimatedTransition";

// Import the HRMS components
import EmployeeLeaves from "@/components/hrms/EmployeeLeaves";
import HRMSOverview from "@/components/hrms/HRMSOverview";
import HRMSAdmin from "@/components/hrms/HRMSAdmin";
import Timesheet from "@/components/hrms/Timesheet";
import MyProfile from "@/components/hrms/MyProfile";
import MyAssets from "@/components/hrms/MyAssets";  // Import MyAssets component
import BreadcrumbNav from "@/components/BreadcrumbNav";

const HRMSDashboard = () => {
  return (
    <AnimatedTransition>
      <div className="w-full">
        <div className="w-full">
          <div className="mx-auto">
            <Routes>
              <Route index element={<HRMSOverview />} />
              <Route 
                path="leaves" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Employee Leaves" 
                      backTo="/dashboard/hrms" 
                      backLabel="HRMS Dashboard" 
                    />
                    <EmployeeLeaves />
                  </>
                } 
              />
              <Route 
                path="timesheet" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Fill Timesheet" 
                      backTo="/dashboard/hrms" 
                      backLabel="HRMS Dashboard" 
                    />
                    <Timesheet />
                  </>
                } 
              />
              <Route 
                path="profile" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="My Profile" 
                      backTo="/dashboard/hrms" 
                      backLabel="HRMS Dashboard" 
                    />
                    <MyProfile />
                  </>
                } 
              />
              <Route 
                path="assets" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="My Assets" 
                      backTo="/dashboard/hrms" 
                      backLabel="HRMS Dashboard" 
                    />
                    <MyAssets />
                  </>
                } 
              />
              <Route 
                path="admin" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="HRMS Administration" 
                      backTo="/dashboard/hrms" 
                      backLabel="HRMS Dashboard" 
                    />
                    <HRMSAdmin />
                  </>
                } 
              />
              <Route 
                path="employees" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Employee Management" 
                      backTo="/dashboard/hrms" 
                      backLabel="HRMS Dashboard" 
                    />
                    <HRMSAdmin />
                  </>
                } 
              />
              <Route 
                path="holidays" 
                element={
                  <>
                    <BreadcrumbNav 
                      title="Company Holidays" 
                      backTo="/dashboard/hrms" 
                      backLabel="HRMS Dashboard" 
                    />
                    <HRMSAdmin />
                  </>
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default HRMSDashboard;
