
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  className?: string;
  iconBackground?: string;
}

// Updated ModuleCard component with minor comment change
const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  icon, 
  description, 
  features,
  className,
  iconBackground = "bg-primary/10" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative overflow-hidden group transition-all duration-500 p-6 h-full",
        "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700",
        "hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <AnimatePresence>
          {!isHovered ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              <div className={cn(
                "p-3 rounded-lg w-fit mb-5", 
                iconBackground, 
                iconBackground.includes("primary") ? "text-primary" : ""
              )}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                {description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              <h3 className="text-xl font-semibold mb-4">{title} Features</h3>
              <ul className="space-y-2 flex-grow">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300 ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModuleCard;

