"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("idle");

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
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold mb-6">Form Successfully Submitted</h2>
        <p className="text-xl text-slate-300">
          Got it. We'll review and reply if it's serious.
        </p>
      </div>
    );
  }

  return (
    <form
      action="https://formsubmit.co/info@placebets.ai"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <input type="hidden" name="_next" value="https://placebets.ai/contact?success=1" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" style={{ display: "none" }} />
      <input type="hidden" name="_autoresponse" value="Thanks for reaching out. We'll get back if it's a fit." />
      <input type="hidden" name="_subject" value="New Contact from PlaceBets.ai" />

      <div>
        <label className="block text-base font-medium text-slate-300 mb-3">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="w-full px-6 py-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 transition-shadow"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-300 mb-3">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          className="w-full px-6 py-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 transition-shadow"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-slate-300 mb-3">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={8}
          placeholder="Tell us what you want to do with PlaceBets.ai"
          className="w-full px-6 py-4 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 transition-shadow resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-5 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 disabled:opacity-70 transition-shadow shadow-lg hover:shadow-cyan-500/30 text-xl uppercase tracking-wide"
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
