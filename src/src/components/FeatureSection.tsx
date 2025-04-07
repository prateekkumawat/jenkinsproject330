
import React, { useEffect, useRef } from "react";
import { 
  Users, 
  Briefcase, 
  Box, 
  BarChart3, 
  Shield, 
  Globe, 
  Smartphone, 
  Zap 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "HRMS & Employee Management",
    description: "Streamline your HR processes with comprehensive employee profiles, time tracking, and performance management."
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Recruitment & Hiring",
    description: "Simplify your hiring process with job postings, applicant tracking, and interview scheduling."
  },
  {
    icon: <Box className="h-8 w-8" />,
    title: "Asset Management",
    description: "Track and manage all company assets with detailed records, maintenance schedules, and assignment history."
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Analytics & Reporting",
    description: "Make data-driven decisions with customizable reports and real-time dashboards across all modules."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Compliance & Security",
    description: "Ensure regulatory compliance with built-in security features and comprehensive audit logs."
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Multi-Company Support",
    description: "Manage multiple entities with customizable access controls and consolidated reporting."
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Accessibility",
    description: "Access your portal anytime, anywhere with our responsive design and mobile app compatibility."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Self-Service Onboarding",
    description: "Clients can set up their portal independently with our intuitive onboarding process and guided setup."
  }
];

const FeatureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".feature-item");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("opacity-100");
                el.classList.remove("opacity-0", "translate-y-4");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-950/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-indigo-100 dark:bg-indigo-950/30 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
            Comprehensive Features
          </h2>
          <h3 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white">
            Everything You Need in One Platform
          </h3>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Our integrated modules work seamlessly together to provide a complete solution for your business operations.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "feature-item opacity-0 translate-y-4 transition-all duration-500",
                "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-md hover:border-primary/20 dark:hover:border-primary/20",
                "flex flex-col h-full"
              )}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-5">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
