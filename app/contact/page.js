import { Suspense } from "react";
import ContactForm from "./ContactForm";

// THIS IS THE KEY FIX FOR TIMEOUTS
export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Contact | PlaceBets.ai',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 mt-12">
      <h1 className="text-4xl font-bold mb-6 text-white">Contact</h1>
      <p className="text-lg text-slate-300 mb-12">
        Partnerships and real opportunities only.
      </p>

      <Suspense fallback={<p className="text-slate-400">Loading...</p>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
