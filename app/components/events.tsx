import Image from "next/image";
import React, { useState, useEffect } from "react";
import scooter from "@/app/assets/images/scooter.png";

// Sample previous events data - replace with your actual events
const previousEvents = [
  {
    id: 1,
    title: "Adventure Mela 2025",
    image: "/images/event1.jpg", // Replace with your actual image paths
    description:
      "A magical carnival with colorful rides, games, and cotton candy stalls that brought joy to over 2,000 visitors!",
    date: "June 15, 2023",
    color: "from-yellow-400 to-orange-500",
    icon: "🎡",
  },
  {
    id: 2,
    title: "Student Summer Offer",
    image: "/images/event2.jpg",
    description:
      "Grand opening of our thrilling Adventure Land featuring 15 exciting rides, carnival games, and live performances.",
    date: "August 10, 2023",
    color: "from-green-400 to-teal-500",
    icon: "🎢",
  },
  {
    id: 3,
    title: "Winter Wonderland",
    image: "/images/event3.jpg",
    description:
      "Magical winter-themed carnival with festive lights, holiday treats, and special snow attractions for the whole family.",
    date: "December 23, 2023",
    color: "from-blue-400 to-indigo-500",
    icon: "❄️",
  },
  {
    id: 4,
    title: "Spring Festival",
    image: "/images/event4.jpg",
    description:
      "A vibrant celebration with flower-themed rides, colorful parades, and exciting carnival games for children of all ages.",
    date: "April 5, 2024",
    color: "from-pink-400 to-purple-500",
    icon: "🌸",
  },
];

const Events = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const currentEvent = previousEvents[currentEventIndex];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) =>
        prevIndex === previousEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Carnival-style header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-extrabold  bg-clip-text bg-gradient-to-r text-black mb-6 ">
              Our Magical Events
            </h2>
           
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Step right up and relive the magic of our past carnivals and
            festivals! Each event brings its own unique thrills and excitement.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Scooter with rotating images */}
          <div className="relative w-full md:w-1/2">
            <div className="relative">
              {/* Carnival-style frame */}
              <div className="absolute inset-0 -m-4 rounded-xl bg-gradient-to-r from-yellow-400 via-gray-200 to-blue-500 transform rotate-2"></div>

              <div className="relative bg-white p-4 rounded-lg shadow-lg transform -rotate-2">
                <Image
                  src={scooter}
                  alt="Adventure Scooter"
                  className="w-full h-auto"
                  priority
                />

                {/* Image carousel inside the scooter */}
                <div className="absolute top-[15%] left-[50%] w-[46%] h-[30%]  overflow-hidden rounded-lg border-4 border-white shadow-inner">
                  {previousEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentEventIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div
                        className={`relative w-full h-full bg-gradient-to-br ${event.color} flex items-center justify-center`}
                      >
                        <div className="text-center p-2 text-white">
                          <div className="text-3xl mb-1">{event.icon}</div>
                          <h4 className="font-bold text-shadow">
                            {event.title}
                          </h4>
                        </div>
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

            {/* Carnival dots decoration */}
            <div className="flex justify-center mt-6 gap-2">
              {previousEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentEventIndex
                      ? "bg-gradient-to-r from-yellow-400 to-red-500 scale-125"
                      : "bg-gray-300"
                  }`}
                  aria-label={`View event ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Event details on the right */}
          <div className="w-full md:w-1/2 space-y-6 mt-8 md:mt-0">
            {/* Carnival ticket design */}
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 border-4 border-dashed border-yellow-400">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{currentEvent.icon}</div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-800">
                    {currentEvent.title}
                  </h3>
                  <p className="text-sm text-gray-500">{currentEvent.date}</p>
                </div>
              </div>

              <div className="my-4 border-t-2 border-dotted border-gray-200"></div>

              <p className="text-gray-600 mb-4">{currentEvent.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-yellow-500"
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
                  <span>{currentEvent.date}</span>
                </div>

                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ADMIT ONE
                </div>
              </div>
            </div>

            {/* Carnival features */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                What Makes Our Events Special
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-2xl mr-3">🎭</span>
                  <span>Exciting performances and magical characters</span>
                </li>
                <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-2xl mr-3">🎮</span>
                  <span>Interactive carnival games with amazing prizes</span>
                </li>
                <li className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-2xl mr-3">🍭</span>
                  <span>Delicious treats and themed refreshments</span>
                </li>
              </ul>
            </div>

            <button className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500  hover:from-yellow-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center group">
              <span className="mr-2 text-xl"></span>
              View All Past Events
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
