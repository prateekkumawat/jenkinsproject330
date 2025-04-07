import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Pencil, 
  Trash, 
  CalendarCheck 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormDescription } from "@/components/ui/FormDescription";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, { message: "Holiday name must be at least 3 characters long" }),
  date: z.date({
    required_error: "Please select a date",
  }),
  isRecurringYearly: z.boolean().default(false),
  description: z.string().optional(),
});

type Holiday = z.infer<typeof formSchema>;

const initialHolidays: Holiday[] = [
  {
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1),
    isRecurringYearly: true,
    description: "First day of the year",
  },
  {
    name: "Independence Day",
    date: new Date(new Date().getFullYear(), 6, 4),
    isRecurringYearly: true,
    description: "National holiday",
  },
  {
    name: "Christmas",
    date: new Date(new Date().getFullYear(), 11, 25),
    isRecurringYearly: true,
    description: "Christmas celebration",
  },
  {
    name: "Company Foundation Day",
    date: new Date(new Date().getFullYear(), 3, 15),
    isRecurringYearly: true,
    description: "Anniversary of company founding",
  },
];

const HolidayManagement = () => {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);

  const form = useForm<Holiday>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: undefined,
      isRecurringYearly: false,
      description: "",
    },
  });

  const openAddDialog = () => {
    form.reset({
      name: "",
      date: undefined,
      isRecurringYearly: false,
      description: "",
    });
    setEditingHoliday(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (holiday: Holiday) => {
    form.reset({
      name: holiday.name,
      date: holiday.date,
      isRecurringYearly: holiday.isRecurringYearly,
      description: holiday.description || "",
    });
    setEditingHoliday(holiday);
    setIsDialogOpen(true);
  };

  const deleteHoliday = (holiday: Holiday) => {
    if (window.confirm(`Are you sure you want to delete "${holiday.name}"?`)) {
      setHolidays(holidays.filter((h) => h.date !== holiday.date || h.name !== holiday.name));
      toast({
        title: "Holiday deleted",
        description: `${holiday.name} has been removed from the holiday list.`,
      });
    }
  };

  const onSubmit = (data: Holiday) => {
    if (editingHoliday) {
      setHolidays(
        holidays.map((h) =>
          h.date === editingHoliday.date && h.name === editingHoliday.name ? data : h
        )
      );
      toast({
        title: "Holiday updated",
        description: `${data.name} has been updated.`,
      });
    } else {
      setHolidays([...holidays, data]);
      toast({
        title: "Holiday added",
        description: `${data.name} has been added to the holiday list.`,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Company Holidays</h2>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <Plus size={16} /> Add Holiday
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Holiday Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Recurring</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.length > 0 ? (
                holidays
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((holiday, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{holiday.name}</TableCell>
                      <TableCell>{format(holiday.date, "MMMM dd, yyyy")}</TableCell>
                      <TableCell>
                        {holiday.isRecurringYearly ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CalendarCheck className="mr-1 h-3 w-3" />
                            Yearly
                          </span>
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>{holiday.description || "-"}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditDialog(holiday)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteHoliday(holiday)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No holidays added yet. Click "Add Holiday" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingHoliday ? "Edit Holiday" : "Add New Holiday"}
            </DialogTitle>
            <DialogDescription>
              {editingHoliday
                ? "Make changes to the holiday details below."
                : "Fill in the details to add a new company holiday."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Holiday Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. New Year's Day" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isRecurringYearly"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Recurring Yearly</FormLabel>
                      <FormDescription>
                        Does this holiday repeat every year on the same date?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of this holiday" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {editingHoliday ? "Update Holiday" : "Add Holiday"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HolidayManagement;
