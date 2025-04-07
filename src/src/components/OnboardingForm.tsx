import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { tenantManagementApi } from "@/services/api/tenantManagementApi";

const companyFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companyDomain: z.string().regex(/^[a-zA-Z0-9]+$/, {
    message: "Company domain must contain only alphanumeric characters."
  }).min(2, {
    message: "Company domain must be at least 2 characters."
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  size: z.string({
    required_error: "Please select a company size.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal("")),
});

const accountFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores."
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

const modulesFormSchema = z.object({
  modules: z.array(z.string()).min(1, {
    message: "Select at least one module.",
  }),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;
type AccountFormValues = z.infer<typeof accountFormSchema>;
type ModulesFormValues = z.infer<typeof modulesFormSchema>;

interface FormDataState {
  company: {
    companyName: string;
    companyDomain: string;
    industry: string;
    size: string;
    website: string;
  };
  account: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  };
  modules: {
    modules: string[];
  };
}

const steps = [
  { id: "company", title: "Company Information" },
  { id: "account", title: "Account Setup" },
  { id: "modules", title: "Select Modules" },
  { id: "complete", title: "Complete" }
];

const industries = [
  "Information Technology",
  "Healthcare",
  "Financial Services",
  "Education",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Construction",
  "Other"
];

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees"
];

const moduleOptions = [
  { id: "hrms", label: "HRMS" },
  { id: "employee", label: "Employee Management" },
  { id: "hiring", label: "Recruitment & Hiring" },
  { id: "asset", label: "Asset Management" },
  { id: "analytics", label: "Analytics & Reporting" },
  { id: "compliance", label: "Compliance & Security" }
];

const OnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormDataState>({
    company: {
      companyName: "",
      companyDomain: "",
      industry: "",
      size: "",
      website: ""
    },
    account: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptTerms: false
    },
    modules: {
      modules: []
    }
  });

  const companyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: formData.company
  });

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: formData.account.username,
      firstName: formData.account.firstName,
      lastName: formData.account.lastName,
      email: formData.account.email,
      password: formData.account.password,
      acceptTerms: formData.account.acceptTerms as true
    }
  });

  const modulesForm = useForm<ModulesFormValues>({
    resolver: zodResolver(modulesFormSchema),
    defaultValues: formData.modules
  });

  const onCompanySubmit = (data: CompanyFormValues) => {
    setFormData((prev) => ({
      ...prev,
      company: {
        companyName: data.companyName,
        companyDomain: data.companyDomain,
        industry: data.industry,
        size: data.size,
        website: data.website || ""
      }
    }));
    setCurrentStep(1);
  };

  const onAccountSubmit = (data: AccountFormValues) => {
    setFormData((prev) => ({
      ...prev,
      account: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        acceptTerms: Boolean(data.acceptTerms)
      }
    }));
    setCurrentStep(2);
  };

  const onModulesSubmit = async (data: ModulesFormValues) => {
    setFormData((prev) => ({
      ...prev,
      modules: {
        modules: data.modules || []
      }
    }));
    
    setIsSubmitting(true);
    
    try {
      const tenantRequest = {
        name: formData.company.companyDomain.toLowerCase(),
        adminUsername: formData.account.username,
        adminPassword: formData.account.password,
        adminEmail: formData.account.email,
        companyFullName: formData.company.companyName,
        industry: formData.company.industry,
        companySize: formData.company.size,
        companyWebsite: formData.company.website || undefined
      };
      
      const response = await tenantManagementApi.createTenant(tenantRequest);
      
      localStorage.removeItem("auth_token");
      localStorage.removeItem("tenant_name");
      
      setCurrentStep(3);
      toast.success("Onboarding completed successfully!");
      console.log("Tenant created successfully:", response);
      
    } catch (error) {
      console.error("Failed to create tenant:", error);
      toast.error("Failed to complete onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToTenantLogin = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("tenant_name");
    
    navigate("/tenant-login", { 
      state: { tenantName: formData.company.companyDomain } 
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-secondary text-secondary-foreground border-gray-300 dark:border-gray-600"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="text-sm mt-2 text-center">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700" />
          <div 
            className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        {currentStep === 0 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">Company Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tell us about your company so we can personalize your experience.
            </p>
            
            <Form {...companyForm}>
              <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-6">
                <FormField
                  control={companyForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={companyForm.control}
                  name="companyDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Domain</FormLabel>
                      <FormControl>
                        <Input placeholder="acmeinc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={companyForm.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={companyForm.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={companyForm.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://your-company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit" className="group">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">Account Setup</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Create your admin account to manage your company portal.
            </p>
            
            <Form {...accountForm}>
              <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={accountForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={accountForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={accountForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe_123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={accountForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={accountForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={accountForm.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousStep}
                    className="group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back
                  </Button>
                  <Button type="submit" className="group">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">Select Modules</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Choose which modules you want to enable for your portal.
            </p>
            
            <Form {...modulesForm}>
              <form onSubmit={modulesForm.handleSubmit(onModulesSubmit)} className="space-y-6">
                <FormField
                  control={modulesForm.control}
                  name="modules"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Available Modules</FormLabel>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {moduleOptions.map((module) => (
                          <FormField
                            key={module.id}
                            control={modulesForm.control}
                            name="modules"
                            render={({ field }) => {
                              return (
                                <FormItem 
                                  key={module.id} 
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(module.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, module.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== module.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {module.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousStep}
                    className="group"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back
                  </Button>
                  <Button type="submit" className="group" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="animate-fade-in text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-3">Setup Complete!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Your portal has been successfully set up. You can now log in to your tenant domain.
            </p>
            <Button onClick={goToTenantLogin} size="lg">
              Go to Tenant Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;
