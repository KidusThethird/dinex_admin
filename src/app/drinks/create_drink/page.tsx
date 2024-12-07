"use client"; // Required for client-side interactivity

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiUrl } from "@/apiConfig";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation"; 

// Define schema for form validation
const foodSchema = z.object({
    itemType: z.string(),
  name: z.string().min(1, "Food name is required"),

  description: z.string().min(1, "Description is required"),
  type: z.enum(["soft_drink","water","juice","hot_beverage","smoothies","milk","mocktails","alchol","others"], {
    required_error: "Type is required",
  }),
  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than zero"),
  duration: z.coerce
    .number({
      invalid_type_error: "Duration must be a number",
    })
    .positive("Duration must be greater than zero"),
  status: z.enum(["Available", "Unavailable"], {
    required_error: "Status is required",
  }),
});

// TypeScript type for the form data
type FoodFormValues = z.infer<typeof foodSchema>;

export default function FoodForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); 
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "others",
      price: 0,
      duration: 0,
      status: "Available",
      itemType :"drink"
    },
  });

  // Handle form submission
  const onSubmit = async (data: FoodFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/items`, data); // Use the /foods endpoint

      // Check if the response contains the failure message
      if (response.data.message === "failed") {
        toast("Failed to add food");
        setIsSubmitting(false);
        return; // Stop further processing if the response indicates failure
      }

      toast("Food Successfully Added!");
      router.push('/foods');
      form.reset();
    } catch (error) {
      console.error(error);
      toast("An error occurred while adding the food");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mt-10 m-14">
      <div className="py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/drinks">Drinks</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add a Drink</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-xl font-bold mb-6">Add New Drink</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drink Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter drink name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter drink description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preparation Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter duration in minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soft_drink">Soft Drink</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="juice">Juice</SelectItem>
                      <SelectItem value="hot_beverage">Hot Beverage</SelectItem>
                      <SelectItem value="smoothies">Smoothies</SelectItem>
                      <SelectItem value="milk">Milk Producs</SelectItem>
                      <SelectItem value="mocktails ">Mocktails </SelectItem>
                      <SelectItem value="alchol">Alcoholic Beverage</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-primaryColor" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Add Drink"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
