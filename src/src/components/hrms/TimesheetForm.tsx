
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Clock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { employeeManagementApi } from "@/services/api/employeeManagementApi";
import { calculateTotalHours, formatDuration } from "@/utils/timesheetUtils";

const formSchema = z.object({
  clockIn: z.string().min(1, { message: "Clock in time is required" }),
  clockOut: z.string().min(1, { message: "Clock out time is required" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TimesheetFormProps {
  selectedDate: Date;
  onSubmitSuccess?: () => void;
}

const TimesheetForm: React.FC<TimesheetFormProps> = ({ 
  selectedDate, 
  onSubmitSuccess 
}) => {
  const [duration, setDuration] = useState<string>("");
  const { toast } = useToast();
  const employeeId = "f6eff92d-98ac-4610-b357-91a2b9c7be40";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clockIn: "",
      clockOut: "",
      notes: "",
    },
  });

  useEffect(() => {
    const clockIn = form.watch("clockIn");
    const clockOut = form.watch("clockOut");
    
    setDuration(formatDuration(clockIn, clockOut));
  }, [form.watch("clockIn"), form.watch("clockOut")]);

  // Format time to 12-hour format with AM/PM
  const formatTimeForDisplay = (time24h: string): string => {
    if (!time24h) return "";
    
    try {
      const [hours, minutes] = time24h.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      
      return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
    } catch (e) {
      return time24h;
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const timesheetData = {
        workDate: format(selectedDate, "yyyy-MM-dd"),
        clockIn: `${data.clockIn}:00`,
        clockOut: `${data.clockOut}:00`,
        totalHours: calculateTotalHours(data.clockIn, data.clockOut),
      };
      
      await employeeManagementApi.submitTimesheet(employeeId, timesheetData);
      
      toast({
        title: "Timesheet submitted",
        description: `Your timesheet for ${format(selectedDate, "PPP")} has been submitted.`,
      });
      
      form.reset({
        clockIn: "",
        clockOut: "",
        notes: "",
      });
      
      setDuration("");
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit timesheet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        Fill Timesheet for {format(selectedDate, "PPP")}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clockIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clock In</FormLabel>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="Enter clock in time"
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Time you started work 
                    {field.value && ` (${formatTimeForDisplay(field.value)})`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clockOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clock Out</FormLabel>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        placeholder="Enter clock out time"
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Time you finished work
                    {field.value && ` (${formatTimeForDisplay(field.value)})`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormLabel>Total Duration</FormLabel>
            <Input
              type="text"
              value={duration}
              readOnly
              disabled
              className="bg-gray-100"
            />
            <p className="text-sm text-muted-foreground">
              Total time worked (calculated automatically)
            </p>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Any additional notes about your work"
                  />
                </FormControl>
                <FormDescription>
                  Add any relevant information about your work day
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full sm:w-auto">
            Submit Timesheet
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TimesheetForm;
