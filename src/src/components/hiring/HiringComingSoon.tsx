
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ClipboardList, Clock, BriefcaseIcon, Users, UserPlus, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HiringComingSoon = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hiring Portal</h2>
          <p className="text-muted-foreground">
            Our hiring module is currently under development.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card className="border-2 border-dashed border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/20">
        <CardHeader className="flex flex-row items-center justify-center pb-2">
          <Construction className="h-12 w-12 text-teal-500 mr-4" />
          <div>
            <CardTitle className="text-xl text-teal-700 dark:text-teal-300">Coming Soon</CardTitle>
            <CardDescription>Our team is working hard to bring you a state-of-the-art hiring solution</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4 text-center">
          <p className="mb-6 text-muted-foreground">
            The hiring module will include the following features:
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard 
              title="Job Postings" 
              description="Create and manage job listings with custom application forms"
              icon={<ClipboardList className="h-8 w-8 text-teal-500" />}
            />
            <FeatureCard 
              title="Candidate Tracking" 
              description="Track applicants through each stage of your hiring pipeline"
              icon={<Users className="h-8 w-8 text-teal-500" />}
            />
            <FeatureCard 
              title="Interviews" 
              description="Schedule and manage interviews with team collaboration"
              icon={<UserPlus className="h-8 w-8 text-teal-500" />}
            />
          </div>
          
          <div className="mt-8 flex items-center justify-center">
            <Clock className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-muted-foreground">Estimated release: Q3 2023</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-all cursor-not-allowed opacity-70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" /> 
              Job Postings
            </CardTitle>
            <CardDescription>Create and manage job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Post open positions with detailed descriptions and requirements.</p>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all cursor-not-allowed opacity-70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> 
              Applicant Tracking
            </CardTitle>
            <CardDescription>Manage applicants efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Track candidate progress through your hiring pipeline.</p>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all cursor-not-allowed opacity-70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" /> 
              Interviews
            </CardTitle>
            <CardDescription>Schedule and manage interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Set up interviews and gather team feedback in one place.</p>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Internal component for feature cards
const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <div className="mb-3">{icon}</div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-sm text-center text-muted-foreground">{description}</p>
    </div>
  );
};

export default HiringComingSoon;
