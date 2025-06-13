"use client";

import Navbar from "@/components/navbar";
import { Hero } from "@/components/hero/hero";
import Footer from "@/components/footer";
import Events from "@/components/events";
import Activities from "@/components/events/activities";
import TicketCTA from "@/components/ticket-cta";
import FaqSection from "@/components/faq";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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

        <section id="faq">
          <FaqSection />
        </section>
        <section id="ticket">
          <TicketCTA />
        </section>
      </main>

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}
