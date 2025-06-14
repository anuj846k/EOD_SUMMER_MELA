import Image from "next/image";
import React, { useState, useEffect } from "react";
import scooter from "@/app/assets/Images/scooter.png";

// Sample previous events data
const previousEvents = [
  {
    id: 1,
    title: "Adventure Mela 2025",
    imagePath: "/assets/Images/IMG_2664.PNG",
    description:
      "A magical carnival with colorful rides, games, and cotton candy stalls that brought joy to over 2,000 visitors!",
    date: " May 2025 - June 2025",
    color: "from-yellow-400 to-orange-500",
    icon: "🎡",
  },
  {
    id: 2,
    title: "Adventure Mela 2025",
    imagePath: "/assets/Images/IMG_2666.PNG",
    description:
      "Grand opening of our thrilling Adventure Land featuring 15 exciting rides, carnival games, and live performances.",
    date: " May 2025 - June 2025",
    color: "from-green-400 to-teal-500",
    icon: "🎢",
  },
  {
    id: 3,
    title: "Adventure Mela 2025",
    imagePath: "/assets/Images/IMG_2453.JPG",
    description:
      "Magical winter-themed carnival with festive lights, holiday treats, and special snow attractions for the whole family.",
    date: " May 2025 - June 2025",
    color: "from-blue-400 to-indigo-500",
    icon: "❄️",
  },
  {
    id: 4,
    title: "Adventure Mela 2025",
    imagePath: "/assets/Images/IMG_2289.JPG",
    description:
      "A vibrant celebration with flower-themed rides, colorful parades, and exciting carnival games for children of all ages.",
    date: " May 2025 - June 2025",
    color: "from-pink-400 to-purple-500",
    icon: "🌸",
  },
];

const Events = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const currentEvent = previousEvents[currentEventIndex];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) =>
        prevIndex === previousEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Carnival-style header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text bg-gradient-to-r text-black mb-6">
              Our Magical Events
            </h2>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Step right up and relive the magic of our past carnivals and
            festivals! Each event brings its own unique thrills and excitement.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Event showcase with rotating images */}
          <div className="relative w-full md:w-1/2">
            <div className="relative">
              {/* Carnival-style frame */}
              <div className="absolute inset-0 -m-4 rounded-xl bg-gradient-to-r from-yellow-400 via-pink-300 to-blue-500 transform rotate-2"></div>

              <div className="relative bg-white p-4 rounded-lg shadow-lg transform -rotate-2">
                {/* Main image display */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  {previousEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentEventIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        src={event.imagePath}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-bold text-xl">
                          {event.title}
                        </h3>
                        <p className="text-white/80 text-sm">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ticket-style label */}
                <div className="absolute -top-6 -right-6 bg-red-500 text-white px-4 py-2 rounded-lg transform rotate-12 shadow-lg border-2 border-white">
                  <span className="text-sm font-bold">MEMORIES</span>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-6 gap-3">
              {previousEvents.map((event, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentEventIndex
                      ? "bg-gradient-to-r from-yellow-400 to-red-500 scale-125 ring-2 ring-yellow-200 ring-offset-2"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`View ${event.title}`}
                />
              ))}
            </div>
          </div>

          {/* Right side - With scooter image and Summer Mela title */}
          <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
            <div className="relative overflow-hidden w-full">
              <div className="relative z-10  p-12 rounded-xl transform transition-all duration-500   flex flex-col items-center justify-center">
                <div className="relative w-full h-48 mb-6">
                  <Image
                    src={scooter}
                    alt="Food Delivery Scooter"
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="text-4xl font-extrabold text-blue-800 text-center">
                  Summer Mela 2025
                </h3>

                {/* <div className="w-32 h-1 bg-blue-200 rounded-full my-6"></div> */}

                <div className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md mt-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  JUNE 2025 - JULY 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
