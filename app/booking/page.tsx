"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CalendarIcon, Mail, User, Clock, Users, Coffee } from "lucide-react";
// TODO: Create the TicketPass component
// import TicketPass from "./ticket-pass";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .refine(
      (email) => {
        const allowedDomains = ["@gmail.com", "@yahoo.com", "@hotmail.com"];
        return allowedDomains.some((domain) =>
          email.toLowerCase().endsWith(domain)
        );
      },
      {
        message: "Please use a Gmail, Yahoo, or Hotmail email address.",
      }
    ),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  
  birthday: z
    .object({
      month: z
        .number({ invalid_type_error: "Month is required" })
        .min(1, "Month is required")
        .max(12),
      day: z
        .number({ invalid_type_error: "Day is required" })
        .min(1, "Day is required")
        .max(31),
    })
    .refine(({ day, month }) => !isNaN(day) && !isNaN(month), {
      message: "Please select both month and day.",
    }),
  visitDate: z
    .preprocess(
      (val) => (val ? new Date(val as string) : undefined),
      z.date({ invalid_type_error: "Visit date is required" })
    )
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
      },
      {
        message: "Visit date must be at least one day after today.",
      }
    ),
  // New fields
  bookingType: z.enum(["individual", "school", "group"]),
  adultsCount: z.number()
    .min(1, "At least 1 adult is required")
    .max(50, "Maximum 50 adults allowed"),
  kidsCount: z.number()
    .min(0, "Cannot be negative")
    .max(100, "Maximum 100 kids allowed"),
  withoutFood: z.boolean().optional(),
  exitTime: z.string().min(1, "Exit time is required"),
  packageType: z.enum(["standard", "school"]).optional(),
});

const RegistrationForm = () => {
  const [showTicketPass, setShowTicketPass] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Pricing constants (these could be fetched from an API in a real app)
  const PRICES = {
    adult: { withFood: 499, withoutFood: 0 },
    kid: { withFood: 399, withoutFood: 0 },
    school: { adult: 349, kid: 0 }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: { month: undefined, day: undefined },
      visitDate: undefined,
      bookingType: "individual",
      adultsCount: 1,
      kidsCount: 0,
      withoutFood: false,
      exitTime: "18:00",
      packageType: "standard",
    },
  });

  const watchBookingType = form.watch("bookingType");
  const watchAdultsCount = form.watch("adultsCount");
  const watchKidsCount = form.watch("kidsCount");
  const watchWithoutFood = form.watch("withoutFood");
  const watchPackageType = form.watch("packageType");

  // Calculate total price whenever relevant fields change
  useEffect(() => {
    let price = 0;
    
    if (watchBookingType === "school" || watchPackageType === "school") {
      price = (watchAdultsCount * PRICES.school.adult) + (watchKidsCount * PRICES.school.kid);
    } else {
      const adultPrice = watchWithoutFood ? PRICES.adult.withoutFood : PRICES.adult.withFood;
      const kidPrice = watchWithoutFood ? PRICES.kid.withoutFood : PRICES.kid.withFood;
      
      price = (watchAdultsCount * adultPrice) + (watchKidsCount * kidPrice);
    }
    
    setTotalPrice(price);
  }, [watchBookingType, watchAdultsCount, watchKidsCount, watchWithoutFood, watchPackageType]);

  const handlePaymentSuccess = async (
    paymentResponse: any,
    bookingData: any
  ) => {
    try {
      const response = await fetch(
        "https://eod-mela-ccc8e8890f6f.herokuapp.com/api/users/register-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...bookingData,
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Booking confirmed successfully!");
        setFormData(result.data.booking);
        setShowTicketPass(true);
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      birthMonth: data.birthday.month,
      birthDay: data.birthday.day,
      price: totalPrice,
    };

    if (payload.price <= 0) {
      toast.error("Invalid amount. Please select a valid combo.");
      return;
    }

    setIsProcessing(true);

    try {
      // Create Razorpay order
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: payload.price }),
      });

      if (!res.ok) {
        throw new Error("Failed to create payment order.");
      }

      const order = await res.json();

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "EOD Adventure Park",
        description: `${data.bookingType === "school" ? "School" : data.withoutFood ? "Without Food" : "With Food"} Package Booking`,
        order_id: order.id,
        handler: function (response: any) {
          handlePaymentSuccess(response, payload);
        },
        prefill: {
          name: payload.name,
          email: payload.email,
          contact: payload.phone,
        },
        theme: { color: "#2C65EB" },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.error("Payment was cancelled.");
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Could not initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-auto flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-6 sm:px-6 ">
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8 w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2 text-center">
          Book Your Visit
        </h1>
        <p className="text-blue-500 text-center mb-6 text-sm sm:text-base">
          Fill in your details to reserve your spot
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 sm:gap-6 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Booking Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label className={`flex items-center justify-center p-2 rounded-md border ${form.watch("bookingType") === "individual" ? "bg-blue-50 border-blue-400" : "border-gray-300"} cursor-pointer`}>
                <input
                  type="radio"
                  value="individual"
                  className="sr-only"
                  {...form.register("bookingType")}
                />
                <span className="ml-2">Individual</span>
              </label>
              <label className={`flex items-center justify-center p-2 rounded-md border ${form.watch("bookingType") === "school" ? "bg-blue-50 border-blue-400" : "border-gray-300"} cursor-pointer`}>
                <input
                  type="radio"
                  value="school"
                  className="sr-only"
                  {...form.register("bookingType")}
                />
                <span className="ml-2">School</span>
              </label>
              <label className={`flex items-center justify-center p-2 rounded-md border ${form.watch("bookingType") === "group" ? "bg-blue-50 border-blue-400" : "border-gray-300"} cursor-pointer`}>
                <input
                  type="radio"
                  value="group"
                  className="sr-only"
                  {...form.register("bookingType")}
                />
                <span className="ml-2">Group</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <input
                {...form.register("name")}
                placeholder="John Doe"
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <input
                {...form.register("email")}
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-blue-50 border border-r-0 border-blue-200 rounded-l-md text-blue-600 text-sm">
                +91
              </span>
              <input
                {...form.register("phone")}
                placeholder="9876543210"
                maxLength={10}
                type="tel"
                className="w-full rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

       

         

          <div>
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Number of Adults
            </label>
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <input
                type="number"
                min="1"
                max="50"
                {...form.register("adultsCount", { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {form.formState.errors.adultsCount && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.adultsCount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Number of Kids
            </label>
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <input
                type="number"
                min="0"
                max="100"
                {...form.register("kidsCount", { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {form.formState.errors.kidsCount && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.kidsCount.message}
              </p>
            )}
          </div>

          {watchBookingType !== "school" && (
            <div className="sm:col-span-2">
              <div className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id="withoutFood"
                  {...form.register("withoutFood")}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="withoutFood" className="ml-2 text-blue-800 font-medium text-sm">
                  Without Food (₹{watchAdultsCount * PRICES.adult.withoutFood + watchKidsCount * PRICES.kid.withoutFood} total)
                </label>
              </div>
              <p className="text-gray-500 text-xs">
                With food: Adults ₹{PRICES.adult.withFood}/person, Kids ₹{PRICES.kid.withFood}/person
              </p>
              <p className="text-gray-500 text-xs">
                Without food: Adults ₹{PRICES.adult.withoutFood}/person, Kids ₹{PRICES.kid.withoutFood}/person
              </p>
            </div>
          )}

          {watchBookingType === "school" && (
            <div className="sm:col-span-2">
              <label className="block text-blue-800 font-medium mb-1 text-sm">
                School Package
              </label>
              <p className="text-gray-500 text-xs mb-2">
                School rates: Adults ₹{PRICES.school.adult}/person, Kids ₹{PRICES.school.kid}/person
              </p>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md border border-blue-200">
                <span className="text-blue-800 font-medium">Total Price:</span>
                <span className="text-blue-800 font-bold">₹{(watchAdultsCount * PRICES.school.adult) + (watchKidsCount * PRICES.school.kid)}</span>
              </div>
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Exit Time
            </label>
            <div className="relative">
              <Clock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <select
                {...form.register("exitTime")}
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Birth Date (Month & Day)
            </label>
            <div className="flex gap-2 sm:gap-3">
              <select
                {...form.register("birthday.month", { valueAsNumber: true })}
                className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <select
                {...form.register("birthday.day", { valueAsNumber: true })}
                className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            {form.formState.errors.birthday && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.birthday.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-blue-800 font-medium mb-1 text-sm">
              Visit Date
            </label>
            <div className="relative">
              <CalendarIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <input
                type="date"
                min={(() => {
                  const today = new Date();
                  return today.toISOString().split("T")[0];
                })()}
                max="2025-06-30"
                {...form.register("visitDate")}
                className="text-black w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {form.formState.errors.visitDate && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.visitDate.message}
              </p>
            )}
          </div>

          {/* Price Summary */}
          <div className="sm:col-span-2 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">Booking Summary</h3>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Adults:</span>
              <span>{watchAdultsCount} × ₹{
                watchBookingType === "school" 
                  ? PRICES.school.adult 
                  : watchWithoutFood 
                    ? PRICES.adult.withoutFood 
                    : PRICES.adult.withFood
              }</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Kids:</span>
              <span>{watchKidsCount} × ₹{
                watchBookingType === "school" 
                  ? PRICES.school.kid 
                  : watchWithoutFood 
                    ? PRICES.kid.withoutFood 
                    : PRICES.kid.withFood
              }</span>
            </div>
            <div className="border-t border-blue-200 my-2"></div>
            <div className="flex justify-between font-bold">
              <span className="text-blue-800">Total:</span>
              <span className="text-blue-800">₹{totalPrice}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="sm:col-span-2 w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold py-3 rounded-full shadow-md hover:from-blue-800 hover:to-blue-600 transition-all duration-300 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </div>
            ) : (
              "Book & Pay Now"
            )}
          </button>
        </form>
        {showTicketPass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Booking Confirmed!</h2>
              <p className="mb-4">Your booking has been successfully processed.</p>
              <button
                onClick={() => {
                  setShowTicketPass(false);
                  setFormData(null);
                  form.reset();
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
