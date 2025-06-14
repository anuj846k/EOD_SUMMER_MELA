"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Hash,
  Ticket,
} from "lucide-react";
import Image from "next/image";

interface TicketPassProps {
  ticketData: {
    name: string;
    email: string;
    phone: string;
    visitDate: Date | string;
    ticketId: string;
    qrCodeData?: string;
    bookingType?: string;
    adultsCount?: number;
    kidsCount?: number;
    exitTime?: string;
  };
  onClose?: () => void;
  setFormData?: (data: any) => void;
  form?: any;
}

const TicketPass = ({
  ticketData,
  onClose,
  setFormData,
  form,
}: TicketPassProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipping, setIsFlipping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsFlipping(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  // Generate QR code data from ticket information if not provided
  const qrCodeData = ticketData.qrCodeData || "";

  const handleClose = () => {
    setIsFlipping(true);
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative w-full max-w-sm sm:max-w-md transition-all duration-700 ease-out transform-gpu ${
          isFlipping
            ? "rotate-y-90 scale-75 opacity-0"
            : "rotate-y-0 scale-100 opacity-100"
        }`}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative transform-gpu max-h-[90vh] overflow-y-auto">
          <div className="bg-blue-500 text-white px-4 py-3 sm:p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Ticket className="mr-2" size={20} />
              <h2 className="text-lg sm:text-xl font-bold">Summer Mela Pass</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-blue-100 transition-colors duration-200 hover:scale-110 transform text-xl"
            >
              ✕
            </button>
          </div>

          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                  {ticketData.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {ticketData.bookingType === "individual"
                    ? "Individual Pass"
                    : ticketData.bookingType === "school"
                    ? "School Group Pass"
                    : "Group Pass"}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center mb-4 sm:mb-6 flex-wrap gap-2">
              <span className="text-blue-500 font-bold text-xl md:text-2xl sm:text-base">
                Free Entry
              </span>
            </div>

            {/* Add visitor count badges */}
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <User size={16} className="mr-1" />
                {ticketData.bookingType === "individual"
                  ? "1"
                  : ticketData.adultsCount || 1}{" "}
                {ticketData.bookingType === "individual" ||
                (ticketData.adultsCount || 1) === 1
                  ? "Adult"
                  : "Adults"}
              </div>
              {(ticketData.kidsCount || 0) > 0 && (
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <User size={16} className="mr-1" />
                  {ticketData.kidsCount}{" "}
                  {ticketData.kidsCount === 1 ? "Kid" : "Kids"}
                </div>
              )}
            </div>

            <div className="relative py-2 sm:py-4">
              <div className="absolute left-0 right-0 border-t-2 border-dashed border-gray-300"></div>
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-blue-500"></div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-blue-500"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {[
                {
                  icon: <Calendar size={16} className="text-blue-500 mr-2" />,
                  label: "Visit Date",
                  value: formatDate(ticketData.visitDate),
                },
                {
                  icon: <Clock size={16} className="text-blue-500 mr-2" />,
                  label: "Exit Time",
                  value: ticketData.exitTime
                    ? `${ticketData.exitTime.split(":")[0]}:${
                        ticketData.exitTime.split(":")[1]
                      } ${
                        parseInt(ticketData.exitTime.split(":")[0]) >= 12
                          ? "PM"
                          : "AM"
                      }`
                    : "Park Hours",
                },
                {
                  icon: <Hash size={16} className="text-blue-500 mr-2" />,
                  label: "Ticket ID",
                  value: ticketData.ticketId,
                },
                {
                  icon: <Phone size={16} className="text-blue-500 mr-2" />,
                  label: "Contact",
                  value: `+91 ${ticketData.phone}`,
                },
              ].map(({ icon, label, value }, i) => (
                <div key={i} className="flex items-start text-sm">
                  {icon}
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Display booking details */}
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <h4 className="text-sm font-semibold text-blue-700 mb-2">
                Booking Details
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Booking Type:</span>
                  <span className="font-medium ml-1">
                    {ticketData.bookingType === "individual"
                      ? "Individual"
                      : ticketData.bookingType === "school"
                      ? "School Group"
                      : "Group"}
                  </span>
                </div>
                {ticketData.bookingType !== "individual" && (
                  <div>
                    <span className="text-gray-500">Adults:</span>
                    <span className="font-medium ml-1">
                      {ticketData.adultsCount || 1}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Kids:</span>
                  <span className="font-medium ml-1">
                    {ticketData.kidsCount || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Total Visitors:</span>
                  <span className="font-medium ml-1">
                    {(ticketData.bookingType === "individual"
                      ? 1
                      : ticketData.adultsCount || 1) +
                      (ticketData.kidsCount || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-blue-50 p-4 rounded-lg">
              {qrCodeData ? (
                <div className="bg-white p-2 rounded">
                  <Image
                    src={qrCodeData}
                    alt="QR Code"
                    width={140}
                    height={140}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-[140px] h-[140px] bg-gray-200 flex items-center justify-center text-gray-500 text-xs text-center p-2">
                  QR code will appear here
                </div>
              )}
              <p className="text-xs text-center text-gray-500 mt-2">
                Scan at the entrance gate.
                <br />
                Save this ticket for your reference.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-3 sm:p-4 text-center text-sm sm:text-base">
            <p className="text-blue-500 text-sm">
              <MapPin className="inline-block mr-1" size={14} />
              EOD Adventure Park, Delhi, India
            </p>
            <p className="text-xs text-gray-500 mt-1">
              This ticket is non-transferable and valid only for the date shown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPass;
