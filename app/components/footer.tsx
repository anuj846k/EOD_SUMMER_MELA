import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Globe,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EOD Adventure Park</h3>
            <p className="mb-4 text-gray-300">
              EOD Adventure Park is a theme park located in Delhi, India. It is a
              popular destination for families and friends to enjoy a day of
              fun and entertainment.
            </p>
            <p className="mb-4 flex items-center text-gray-300">
              <Globe size={16} className="mr-2" />
              <a
                href="https://eodindia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mela-red transition-colors"
              >
                eodindia.com
              </a>
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/eod_adventurepark/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-mela-red transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/eodadventure/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-mela-red transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://x.com/eodadventurepa1?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-mela-red transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.youtube.com/@eodadventurepark"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-mela-red transition-colors"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://in.linkedin.com/company/vision-amusement-park-private-limited"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-mela-red transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <a
                  href="https://www.google.com/maps/place/E-O-D+Adventure+Park/data=!4m2!3m1!1s0x0:0x4e7054d0b5ebcf5?sa=X&ved=1t:2428&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mela-red transition-colors"
                >
                  e-o-d Adventure Park
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a
                  href="mailto:enquiry@eodparks.com"
                  className="hover:underline"
                >
                  enquiry@eodparks.com
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B919910175472&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="/"
                  className="hover:text-mela-red transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#student-discount"
                  className="hover:text-mela-red transition-colors"
                >
                  Student Discount
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="hover:text-mela-red transition-colors"
                >
                  Activities
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="hover:text-mela-red transition-colors"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  className="hover:text-mela-red transition-colors"
                >
                  Book Now
                </a>
              </li>
              <li>
                <a
                  href="https://eodindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mela-red transition-colors"
                >
                  Visit EOD India
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; 2025 EOD Adventure Mela. All rights reserved. |{" "}
            <a
              href="https://eodindia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mela-red transition-colors"
            >
              eodindia.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
