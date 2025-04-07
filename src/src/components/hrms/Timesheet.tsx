
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimesheetCalendar from "./TimesheetCalendar";
import TimesheetForm from "./TimesheetForm";

const Timesheet: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Example data for pending and completed dates
  // In a real application, these would come from an API
  const pendingDates = [
    new Date(new Date().setDate(new Date().getDate() - 2)),
    new Date(new Date().setDate(new Date().getDate() - 4)),
  ];
  
  const completedDates = [
    new Date(new Date().setDate(new Date().getDate() - 1)),
    new Date(new Date().setDate(new Date().getDate() - 3)),
    new Date(new Date().setDate(new Date().getDate() - 5)),
  ];

  const handleSubmitSuccess = () => {
    // In a real application, this would refresh the calendar data
    console.log("Timesheet submitted successfully");
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">Timesheet Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <TimesheetCalendar 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                pendingDates={pendingDates}
                completedDates={completedDates}
              />
            </div>
            <div className="md:col-span-8">
              <TimesheetForm 
                selectedDate={selectedDate}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timesheet;
