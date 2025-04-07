
import React, { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Loader2, FileText } from "lucide-react";
import { assetManagementApi, Asset } from "@/services/api/assetManagementApi";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MyAssets: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const employeeId = "f6eff92d-98ac-4610-b357-91a2b9c7be40"; // Using the default employee ID

  // Fetch employee assets from API with correct endpoint
  const { 
    data: assets = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['employee-assets', employeeId],
    queryFn: () => assetManagementApi.getAssetsByEmployeeId(employeeId),
  });

  React.useEffect(() => {
    if (error) {
      console.error("Error fetching employee assets:", error);
      toast({
        title: "Error",
        description: "Failed to load asset data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Filter assets based on search term
  const filteredAssets = assets.filter(asset => 
    asset.assetCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <Card className="w-full border-0 shadow-md mt-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">My Assigned Assets</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {filteredAssets.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Allocation Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.map((asset) => (
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
                        <TableCell>{asset.allocationDate || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10 border rounded-md">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                <h3 className="text-lg font-medium mb-2">No Assets Found</h3>
                <p className="text-muted-foreground">You don't have any assets assigned to you yet.</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MyAssets;
