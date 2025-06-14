"use client";
import { Hero } from "@/app/components/hero/hero";
import Events from "@/app/components/events";
import Activities from "@/app/components/events/activities";
import TicketCTA from "@/app/components/ticket-cta";
import FaqSection from "@/app/components/faq";
import Location from "./components/Location";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col  ">
      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="events" className="">
          <Events />
        </section>

        <section id="events" className="overflow-hidden">
          <Activities />
        </section>

        <section id="location" className="overflow-hidden">
          <Location />
        </section>

        <section id="faq">
          <FaqSection />
        </section>
        <section id="ticket">
          <TicketCTA />
        </section>
      </main>
    </div>
  );
}
