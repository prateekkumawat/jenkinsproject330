
import React, { useState } from "react";
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
import { Search, FileDown, User } from "lucide-react";

// Mock data for example
const mockAllocations = [
  { 
    id: 1,
    assetId: "AST-001", 
    assetName: "Lenovo ThinkPad X1",
    assetType: "laptop",
    employeeId: "EMP-001",
    employeeName: "John Doe",
    department: "Engineering",
    allocationDate: "2023-08-15",
    dueDate: "2024-08-15"
  },
  { 
    id: 2,
    assetId: "AST-005", 
    assetName: "Logitech MX Master",
    assetType: "mouse",
    employeeId: "EMP-002",
    employeeName: "Jane Smith",
    department: "Marketing",
    allocationDate: "2023-10-20",
    dueDate: "2024-10-20"
  },
  { 
    id: 3,
    assetId: "AST-008", 
    assetName: "Dell Monitor P2419H",
    assetType: "monitor",
    employeeId: "EMP-003",
    employeeName: "Robert Johnson",
    department: "Finance",
    allocationDate: "2023-11-05",
    dueDate: "2024-11-05"
  },
  { 
    id: 4,
    assetId: "AST-010", 
    assetName: "Microsoft Ergonomic Keyboard",
    assetType: "keyboard",
    employeeId: "EMP-001",
    employeeName: "John Doe",
    department: "Engineering",
    allocationDate: "2023-12-10",
    dueDate: "2024-12-10"
  },
];

const AllocatedAssets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAllocations = mockAllocations.filter(allocation => 
    allocation.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    allocation.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    allocation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    allocation.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Allocated Assets</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by asset ID, name, employee ID or name..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Allocation Date</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAllocations.length > 0 ? (
              filteredAllocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell className="font-medium">{allocation.assetId}</TableCell>
                  <TableCell>{allocation.assetName}</TableCell>
                  <TableCell className="capitalize">{allocation.assetType}</TableCell>
                  <TableCell>{allocation.employeeId}</TableCell>
                  <TableCell>{allocation.employeeName}</TableCell>
                  <TableCell>{allocation.department}</TableCell>
                  <TableCell>{allocation.allocationDate}</TableCell>
                  <TableCell>{allocation.dueDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No allocated assets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllocatedAssets;
