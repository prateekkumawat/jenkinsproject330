import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import ModuleCard from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "@/components/AnimatedTransition";
import { Users, Briefcase, Box, BarChart3 } from "lucide-react";

const Index = () => {
  const modules = [
    {
      title: "HRMS",
      icon: <Users className="h-8 w-8" />,
      description: "Comprehensive human resource management solution for employee data, time tracking, and performance management.",
      features: [
        "Employee database",
        "Attendance tracking",
        "Performance reviews",
        "Compliance management",
        "Leave management"
      ]
    },
    {
      title: "Employee Management",
      icon: <Users className="h-8 w-8" />,
      description: "End-to-end employee lifecycle management from onboarding to offboarding.",
      features: [
        "Digital onboarding",
        "Employee self-service",
        "Document management",
        "Training & development",
        "Offboarding workflows"
      ]
    },
    {
      title: "Hiring",
      icon: <Briefcase className="h-8 w-8" />,
      description: "Streamline your recruitment process with comprehensive applicant tracking and interview management.",
      features: [
        "Job requisitions",
        "Applicant tracking",
        "Interview scheduling",
        "Candidate assessment",
        "Offer management"
      ]
    },
    {
      title: "Asset Management",
      icon: <Box className="h-8 w-8" />,
      description: "Track and manage all company assets with detailed records and maintenance schedules.",
      features: [
        "Asset inventory",
        "Maintenance tracking",
        "Depreciation calculation",
        "Asset assignment",
        "Reporting & analytics"
      ]
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-8 w-8" />,
      description: "Gain valuable insights with comprehensive reports and data visualization across all modules.",
      features: [
        "Custom dashboards",
        "HR analytics",
        "Recruitment metrics",
        "Asset utilization",
        "Compliance reporting"
      ]
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$39",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 50 employees",
        "HRMS & Employee Management",
        "Basic reports",
        "Email support",
        "1 admin user"
      ]
    },
    {
      name: "Professional",
      price: "$99",
      description: "Ideal for growing companies with expanded needs",
      features: [
        "Up to 200 employees",
        "All Starter features",
        "Hiring & Recruitment",
        "Asset Management",
        "Advanced analytics",
        "Priority support",
        "5 admin users"
      ],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited employees",
        "All Professional features",
        "Custom modules & integrations",
        "Dedicated account manager",
        "24/7 premium support",
        "Unlimited admin users",
        "On-premise deployment option"
      ]
    }
  ];

  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <Hero />
        
        <FeatureSection />
        
        {/* Modules */}
        <section id="modules" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-indigo-100 dark:bg-indigo-950/30 rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
                Modular Platform
              </h2>
              <h3 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white">
                Powerful Modules for Every Need
              </h3>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Each module is designed to work seamlessly on its own or as part of an integrated solution
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => (
                <ModuleCard
                  key={index}
                  title={module.title}
                  icon={module.icon}
                  description={module.description}
                  features={module.features}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing */}
        <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-950/30 rounded-full blur-[100px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
                Pricing
              </h2>
              <h3 className="mt-2 text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white">
                Find the Perfect Plan for Your Business
              </h3>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Choose a plan that works best for your company size and needs
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border transition-all duration-300 ${
                    plan.highlight 
                      ? "border-primary ring-2 ring-primary/20 dark:ring-primary/30 shadow-md" 
                      : "border-gray-200 dark:border-gray-700 hover:shadow-md"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="ml-1 text-muted-foreground">/month</span>}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
                    <ul className="space-y-3 py-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="ml-2 text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/onboarding">
                      <Button 
                        className="w-full group" 
                        variant={plan.highlight ? "default" : "outline"}
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-950/30 rounded-full blur-[100px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden sm:grid sm:grid-cols-2">
              <div className="px-6 py-12 sm:p-12 lg:p-16">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white">
                  Ready to transform your operations?
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Start your free trial today and experience the difference our platform can make for your business.
                </p>
                <div className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <Link to="/onboarding">
                    <Button size="lg" className="w-full sm:w-auto group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="hidden sm:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Team collaboration" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-gray-800 opacity-30" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Product
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Features</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Modules</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">About</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Blog</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Careers</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Resources
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Documentation</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Guides</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">API Docs</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Terms</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Compliance</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-lg font-bold">W</span>
                </div>
                <span className="font-display font-semibold text-lg">WorkSphere</span>
              </div>
              <p className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-300">
                &copy; {new Date().getFullYear()} WorkSphere. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
