"use client";

import { FaCalendarAlt, FaClock, FaMapMarkedAlt } from "react-icons/fa";

const Location = () => {
  return (
    <section
      id="location"
      className="w-full px-4 md:px-20 lg:px-32 py-16  pb-24"
    >
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-8">
        Location & Access
      </h1>
      <p className="text-center text-gray-600 text-base md:text-lg mb-10 md:mb-16">
        We're right in the heart of the city — easy to reach and hard to forget!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ">
        <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-2 transition-shadow duration-300 hover:shadow-blue-300/60">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28020.385687369853!2d77.27565663476558!3d28.613327400000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4a366c9fd49%3A0x4e7054d0b5ebcf5!2sE-O-D%20Adventure%20Park!5e0!3m2!1sen!2sin!4v1749229784997!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-2xl font-bold text-gray-800">
            How to Reach ?
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            📍 Gate No. 2, Sanjay Lake, Pocket D, Mayur Vihar, New Delhi –
            110091
          </p>
          <p className="text-gray-600 text-base">
            Just 5 mins walk from Tilokpuri Metro Station (Pink Line).
          </p>

          <h2 className="text-2xl md:text-2xl font-bold text-gray-800">
            Date & Timings
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed flex items-center gap-2">
            <FaCalendarAlt /> 15 June 2025 - 30 June 2025
            <br />
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed flex items-center gap-2">
            <FaClock /> Monday to Sunday: 9:00 AM - 10:00 PM
          </p>

          <a
            href="https://www.google.com/maps/dir//Gate+no-2,+Sanjay+Lake,+Pocket+D,+Mayur+Vihar,+New+Delhi,+Delhi,+110091"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-4 border-gray-300 bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-base font-medium px-6 py-3 rounded-full transition"
          >
            <FaMapMarkedAlt /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default Location;
