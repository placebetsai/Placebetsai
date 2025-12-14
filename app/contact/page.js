"use client"; // Page can stay client if needed, but we isolate the hook

import { Suspense } from "react";
import ContactForm from "./ContactForm"; // Create this new file below

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg mb-8 text-slate-300">
        Partnerships, data deals, or real opportunities only. No picks, no "who you like tonight".
      </p>

      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
