import { Suspense } from "react";
import ContactForm from "./ContactForm"; // New file (create next)

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 mt-12">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-lg text-slate-300 mb-12">
        Partnerships, data deals, or real opportunities only. No picks, no "who you like tonight".
      </p>

      <Suspense fallback={<p className="text-center text-slate-300 text-lg">Loading form...</p>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
