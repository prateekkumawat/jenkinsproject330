
import React from "react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
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
import { Checkbox } from "@/components/ui/checkbox";
import { Laptop, Save, Loader2 } from "lucide-react";
import { assetManagementApi } from "@/services/api/assetManagementApi";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Asset name is required"),
  type: z.string().min(1, "Asset type is required"),
  status: z.string().min(1, "Status is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  assetCode: z.string().min(1, "Asset code is required"),
  retirementDate: z.string().optional(),
  isActive: z.boolean().default(true),
});

type AssetFormValues = z.infer<typeof formSchema>;

const AssetRegistration: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<AssetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      status: "Available",
      serialNumber: "",
      assetCode: "",
      retirementDate: "",
      isActive: true,
    },
  });

  const onSubmit = async (data: AssetFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Asset registration data:", data);
      
      // Ensure all required fields are present
      const assetData = {
        name: data.name,
        type: data.type,
        status: data.status,
        serialNumber: data.serialNumber,
        assetCode: data.assetCode,
        retirementDate: data.retirementDate || undefined,
        isActive: data.isActive,
      };
      
      // Submit data to API
      const result = await assetManagementApi.createAsset(assetData);
      
      toast({
        title: "Asset Registered",
        description: `${data.name} has been successfully registered.`,
      });
      
      form.reset();
    } catch (error) {
      console.error("Error registering asset:", error);
      toast({
        title: "Registration Failed",
        description: "There was a problem registering the asset. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Laptop className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Asset Registration</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Lenovo ThinkPad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
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
                      <SelectItem value="Computer">Computer</SelectItem>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="Keyboard">Keyboard</SelectItem>
                      <SelectItem value="Mouse">Mouse</SelectItem>
                      <SelectItem value="Monitor">Monitor</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Allocated">Allocated</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. SN123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="assetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. ASSET12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="retirementDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retirement Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional date when this asset will be retired
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active Asset</FormLabel>
                    <FormDescription>
                      Mark this asset as active and available for allocation
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Register Asset
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AssetRegistration;
