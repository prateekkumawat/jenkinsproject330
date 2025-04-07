
import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimatedTransition from "@/components/AnimatedTransition";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import HiringComingSoon from "@/components/hiring/HiringComingSoon";

const HiringDashboard = () => {
  return (
    <AnimatedTransition>
      <div className="w-full">
        <div className="w-full">
          <div className="mx-auto">
            <Routes>
              <Route 
                index 
                element={<HiringComingSoon />} 
              />
            </Routes>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default HiringDashboard;
