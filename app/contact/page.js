'use client';

import { useSearchParams } from 'next/navigation';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  if (isSuccess) {
    return (
      <div className="bg-emerald-900/20 border border-emerald-500/50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">Message Received</h3>
        <p className="text-slate-300">
          We'll be in touch if the numbers make sense.
        </p>
        <a 
          href="/" 
          className="inline-block mt-6 text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  return (
    <form 
      action="https://formsubmit.co/info@placebets.ai" 
      method="POST" 
      className="space-y-6"
    >
      {/* FormSubmit Configuration */}
      <input type="hidden" name="_next" value="https://placebets.ai/contact?success=true" />
      <input type="hidden" name="_subject" value="New Inquiry - PlaceBets.ai" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
          Name / Organization
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="appearance-none w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          placeholder="Who are you?"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="appearance-none w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          placeholder="contact@example.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
          Proposal
        </label>
        <textarea
          name="message"
          id="message"
          rows="5"
          required
          className="appearance-none w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
          placeholder="Brief, high-value communication."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
      >
        Send Securely
      </button>
    </form>
  );
}
