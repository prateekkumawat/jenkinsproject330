
import React from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Undo2 } from "lucide-react";

const formSchema = z.object({
  assetId: z.string().min(1, "Asset ID is required"),
  assetType: z.string().min(1, "Asset type is required"),
  reason: z.string().min(1, "Reason for return is required"),
});

type ReturnFormValues = z.infer<typeof formSchema>;

const ReturnAsset: React.FC = () => {
  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: "",
      assetType: "",
      reason: "",
    },
  });

  const onSubmit = (data: ReturnFormValues) => {
    console.log("Asset return data:", data);
    // Handle asset return logic here
    form.reset();
  };

  // Mock data for the example
  const allocatedAssets = [
    { id: "AST-001", name: "Lenovo ThinkPad X1", type: "laptop" },
    { id: "AST-005", name: "Logitech MX Master", type: "mouse" },
    { id: "AST-008", name: "Dell Monitor P2419H", type: "monitor" },
    { id: "AST-010", name: "Microsoft Ergonomic Keyboard", type: "keyboard" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Undo2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Return Asset</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="assetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an asset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allocatedAssets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.id} - {asset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="keyboard">Keyboard</SelectItem>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="monitor">Monitor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Reason for Return</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain the reason for returning this asset"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit">
            <Undo2 className="mr-2 h-4 w-4" />
            Return Asset
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReturnAsset;
