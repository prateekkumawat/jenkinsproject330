import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon,
  List
} from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { employeeManagementApi, LeaveRequest, LeaveResponse } from "@/services/api/employeeManagementApi";

const EmployeeLeaves: React.FC = () => {
  const [leaveDates, setLeaveDates] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [leaveType, setLeaveType] = useState<string>("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState<LeaveResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Default employee ID in UUID format
  const employeeId = "f6eff92d-98ac-4610-b357-91a2b9c7be40"; 

  // Fetch leave history on component mount
  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  const fetchLeaveHistory = async () => {
    setIsLoading(true);
    try {
      const leaves = await employeeManagementApi.getEmployeeLeaveRequests(employeeId);
      // Sort leaves by start date (newest first)
      const sortedLeaves = leaves.sort((a, b) => 
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
      setLeaveHistory(sortedLeaves);
    } catch (error) {
      console.error("Error fetching leave history:", error);
      toast({
        title: "Error",
        description: "Failed to load leave history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!leaveType) {
      toast({
        title: "Error",
        description: "Please select a leave type",
        variant: "destructive",
      });
      return;
    }

    if (!leaveDates.from || !leaveDates.to) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

    if (!reason) {
      toast({
        title: "Error",
        description: "Please provide a reason for your leave",
        variant: "destructive",
      });
      return;
    }

    // Calculate total days (including weekends for simplicity)
    const totalDays = differenceInDays(leaveDates.to, leaveDates.from) + 1;

    const leaveRequest: LeaveRequest = {
      leaveType,
      startDate: format(leaveDates.from, "yyyy-MM-dd"),
      endDate: format(leaveDates.to, "yyyy-MM-dd"),
      totalDays,
      reason
    };

    setIsSubmitting(true);

    try {
      const response = await employeeManagementApi.submitLeaveRequest(employeeId, leaveRequest);
      
      // Specific success toast with details
      toast({
        title: "Leave Request Submitted",
        description: `${leaveType} from ${leaveRequest.startDate} to ${leaveRequest.endDate} (${totalDays} days)`,
      });
      
      // Reset form after successful submission
      setLeaveDates({ from: undefined, to: undefined });
      setLeaveType("");
      setReason("");
      
      // Refresh leave history after successful submission
      await fetchLeaveHistory();
    } catch (error) {
      console.error("Error submitting leave request:", error);
      
      // More detailed error toast
      toast({
        title: "Leave Request Failed",
        description: error instanceof Error ? error.message : "Failed to submit leave request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to get status badge variant
  const getStatusVariant = (status: string | undefined) => {
    // If status is undefined or null, default to pending (warning)
    if (!status) {
      return 'warning';
    }
    
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
      default:
        return 'warning';
    }
  };

  // Format date for display with safety check
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString || 'N/A';
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Leaves Management</h1>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <span className="text-red-500 mr-1">*</span> Leave Type
            </label>
            <Select 
              value={leaveType} 
              onValueChange={setLeaveType}
            >
              <SelectTrigger className="w-full border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="maternity">Maternity Leave</SelectItem>
                <SelectItem value="paternity">Paternity Leave</SelectItem>
                <SelectItem value="bereavement">Bereavement Leave</SelectItem>
                <SelectItem value="unpaid">Unpaid Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <span className="text-red-500 mr-1">*</span> Leave Dates
            </label>
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-slate-200 dark:border-slate-700",
                        !leaveDates.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {leaveDates.from ? (
                        format(leaveDates.from, "PPP")
                      ) : (
                        <span>Start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={leaveDates.from}
                      onSelect={(date) => setLeaveDates(prev => ({ ...prev, from: date }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-slate-200 dark:border-slate-700",
                        !leaveDates.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {leaveDates.to ? (
                        format(leaveDates.to, "PPP")
                      ) : (
                        <span>End date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={leaveDates.to}
                      onSelect={(date) => setLeaveDates(prev => ({ ...prev, to: date }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <span className="text-red-500 mr-1">*</span> Reason
            </label>
            <Textarea 
              placeholder="Enter leave reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] border-slate-200 dark:border-slate-700"
            />
          </div>
          
          <Button 
            className="w-full bg-teal-500 hover:bg-teal-600"
            onClick={handleSubmit}
            disabled={isSubmitting}
            type="button"
          >
            {isSubmitting ? "Submitting..." : "Apply for Leave"}
          </Button>
        </div>
      </div>
      
      {/* Leave History Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <List className="mr-2 h-5 w-5" />
            Leave History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading leave history...</div>
          ) : leaveHistory.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No leave requests found</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveHistory.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">{leave.leaveType || 'N/A'}</TableCell>
                      <TableCell>{formatDate(leave.startDate)}</TableCell>
                      <TableCell>{formatDate(leave.endDate)}</TableCell>
                      <TableCell>{leave.totalDays || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(leave.status)}>
                          {leave.status ? leave.status.charAt(0).toUpperCase() + leave.status.slice(1) : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={leave.reason}>
                        {leave.reason && leave.reason.length > 30 ? `${leave.reason.substring(0, 30)}...` : (leave.reason || 'N/A')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeLeaves;
