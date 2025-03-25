
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { branches } from "@/utils/demoData";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Item name must be at least 2 characters." }),
  quantity: z.number().min(0, { message: "Quantity cannot be negative." }),
  threshold: z.number().min(1, { message: "Threshold must be at least 1." }),
  branch: z.string().min(1, { message: "Branch is required." }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItem: (item: FormValues) => void;
}

const AddItemModal = ({ open, onOpenChange, onAddItem }: AddItemModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      threshold: 10,
      branch: branches[0]?.name || "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the item data
      const newItem = {
        ...values,
        // Convert string numbers to actual numbers
        quantity: Number(values.quantity),
        threshold: Number(values.threshold),
      };
      
      // Submit the new item
      onAddItem(newItem);
      
      // Reset the form
      form.reset();
      
      // Close the dialog
      onOpenChange(false);
      
      // Show success toast
      toast({
        title: "Item Added",
        description: `${values.name} has been added to inventory.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Inventory Item</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <select
                      className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-asterisk-primary focus:border-transparent"
                      {...field}
                    >
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.name}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="threshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Threshold</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="10"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-asterisk-primary hover:bg-asterisk-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;
