import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, UserCheck, Building, Briefcase, Calendar, User, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { employeeManagementApi } from "@/services/api/employeeManagementApi";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import MyAssets from "./MyAssets";

const MyProfile: React.FC = () => {
  const { toast } = useToast();
  const employeeId = "f6eff92d-98ac-4610-b357-91a2b9c7be40";

  const { data: employee, isLoading, error } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => employeeManagementApi.getEmployeeById(employeeId),
  });

  React.useEffect(() => {
    if (error) {
      console.error("Error fetching employee data:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <Card className="w-full h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </Card>
    );
  }

  const employeeData = employee || {
    id: employeeId,
    name: "Manish Mehta",
    username: "rwerwerw",
    jobTitle: "Software Engineer",
    email: "manish.mehta@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "USA",
    project: "HRM System",
    jobType: "Full-time",
    jobStatus: "Active",
    department: "Engineering",
    role: "Admin",
    joinedDate: "2023-01-15"
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full border-0 shadow-md overflow-hidden">
        {/* Purple header background */}
        <div className="h-40 bg-purple-500"></div>
        
        <CardContent className="p-6 -mt-20">
          <div className="flex flex-col items-center">
            {/* Profile avatar */}
            <Avatar className="h-24 w-24 border-4 border-white shadow-md bg-white">
              <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                {getInitials(employeeData.name)}
              </AvatarFallback>
            </Avatar>
            
            {/* Profile name and username */}
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-semibold">{employeeData.name}</h2>
              <p className="text-muted-foreground">{employeeData.username}</p>
            </div>
            
            {/* Action buttons */}
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="rounded-full">
                <Mail className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button size="sm" variant="secondary" className="rounded-full">
                <UserCheck className="h-4 w-4 mr-1" />
                Connect
              </Button>
            </div>

            {/* All profile information in a single section */}
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Details</h3>
                <div className="space-y-4">
                  <ProfileField 
                    icon={<User className="h-5 w-5 text-purple-500" />}
                    label="Employee ID"
                    value={employeeData.id}
                  />
                  
                  <ProfileField 
                    icon={<Briefcase className="h-5 w-5 text-purple-500" />}
                    label="Role"
                    value={employeeData.role}
                  />
                  
                  <ProfileField 
                    icon={<Building className="h-5 w-5 text-purple-500" />}
                    label="Department"
                    value={employeeData.department || "Not assigned"}
                  />
                  
                  <ProfileField 
                    icon={<Calendar className="h-5 w-5 text-purple-500" />}
                    label="Joined Date"
                    value={formatDate(employee?.createdAt || (employeeData as any).joinedDate)}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Work Information</h3>
                <div className="space-y-4">
                  <ProfileField 
                    icon={<Briefcase className="h-5 w-5 text-purple-500" />}
                    label="Job Title"
                    value={employeeData.jobTitle}
                  />
                  
                  <ProfileField 
                    icon={<Users className="h-5 w-5 text-purple-500" />}
                    label="Job Type"
                    value={employeeData.jobType}
                  />
                  
                  <ProfileField 
                    icon={<Building className="h-5 w-5 text-purple-500" />}
                    label="Current Project"
                    value={employeeData.project || "Not assigned"}
                  />
                  
                  <ProfileField 
                    icon={<div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 ml-1.5"></div>}
                    label="Job Status"
                    value={employeeData.jobStatus}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Separator className="my-4" />
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                  <ProfileField 
                    icon={<Mail className="h-5 w-5 text-purple-500" />}
                    label="Email"
                    value={employeeData.email}
                  />
                  
                  <ProfileField 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>}
                    label="Phone"
                    value={employeeData.phone}
                  />
                  
                  <div className="col-span-1 md:col-span-2">
                    <ProfileField 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>}
                      label="Address"
                      value={`${employeeData.address}${employeeData.address ? ', ' : ''}${employeeData.city}${employeeData.city ? ', ' : ''}${employeeData.state} ${employeeData.zipCode}, ${employeeData.country}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <MyAssets />
    </div>
  );
};

const ProfileField = ({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number | React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

export default MyProfile;
