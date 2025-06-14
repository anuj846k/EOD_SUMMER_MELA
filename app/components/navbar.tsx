"use client";
import Image from "next/image";
import logo from "@/app/assets/Images/CroppedLogo.png";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#activities", label: "Activities" },
  { href: "/#location", label: "Location" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" sticky w-full bg-white  shadow-sm py-1 px-4 md:px-8 top-0 z-50 bg-opacity-70 border-b border-blue-200 ">
      <div className=" mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 hover:cursor-pointer">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={70}
              className="bg-white p-1 hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </Link>
          {/* <span className="font-pacifico text-2xl md:text-3xl text-blue-600 tracking-wide hidden sm:inline-block">
            Summer Mela
          </span> */}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blue-500 hover:text-blue-700 transition-colors duration-200 p-2 focus:outline-none"
        >
          <span
            className={`inline-block transition-transform duration-300 ${
              menuOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            {menuOpen ? <FaTimes size={24} /> : <GiHamburgerMenu size={24} />}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6 text-lg font-medium text-blue-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-blue-500 transition-colors duration-200 px-3 py-1 rounded-md hover:bg-blue-100/60 focus:outline-none "
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:from-blue-800 hover:to-blue-600 hover:scale-105 hover:shadow-blue-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-blue-200 shadow-lg z-40 animate-slideDown">
          <div className="flex flex-col items-center gap-4 py-2 px-4 text-blue-800 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="w-full text-center hover:text-blue-500 hover:bg-blue-100/60 py-2 rounded-md transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="text-center mt-4 w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold px-6 py-2 rounded-full shadow-md hover:from-blue-800 hover:to-blue-600 hover:scale-105 hover:shadow-blue-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
