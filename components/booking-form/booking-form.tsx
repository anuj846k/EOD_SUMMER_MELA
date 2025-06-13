"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const bookingFormSchema = z.object({
  bookingType: z.enum(["individual", "group", "school"]),
  adultsCount: z.coerce.number().min(1, "At least 1 adult required").max(50, "Maximum 50 adults allowed"),
  kidsCount: z.coerce.number().min(0).max(100, "Maximum 100 kids allowed"),
  foodOption: z.enum(["withFood", "withoutFood"]),
  exitTime: z.string().min(1, "Please select an exit time"),
  otherPlace: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingForm() {
  const [bookingType, setBookingType] = useState<"individual" | "group" | "school">("individual");
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      bookingType: "individual",
      adultsCount: 1,
      kidsCount: 0,
      foodOption: "withFood",
      exitTime: "",
      otherPlace: "",
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log(data);
    // Here you would typically send the data to your backend
    alert("Booking submitted successfully!");
  }

  // Handle booking type change
  const handleBookingTypeChange = (value: string) => {
    if (value === "individual" || value === "group" || value === "school") {
      setBookingType(value);
      form.setValue("bookingType", value);
      
      // Reset food option if group booking is selected
      if (value === "group") {
        form.setValue("foodOption", "withoutFood");
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-blue-50 rounded-t-lg">
        <CardTitle className="text-2xl text-blue-600">Book Your Summer Mela Experience</CardTitle>
        <CardDescription>Fill out the form below to reserve your spot at EOD Adventure Park</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs 
              defaultValue="individual" 
              onValueChange={handleBookingTypeChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="group">Group (w/o food)</TabsTrigger>
                <TabsTrigger value="school">School Package</TabsTrigger>
              </TabsList>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="adultsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Adults</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={50} {...field} />
                        </FormControl>
                        <FormDescription>Min: 1, Max: 50</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="kidsCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Kids</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} max={100} {...field} />
                        </FormControl>
                        <FormDescription>Min: 0, Max: 100</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {bookingType !== "group" && (
                  <FormField
                    control={form.control}
                    name="foodOption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Option</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={bookingType === "group"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select food option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="withFood">With Food</SelectItem>
                            <SelectItem value="withoutFood">Without Food</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="exitTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exit Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select exit time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="otherPlace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Place (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Specify any other place if needed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Tabs>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Book Now
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col text-sm text-gray-500">
        <p>For more information, call: 09910175472</p>
        <p>Location: Gate no-2, Sanjay Lake, Mayur Vihar, New Delhi, Delhi, 110091</p>
      </CardFooter>
    </Card>
  );
} 