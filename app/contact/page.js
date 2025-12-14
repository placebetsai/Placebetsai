"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("idle"); // idle | submitting | submitted

  // Detect success redirect
  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setStatus("submitted");
    }
  }, [searchParams]);

  const handleSubmit = () => {
    setStatus("submitting");
  };

  if (status === "submitted") {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Form Successfully Submitted</h1>
        <p className="text-lg text-slate-300">
          Got it. We'll review and reply if it's serious.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg mb-8 text-slate-300">
        Partnerships, data deals, or real opportunities only. No picks, no "who you like tonight".
      </p>

      <form
        action="https://formsubmit.co/info@placebets.ai"  // Secret send to your email
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Redirect back to this page on success */}
        <input type="hidden" name="_next" value="https://placebets.ai/contact?success=1" />

        {/* Disable their thank you/captcha page */}
        <input type="hidden" name="_captcha" value="false" />

        {/* Honeypot spam protection */}
        <input type="text" name="_honey" style={{ display: "none" }} />

        {/* Auto-reply email (optional - sends copy to submitter) */}
        <input type="hidden" name="_autoresponse" value="Thanks for reaching out. We'll get back if it's a fit." />

        {/* Subject line for your inbox */}
        <input type="hidden" name="_subject" value="New Contact from PlaceBets.ai" />

        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell us what you want to do with PlaceBets.ai"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 disabled:opacity-50 transition"
        >
          {status === "submitting" ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
