
import React from "react";
import { Link } from "react-router-dom";
import OnboardingForm from "@/components/OnboardingForm";
import AnimatedTransition from "@/components/AnimatedTransition";

const Onboarding: React.FC = () => {
  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-teal-100 dark:bg-teal-900/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/30 rounded-full blur-[100px]" />
        </div>
        
        {/* Logo/Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <Link to="/" className="flex items-center space-x-2 w-fit focus:outline-none">
            <div className="h-8 w-8 rounded-md bg-teal-500 flex items-center justify-center">
              <span className="text-white text-lg font-bold">W</span>
            </div>
            <span className="font-display font-semibold text-lg">WorkSphere</span>
          </Link>
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold sm:text-4xl">Get Started with WorkSphere</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Complete this quick setup process to create your company portal
            </p>
          </div>
          
          <OnboardingForm />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Onboarding;
