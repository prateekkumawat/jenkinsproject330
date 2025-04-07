
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, Briefcase, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll(".animate-element");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="min-h-screen pt-20 pb-16 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-100 dark:bg-blue-950/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-100 dark:bg-indigo-950/30 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Pretitle */}
          <div 
            className="animate-element opacity-0 transition-all duration-700 delay-100 translate-y-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex items-center"
          >
            Streamline Your Business Operations
          </div>

          {/* Title */}
          <h1 
            className="animate-element opacity-0 transition-all duration-700 delay-200 translate-y-4 font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-tight"
          >
            The Complete Management Platform for Modern Companies
          </h1>

          {/* Subtitle */}
          <p 
            className="animate-element opacity-0 transition-all duration-700 delay-300 translate-y-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl"
          >
            Unify your HRMS, employee management, hiring, and asset tracking in one elegant solution designed for efficiency and growth.
          </p>

          {/* CTA Buttons */}
          <div 
            className="animate-element opacity-0 transition-all duration-700 delay-400 translate-y-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
          >
            <Link to="/onboarding">
              <Button size="lg" className="px-8 py-6 text-base shadow-lg group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="outline" size="lg" className="px-8 py-6 text-base">
                Explore Features
              </Button>
            </Link>
          </div>
          
          {/* Feature icons */}
          <div 
            className="animate-element opacity-0 transition-all duration-700 delay-500 translate-y-4 grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 pt-10 max-w-3xl w-full"
          >
            {[
              { icon: <Users className="h-6 w-6" />, label: "HRMS" },
              { icon: <Briefcase className="h-6 w-6" />, label: "Hiring" },
              { icon: <Box className="h-6 w-6" />, label: "Asset Management" },
              { icon: <BarChart3 className="h-6 w-6" />, label: "Analytics" },
            ].map((item, i) => (
              <div 
                key={i}
                className={cn(
                  "flex flex-col items-center space-y-3 text-center p-4 rounded-xl",
                  "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm",
                  "border border-gray-200/50 dark:border-gray-800/50",
                  "hover:shadow-md transition-all duration-300"
                )}
              >
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
