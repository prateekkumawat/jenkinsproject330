
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TimesheetCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  pendingDates?: Date[];
  completedDates?: Date[];
}

const TimesheetCalendar: React.FC<TimesheetCalendarProps> = ({
  selectedDate,
  onDateChange,
  pendingDates = [],
  completedDates = [],
}) => {
  // Function to customize day elements
  const modifiersStyles = {
    pending: { backgroundColor: "#FFEDD5", color: "#EA580C", fontWeight: "bold" },
    completed: { backgroundColor: "#DCFCE7", color: "#15803D", fontWeight: "bold" },
    today: { backgroundColor: "#E0F2FE", color: "#0284C7", fontWeight: "bold" }
  };

  // Create modifiers for specific dates
  const modifiers = {
    pending: pendingDates,
    completed: completedDates,
  };

  return (
    <div className="border rounded-md p-3 bg-card">
      <h3 className="text-lg font-medium mb-2">Timesheet Calendar</h3>
      <div className="text-sm text-muted-foreground mb-3">
        Select a date to fill timesheet
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateChange(date)}
        disabled={(date) => date > new Date()}
        initialFocus
        className={cn("p-3 pointer-events-auto")}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
      <div className="flex gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#DCFCE7]"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#FFEDD5]"></div>
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#E0F2FE]"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default TimesheetCalendar;
