
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, MoreVertical, Loader2 } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { employeeManagementApi, EmployeeResponse } from "@/services/api/employeeManagementApi";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Define employee data structure for the UI
type Employee = {
  id: string | number; // Updated to match the API structure which can be string or number
  name: string;
  role: string;
  phone: string;
  email: string;
  project: string;
  status: "active" | "inactive";
  joinDate: string;
};

const EmployeeManagement = () => {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch employees from API
  const { 
    data: employees = [], 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const apiEmployees = await employeeManagementApi.getAllEmployees();
        // Map API response to UI employee format
        return apiEmployees.map(emp => ({
          id: emp.id || "",
          name: emp.name,
          role: emp.role,
          phone: emp.phone,
          email: emp.email,
          project: emp.project || emp.jobTitle,
          status: emp.jobStatus.toLowerCase() === "active" ? "active" : "inactive" as "active" | "inactive",
          joinDate: new Date(emp.createdAt || Date.now()).toISOString()
        }));
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast({
          title: "Error",
          description: "Failed to load employees. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  // Delete employee mutation
  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: string | number) => employeeManagementApi.deleteEmployee(String(id)), // Convert ID to string here
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({
        title: "Success",
        description: "Employee has been deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      toast({
        title: "Error",
        description: "Failed to delete employee. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDeleteEmployee = (id: string | number) => { // Updated parameter type to accept both string and number
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployeeMutation.mutate(id);
    }
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    queryClient.invalidateQueries({ queryKey: ['employees'] });
    setIsAddEmployeeOpen(false);
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === "active").length;
  const yearlyGoalPercentage = "45%"; // Mock data, in a real app this would be calculated

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading employees...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
        <Button 
          onClick={() => setIsAddEmployeeOpen(true)}
          className="gap-1"
        >
          <Plus className="h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 py-2 px-4 rounded-full text-sm">
          Total employees: {totalEmployees}
        </Badge>
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 py-2 px-4 rounded-full text-sm">
          Active employees: {activeEmployees}
        </Badge>
        <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 py-2 px-4 rounded-full text-sm">
          Yearly goal: {yearlyGoalPercentage}
        </Badge>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone no / Email</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No employees found. Add your first employee by clicking the "Add Employee" button.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-500">{new Date(employee.joinDate).toLocaleDateString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      employee.role === "Admin" 
                        ? "bg-blue-50 text-blue-600 border-blue-200" 
                        : employee.role === "Manager" 
                          ? "bg-purple-50 text-purple-600 border-purple-200" 
                          : "bg-slate-50 text-slate-600 border-slate-200"
                    }>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{employee.phone}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.project}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "active" ? "outline" : "secondary"} className={
                      employee.status === "active" 
                        ? "bg-green-50 text-green-600 border-green-200" 
                        : "bg-red-50 text-red-600 border-red-200"
                    }>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new employee to the system.
            </DialogDescription>
          </DialogHeader>
          <AddEmployeeForm onSubmit={handleAddEmployee} onCancel={() => setIsAddEmployeeOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeManagement;
