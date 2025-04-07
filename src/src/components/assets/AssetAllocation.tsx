
import React, { useState, useEffect } from "react";
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
import { ArrowRight, UserCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Asset, assetManagementApi } from "@/services/api/assetManagementApi";
import { employeeManagementApi, EmployeeResponse } from "@/services/api/employeeManagementApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  assetId: z.string().min(1, "Asset is required"),
  employeeId: z.string().min(1, "Employee is required"),
  allocationDate: z.string().min(1, "Allocation date is required"),
});

type AllocationFormValues = z.infer<typeof formSchema>;

const AssetAllocation: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { 
    data: assets = [], 
    isLoading: isLoadingAssets,
    error: assetsError
  } = useQuery({
    queryKey: ['assets'],
    queryFn: () => assetManagementApi.getAllAssets()
  });

  const {
    data: employees = [],
    isLoading: isLoadingEmployees,
    error: employeesError
  } = useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeManagementApi.getAllEmployees()
  });

  // Debug logging for assets data
  useEffect(() => {
    console.log("Assets data from API:", assets);
  }, [assets]);

  useEffect(() => {
    if (assetsError) {
      toast({
        title: "Error",
        description: "Failed to load assets. Please try again.",
        variant: "destructive",
      });
    }
    
    if (employeesError) {
      toast({
        title: "Error",
        description: "Failed to load employees. Please try again.",
        variant: "destructive",
      });
    }
  }, [assetsError, employeesError, toast]);

  // Debug logging of employees data
  useEffect(() => {
    console.log("Employees data from API:", employees);
  }, [employees]);

  const form = useForm<AllocationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: "",
      employeeId: "",
      allocationDate: new Date().toISOString().split('T')[0],
    },
  });

  const allocateMutation = useMutation({
    mutationFn: (values: AllocationFormValues) => {
      return assetManagementApi.allocateAsset(
        values.assetId,
        {
          employeeId: values.employeeId,
          allocationDate: values.allocationDate
        }
      );
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Asset successfully allocated",
      });
      form.reset({
        assetId: "",
        employeeId: "",
        allocationDate: new Date().toISOString().split('T')[0],
      });
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to allocate asset",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: AllocationFormValues) => {
    allocateMutation.mutate(data);
  };

  // Filter only available assets - looking specifically for "Available" status
  const availableAssets = assets.filter(asset => 
    asset.status === "Available" || asset.status === "available"
  );
  
  console.log("Available assets:", availableAssets);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <UserCheck className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Asset Allocation</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingAssets ? "Loading assets..." : "Select an asset"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assets.length > 0 ? (
                        assets.map((asset) => (
                          <SelectItem 
                            key={asset.id ? String(asset.id) : asset.assetCode} 
                            value={asset.id ? String(asset.id) : asset.assetCode}
                          >
                            {asset.assetCode} - {asset.name} ({asset.type})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-assets" disabled>
                          No assets available
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
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
              name="allocationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allocation Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={allocateMutation.isPending || isLoadingAssets || isLoadingEmployees}>
            {allocateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Allocating...
              </>
            ) : (
              <>
                <ArrowRight className="mr-2 h-4 w-4" />
                Allocate Asset
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AssetAllocation;
