
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PackageSearch } from "lucide-react";

const formSchema = z.object({
  assetId: z.string().min(1, "Asset ID is required"),
  assetType: z.string().min(1, "Asset type is required"),
});

type TrackingFormValues = z.infer<typeof formSchema>;

const AssetTrackingForm: React.FC = () => {
  const form = useForm<TrackingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: "",
      assetType: "",
    },
  });

  const onSubmit = (data: TrackingFormValues) => {
    console.log("Asset tracking data:", data);
    // Handle asset tracking logic here
  };

  // Mock data for the example
  const allAssets = [
    { id: "AST-001", name: "Lenovo ThinkPad X1", type: "laptop", status: "Assigned", location: "Marketing Department" },
    { id: "AST-002", name: "Dell XPS 13", type: "laptop", status: "Unassigned", location: "IT Storage" },
    { id: "AST-003", name: "HP Keyboard KB-101", type: "keyboard", status: "Assigned", location: "Finance Department" },
    { id: "AST-004", name: "Apple MacBook Pro", type: "laptop", status: "Under Repair", location: "Service Center" },
    { id: "AST-005", name: "Logitech MX Master", type: "mouse", status: "Assigned", location: "Design Department" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <PackageSearch className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Asset Tracking</h2>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an asset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allAssets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.id} - {asset.name}
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
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="keyboard">Keyboard</SelectItem>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="monitor">Monitor</SelectItem>
                      <SelectItem value="all">All Types</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit">
            <PackageSearch className="mr-2 h-4 w-4" />
            Track Asset
          </Button>
        </form>
      </Form>
      
      {/* Results section - would be dynamically populated based on search */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Asset Status</h3>
        <div className="rounded-md border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asset ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {allAssets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{asset.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      asset.status === 'Assigned' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : asset.status === 'Unassigned' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : asset.status === 'Under Repair'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetTrackingForm;
