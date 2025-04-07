
import React, { useState, useEffect } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Search, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { assetManagementApi } from "@/services/api/assetManagementApi";
import { useToast } from "@/hooks/use-toast";

const AssetTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

  // Fetch assets from API
  const { 
    data: assets = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['assets-tracking'],
    queryFn: () => assetManagementApi.getAllAssets()
  });

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load assets. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      (asset.assetCode && asset.assetCode.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (asset.name && asset.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (asset.serialNumber && asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || (asset.status && asset.status.toLowerCase() === statusFilter.toLowerCase());
    const matchesType = typeFilter === "all" || (asset.type && asset.type.toLowerCase() === typeFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Extract unique asset types for the filter dropdown
  const assetTypes = Array.from(new Set(assets.map(asset => asset.type))).filter(Boolean);

  // Extract unique statuses for the filter dropdown
  const assetStatuses = Array.from(new Set(assets.map(asset => asset.status))).filter(Boolean);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "assigned":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "available":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "booked":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "damaged":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "under repair":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Asset Tracking</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters:</span>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {assetStatuses.map(status => (
                <SelectItem key={status} value={status.toLowerCase()}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {assetTypes.map(type => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by asset ID, name or serial number..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          Export
        </Button>
      </div>
      
      <div className="rounded-md border">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.assetCode}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell className="capitalize">{asset.type}</TableCell>
                    <TableCell>{asset.serialNumber}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </TableCell>
                    <TableCell>{asset.purchaseDate || "—"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    {error ? "Error loading assets" : "No assets found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AssetTracking;
