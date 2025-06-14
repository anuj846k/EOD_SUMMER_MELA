"use client";
import Image from "next/image";
import React from "react";
import trampoline from "@/app/assets/Images/trampoline.png";
import rainDance from "@/app/assets/Images/rainDance.png";
import zipline from "@/app/assets/Images/zipline.png";

const Activities = () => {
  const activities = [
    {
      title: "Trampoline Park",
      description:
        "Let go of exam pressure and bounce like there's no tomorrow — flips, tricks, and sky-high fun await!",
      image: trampoline,
      bg: "bg-gradient-to-br from-teal-400 to-cyan-500",
      icon: "🤸",
    },
    {
      title: "Rain Dance & Music",
      description:
        "Drench yourself in the joy of music and dance under the rain — it's a summer celebration like no other!",
      image: rainDance,
      bg: "bg-gradient-to-br from-indigo-400 to-blue-500",
      icon: "💃",
    },
    {
      title: "Zipline Adventure",
      description:
        "Soar through the air on our exciting zipline course — experience the thrill of flying above the ground!",
      image: zipline,
      bg: "bg-gradient-to-br from-rose-400 to-pink-500",
      icon: "🚡",
    },
  ];

  return (
    <section
      id="activities"
      className="relative w-full px-4 md:px-20 lg:px-52 py-20 overflow-hidden bg-gradient-to-b bg-gray-50"
    >
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          Exciting Activities Await You
        </h1>
        <p className="text-gray-600 text-base md:text-lg mt-4 max-w-2xl mx-auto">
          From thrilling rides to rain-soaked grooves, this summer is packed with fun for everyone!
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg ${activity.bg} text-white overflow-hidden transition-transform duration-300 hover:scale-[1.03]`}
          >
            <div className="px-5 py-4 flex justify-between items-center bg-white/10 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">{activity.icon}</span>
                <h2 className="text-xl font-semibold">{activity.title}</h2>
              </div>
              <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                FEATURED
              </span>
            </div>

            <div className="relative h-48 md:h-64">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-sm">
              <p className="text-sm md:text-base mb-4">{activity.description}</p>
            
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-block px-6 py-3 rounded-full bg-gray-900 text-white shadow-md">
          <h2 className="text-lg md:text-xl font-bold">
            + <span className="text-yellow-400">Many More</span> Adventures
          </h2>
        </div>
        <p className="text-gray-600 mt-4 md:text-base max-w-xl mx-auto">
          Archery, Laser Tag, Tree Top Courses, Food Zones & More Await You!
        </p>
      </div>
    </section>
  );
};

export default Activities;
