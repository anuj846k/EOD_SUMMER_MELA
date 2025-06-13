"use client";

import Navbar from "@/app/components/navbar";
import { Hero } from "@/app/components/hero/hero";
import Footer from "@/app/components/footer";
import Events from "@/app/components/events";
import Activities from "@/app/components/events/activities";
import TicketCTA from "@/app/components/ticket-cta";
import FaqSection from "@/app/components/faq";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col  ">
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
