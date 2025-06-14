"use client";
import React from "react";
import { Button } from "./ui/button";
import bgPattern from "@/app/assets/Images/image2.png";
import Link from "next/link";

const TicketCTA = () => {
  return (
    <section
      className="relative py-10 overflow-hidden z-20"
      style={{
        backgroundImage: `url(${bgPattern.src})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/50 bg-opacity-50" />

      <div className="relative z-10 container mx-auto px-4 h-[400px] flex flex-col justify-center items-center text-center">
        <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 rounded-full rotate-2 shadow-xl border-2 border-white mb-4">
          <h3 className="text-white text-lg md:text-xl font-black tracking-wide">
            LIMITED TIME OFFER
          </h3>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
          Get Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
            FREE
          </span>{" "}
          Ticket Now!
        </h2>

        <p className="text-lg text-white/80 max-w-2xl mb-6">
          Experience the Summer Mela adventure park without spending a rupee.
          Limited tickets available!
        </p>

        <Link
          href="/booking"
          className="text-xl bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
};

export default TicketCTA;
