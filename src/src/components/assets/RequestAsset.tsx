
import React from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { MailPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { assetManagementApi } from "@/services/api/assetManagementApi";
import { employeeManagementApi } from "@/services/api/employeeManagementApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  assetType: z.string().min(1, "Asset type is required"),
  reason: z.string().min(1, "Reason is required"),
  requestedDate: z.string().min(1, "Requested date is required"),
  comment: z.string().optional(),
});

type RequestFormValues = z.infer<typeof formSchema>;

const RequestAsset: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: employees = [],
    isLoading: isLoadingEmployees,
    error: employeesError
  } = useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeManagementApi.getAllEmployees()
  });

  // Log employees for debugging
  React.useEffect(() => {
    console.log("Employees data in RequestAsset:", employees);
    
    if (employeesError) {
      toast({
        title: "Error",
        description: "Failed to load employees. Please try again.",
        variant: "destructive",
      });
    }
  }, [employees, employeesError, toast]);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      assetType: "",
      reason: "",
      requestedDate: new Date().toISOString().split('T')[0],
      comment: "",
    },
  });

  const requestMutation = useMutation({
    mutationFn: (data: RequestFormValues) => {
      return assetManagementApi.createRequest({
        employeeId: data.employeeId,
        assetType: data.assetType,
        reason: data.reason,
        requestedDate: data.requestedDate,
        comments: data.comment
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Asset request submitted successfully",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['assetRequests'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit asset request",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: RequestFormValues) => {
    console.log("Submitting asset request:", data);
    requestMutation.mutate(data);
  };

  const assetTypes = [
    { value: "laptop", label: "Laptop" },
    { value: "keyboard", label: "Keyboard" },
    { value: "mouse", label: "Mouse" },
    { value: "monitor", label: "Monitor" },
    { value: "headset", label: "Headset" },
    { value: "phone", label: "Phone" },
    { value: "tablet", label: "Tablet" },
    { value: "desk", label: "Desk" },
    { value: "chair", label: "Chair" }
  ];

  const reasons = [
    { value: "newEmployee", label: "New Employee" },
    { value: "replacement", label: "Replacement" },
    { value: "damagedAsset", label: "Damaged Asset" },
    { value: "additionalRequirement", label: "Additional Requirement" },
    { value: "upgrade", label: "Upgrade" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MailPlus className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Request Asset Allocation</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingEmployees ? "Loading employees..." : "Select an employee"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.length > 0 ? (
                        employees.map((employee) => (
                          <SelectItem 
                            key={employee.employeeId} 
                            value={employee.employeeId}
                          >
                            {employee.name} - {employee.jobTitle || 'No Job Title'}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-employees" disabled>
                          No employees available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requestedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional comments about your request"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={requestMutation.isPending || isLoadingEmployees}>
            {requestMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RequestAsset;
