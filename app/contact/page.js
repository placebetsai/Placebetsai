import { Suspense } from 'react';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Professional inquiries and partnerships.',
  alternates: { canonical: 'https://placebets.ai/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4">
      {/* Container with glow effect */}
      <div className="relative w-full max-w-lg group">

        {/* Animated Gradient Glow Behind Card */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

        {/* Main Card */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Us</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
              PlaceBets.ai Corporate
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

          {/* Form */}
          <Suspense fallback={<div className="text-center text-slate-400 animate-pulse py-8">Loading form...</div>}>
            <ContactForm />
          </Suspense>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-8"></div>

          {/* Secondary mailto option */}
          <div className="text-center">
            <p className="text-slate-500 text-sm mb-3">Or email us directly</p>
            <a
              href="mailto:info@placebets.ai"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@placebets.ai
            </a>
          </div>

          <p className="text-xs text-slate-600 text-center mt-6">
            * No picks provided. Serious business only.
          </p>
        </div>
      </div>
    </div>
  );
}
