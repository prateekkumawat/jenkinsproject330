
import React, { useState, useEffect } from "react";
import { ClipboardList, Loader2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { assetManagementApi, Asset } from "@/services/api/assetManagementApi";
import { useQuery } from "@tanstack/react-query";

const AllocatedAssetsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const { toast } = useToast();
  
  // Use React Query to fetch assigned assets
  const { 
    data: assignedAssets = [], 
    isLoading, 
    isError, 
    error,
    refetch
  } = useQuery({
    queryKey: ['assets-assigned'],
    queryFn: async () => {
      console.log("Fetching assigned assets...");
      const assets = await assetManagementApi.getAllAssets("Assigned");
      console.log("Fetched assigned assets:", assets);
      return assets;
    },
    meta: {
      onError: (err: Error) => {
        console.error('Failed to fetch assigned assets:', err);
        toast({
          title: "Error",
          description: "Failed to load assigned assets. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  // Get unique asset types for filtering
  const assetTypes = Array.from(new Set(assignedAssets.map(asset => asset.type))).filter(Boolean);
  
  // Mock departments since they're not in the asset model
  // In a real app, this would come from another API call
  const departments = ["Marketing", "Finance", "IT", "Design", "HR"];
  
  const filteredAssets = assignedAssets.filter(asset => {
    // Search term filter
    const matchesSearch = 
      asset.assetCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Asset type filter
    const matchesType = assetTypeFilter === 'all' || asset.type.toLowerCase() === assetTypeFilter.toLowerCase();
    
    // For now, department filtering is not applicable as it's not in the asset model
    // This would need to be updated if employee/department data is available
    
    return matchesSearch && matchesType;
  });

  const handleFilter = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ClipboardList className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Assigned Assets</h2>
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <Input 
            placeholder="Search by asset ID, name, or serial number" 
            className="w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <Select value={assetTypeFilter} onValueChange={setAssetTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {assetTypes.map(type => (
                <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="sm:w-auto" onClick={handleFilter}>Filter</Button>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading assigned assets...</span>
        </div>
      )}
      
      {/* Error state */}
      {isError && !isLoading && (
        <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
          <p>Failed to load assigned assets. Please try again later.</p>
          <p className="text-sm mt-1">{(error as Error)?.message}</p>
        </div>
      )}
      
      {/* Results table */}
      {!isLoading && !isError && (
        <div className="rounded-md border overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asset ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asset Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Serial Number</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{asset.assetCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{asset.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.serialNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{asset.purchaseDate || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No assigned assets found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && !isError && filteredAssets.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAssets.length}</span> of <span className="font-medium">{filteredAssets.length}</span> results
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllocatedAssetsView;
