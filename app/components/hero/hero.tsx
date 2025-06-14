import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import sun from "@/app/assets/Images/sun.png";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-200 via-blue-500 to-blue-600 py-12 sm:py-16 md:py-28">
      <div className="absolute -top-10 -left-10 w-60 sm:w-80 h-60 sm:h-80 z-0">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 w-[250%] h-2.5 bg-gradient-to-r from-yellow-100 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="absolute top-1/2 left-1/2 w-[250%] h-2.5 bg-gradient-to-r from-yellow-100 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-60 opacity-30" />
          <div className="absolute top-1/2 left-1/2 w-[250%] h-2.5 bg-gradient-to-r from-yellow-100 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-120 opacity-30" />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-400 blur-2xl opacity-40" />
        <div className="relative z-10 top-14 md:top-10 left-10">
          <Image
            src={sun}
            alt="Sun"
            width={180}
            height={180}
            className="object-contain w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]"
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-twinkle" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white rounded-full animate-twinkle delay-500" />
      </div>

      <div className="absolute top-0 sm:top-8 md:top-12 w-full flex justify-center z-10">
        <Image
          src="/bunting.svg"
          alt="Decorative flags"
          width={800}
          height={100}
          className="object-contain w-[90%] sm:w-[80%] md:w-auto"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-20 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl ml-20 md:ml-0 p-3 sm:p-4 rotate-2 shadow-xl border-2 border-white mb-4 sm:mb-6">
          <h3 className="text-white text-xl sm:text-2xl font-black tracking-wide">
            e-o-d
          </h3>
          <p className="text-white text-xs sm:text-sm uppercase">
            every other day
          </p>
        </div>

        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 px-6 sm:px-8 py-1 sm:py-2 rounded-full -rotate-2 shadow-lg border-2 border-white mb-3 sm:mb-4">
          <h2 className="text-white text-xl sm:text-2xl font-bold tracking-wider">
            Adventure Park
          </h2>
        </div>

        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white font-extrabold text-4xl sm:text-6xl md:text-8xl drop-shadow-lg mb-6 sm:mb-10 tracking-tight">
          Summer Mela
        </h1>

        <div className="inline-block mb-10">
          <Link
            href="/booking"
            className="cursor-pointer bg-red-500 px-6 py-2 rounded-full border-2 border-white shadow-md text-white text-xl font-bold tracking-wide"
          >
            Book Now
          </Link>
        </div>

        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border-4 border-dashed border-yellow-400 max-w-3xl mx-auto shadow-lg mb-10">
          <p className="text-black text-base font-medium flex flex-wrap justify-center gap-4 leading-relaxed">
            🎈 BALLOON SHOWDOWN · 🎵 LIVE MUSIC · 🎧 DJ · 🛍️ STALLS · 🍔 FOOD
            STALL · 🎤 EMCEE · 🥤 DRINKS · ✨ MUCH MORE
          </p>
        </div>

        <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-10 sm:mb-16">
          <div className="absolute top-1/2 -left-3 w-4 sm:w-6 h-8 sm:h-12 bg-blue-500 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/2 -right-3 w-4 sm:w-6 h-8 sm:h-12 bg-blue-500 rounded-full transform -translate-y-1/2" />
          <div className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 p-1 rounded-xl shadow-xl">
            <div className="bg-white p-4 sm:p-5 rounded-lg">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1 sm:mb-2">
                FREE ENTRY
              </h2>
              <div className="flex items-center justify-center gap-2 text-black font-semibold text-sm sm:text-base">
                📅 15 JUNE – 30 JUNE
              </div>
            </div>
          </div>
          <div className="absolute -top-4 sm:-top-5 -right-4 sm:-right-5 bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg rotate-12 shadow-lg border-2 border-white font-bold text-xs sm:text-sm">
            ADMIT ALL
          </div>
        </div>

        <div className="flex justify-center">
          {/* <Button className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full text-base sm:text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 group">
            Book Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
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
          </Button> */}
        </div>
      </div>

      <div className=" mt-0 h-10 sm:h-44 md:h-30 z-0">
        <Image
          src="/stalls.svg"
          alt="Food and game stalls"
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
