"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CalendarIcon, Mail, User, Clock, Users, Coffee } from "lucide-react";
import TicketPass from "./ticket-pass";
// TODO: Create the TicketPass component
// import TicketPass from "./ticket-pass";

const formSchema = z
  .object({
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
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

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
    adultsCount: z
      .number()
      .min(1, "At least 1 adult is required (12 years +)")
      .max(50, "Maximum 50 adults allowed")
      .optional()
      .default(1),
    kidsCount: z
      .number()
      .min(0, "Cannot be negative")
      .max(100, "Maximum 100 kids allowed"),
    exitTime: z.string().min(1, "Exit time is required"),
    // packageType: z.enum(["standard", "school"]).optional(),
  })
  .refine(
    (data) => {
      // For individual bookings, adultsCount should be 1
      if (data.bookingType === "individual") {
        return data.adultsCount === 1;
      }
      return true;
    },
    {
      message: "Individual bookings must have exactly 1 adult",
      path: ["adultsCount"],
    }
  );

const RegistrationForm = () => {
  const [showTicketPass, setShowTicketPass] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      visitDate: undefined,
      bookingType: "individual",
      adultsCount: 1,
      kidsCount: 0,
      exitTime: "18:00",
    },
  });

  const watchBookingType = form.watch("bookingType");
  const watchAdultsCount = form.watch("adultsCount");
  const watchKidsCount = form.watch("kidsCount");

  // Update adultsCount and kidsCount when booking type changes
  useEffect(() => {
    if (watchBookingType === "individual") {
      form.setValue("adultsCount", 1);
      form.setValue("kidsCount", 0);
    }
  }, [watchBookingType, form]);

  const handleBookingSuccess = async (bookingData: any) => {
    try {
      const response = await fetch(
        "https://eod-mela-ccc8e8890f6f.herokuapp.com/api/summer-mela/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...bookingData,
          }),
        }
      );

      const result = await response.json();
      console.log("result", result);

      if (response.ok && result.success) {
        toast.success(
          "Booking confirmed successfully! Please check your email for the ticket."
        );
        setFormData(result.booking || result.data?.booking);
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
    // Ensure adultsCount is 1 and kidsCount is 0 for individual bookings
    const adultsCount =
      data.bookingType === "individual" ? 1 : data.adultsCount;
    const kidsCount = data.bookingType === "individual" ? 0 : data.kidsCount;

    const payload = {
      ...data,
      adultsCount,
      kidsCount,
      exitTime: data.exitTime,
    };
    console.log("payload", payload);

    setIsProcessing(true);

    try {
      await handleBookingSuccess(payload);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Could not process your booking. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-auto flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-6 sm:px-6 ">
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8 w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2 text-center">
          Book Your Free Visit
        </h1>
        <p className="text-blue-500 text-center mb-6 text-sm sm:text-base">
          Fill in your details to reserve your free spot at Summer Mela
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
              <label
                className={`flex items-center justify-center p-2 rounded-md border ${
                  form.watch("bookingType") === "individual"
                    ? "bg-blue-50 border-blue-400"
                    : "border-gray-300"
                } cursor-pointer`}
              >
                <input
                  type="radio"
                  value="individual"
                  className="sr-only"
                  {...form.register("bookingType")}
                />
                <span className="ml-2 md:text-lg text-xs">Individual</span>
              </label>
              <label
                className={`flex items-center justify-center p-2 rounded-md border ${
                  form.watch("bookingType") === "school"
                    ? "bg-blue-50 border-blue-400"
                    : "border-gray-300"
                } cursor-pointer`}
              >
                <input
                  type="radio"
                  value="school"
                  className="sr-only"
                  {...form.register("bookingType")}
                />
                <span className="ml-2 md:text-lg text-xs">School</span>
              </label>
              <label
                className={`flex items-center justify-center p-2 rounded-md border ${
                  form.watch("bookingType") === "group"
                    ? "bg-blue-50 border-blue-400"
                    : "border-gray-300"
                } cursor-pointer`}
              >
                <input
                  type="radio"
                  value="group"
                  className="sr-only"
                  {...form.register("bookingType")}
                />
                <span className="ml-2 md:text-lg text-xs  ">Group</span>
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

          {/* Adults Count - Only show for school and group bookings */}
          {watchBookingType !== "individual" && (
            <div>
              <label className="block text-blue-800 font-medium mb-1 text-sm">
                Number of Adults (12 years +)
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
          )}

          {watchBookingType !== "individual" && (
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
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:00">9:00 PM</option>
                <option value="20:00">10:00 PM</option>
              </select>
            </div>
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
                className="text-black w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none
    [appearance:textfield]
    [&::-webkit-calendar-picker-indicator]:opacity-0
    [&::-webkit-calendar-picker-indicator]:absolute
    [&::-webkit-calendar-picker-indicator]:inset-0
    [&::-webkit-calendar-picker-indicator]:w-full
    [&::-webkit-calendar-picker-indicator]:h-full
    [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
            {form.formState.errors.visitDate && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.visitDate.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">Booking Summary</h3>
            {watchBookingType !== "individual" && (
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Adults:</span>
                <span>{watchAdultsCount}</span>
              </div>
            )}
            {watchBookingType === "individual" && (
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Individual:</span>
                <span>1</span>
              </div>
            )}
            {watchBookingType !== "individual" && (
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Kids:</span>
                <span>{watchKidsCount}</span>
              </div>
            )}
            <div className="border-t border-blue-200 my-2"></div>
            <div className="flex justify-between font-bold">
              <span className="text-blue-800">Price:</span>
              <span className="text-blue-800">
                <span className="text-gray-600 line-through">₹ 399</span>
                <span className="text-green-500 ml-2">Free</span>
              </span>
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
                Processing...
              </div>
            ) : (
              "Book Now"
            )}
          </button>
        </form>
        {showTicketPass && formData && (
          <TicketPass
            ticketData={formData}
            onClose={() => {
              setShowTicketPass(false);
              setFormData(null);
              form.reset();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
