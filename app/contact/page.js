import { Suspense } from "react";
import ContactForm from "./ContactForm";

// THIS LINE FIXES THE BUILD ERROR
export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Contact | PlaceBets.ai',
  description: 'Partnerships and data deals.',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 mt-12">
      <h1 className="text-4xl font-bold mb-6 text-white">Contact</h1>
      <p className="text-lg text-slate-300 mb-12">
        Partnerships, data deals, or real opportunities only. No picks, no "who you like tonight".
      </p>

      <Suspense fallback={<div className="text-center text-slate-400 animate-pulse">Loading secure form...</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
