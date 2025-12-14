import React from 'react';

export const metadata = {
  title: 'Contact | PlaceBets.ai',
  description: 'Professional inquiries and partnerships.',
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
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Us</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
              PlaceBets.ai Corporate
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-10"></div>

          {/* Content */}
          <div className="space-y-8 text-center">
            <p className="text-slate-300 text-lg leading-relaxed">
              We are building the ultimate toolkit for disciplined players. 
              <span className="block mt-2 text-slate-400 text-base">
                Partnerships, data integration, and platform inquiries only.
              </span>
            </p>

            {/* The Money Button */}
            <div className="pt-4">
              <a 
                href="mailto:info@placebets.ai"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-emerald-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]"
              >
                <svg className="w-5 h-5 mr-2 -ml-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@placebets.ai
              </a>
            </div>

            <p className="text-xs text-slate-600 mt-6">
              * No picks provided. Serious business only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
