
import React, { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { assetManagementApi, Asset } from "@/services/api/assetManagementApi";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  assetId: z.string().min(1, "Asset ID is required"),
  assetType: z.string().min(1, "Asset type is required"),
  statusType: z.enum(["damaged", "lost", "underRepair"], {
    required_error: "Please select a status type",
  }),
  reportingDate: z.string().min(1, "Reporting date is required"),
  description: z.string().min(1, "Description is required"),
});

type DamagedFormValues = z.infer<typeof formSchema>;

// Map internal status types to API status values
const STATUS_MAP = {
  damaged: "Damaged",
  lost: "Lost",
  underRepair: "Repairing"
};

const LostDamagedAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<DamagedFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: "",
      assetType: "",
      statusType: "damaged",
      reportingDate: new Date().toISOString().split('T')[0],
      description: "",
    },
  });

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        // Use "Available" status instead of "active"
        const fetchedAssets = await assetManagementApi.getAllAssets("Available");
        setAssets(fetchedAssets);
      } catch (error) {
        console.error("Error fetching assets:", error);
        toast({
          title: "Error",
          description: "Failed to load assets. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [toast]);

  const onSubmit = async (data: DamagedFormValues) => {
    try {
      setSubmitting(true);
      console.log("Submitting lost/damaged asset data:", data);
      
      // Convert internal status type to API status value
      const apiStatus = STATUS_MAP[data.statusType];
      
      // Call the reportAsset endpoint with the correct data structure
      await assetManagementApi.reportAsset(data.assetId, {
        status: apiStatus,
        reportingDate: data.reportingDate,
        reportingDescription: data.description
      });
      
      toast({
        title: "Report Submitted",
        description: "Your lost/damaged asset report has been submitted successfully.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit the report. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Set the asset type when an asset is selected
  const handleAssetSelect = (assetId: string) => {
    const selectedAsset = assets.find(asset => asset.id === assetId);
    if (selectedAsset) {
      form.setValue("assetType", selectedAsset.type);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Report Lost or Damaged Asset</h2>
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
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleAssetSelect(value);
                    }} 
                    defaultValue={field.value}
                    disabled={loading || submitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loading ? "Loading assets..." : "Select an asset"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assets.map((asset) => (
                        <SelectItem key={asset.id} value={String(asset.id)}>
                          {asset.assetCode} - {asset.name}
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={submitting}
                  >
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
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="statusType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={submitting}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="damaged" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Damaged
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="lost" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Lost
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="underRepair" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Under Repair
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reporting Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={submitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the issue with the asset"
                      className="resize-none"
                      {...field}
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Submit Report
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LostDamagedAssets;
