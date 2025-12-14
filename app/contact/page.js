export const metadata = {
  title: 'Contact | PlaceBets.ai',
  description: 'Contact the PlaceBets team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Contact <span className="text-emerald-400">PlaceBets</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-lg text-slate-400 mb-12 leading-relaxed">
          We are focused on building the ultimate toolkit for disciplined players. 
          For partnerships, data integration deals, or platform inquiries, 
          reach out to us directly.
        </p>

        {/* Mail Link Card */}
        <div className="inline-block relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-xl px-8 py-6">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">
              Email Us
            </p>
            <a 
              href="mailto:info@placebets.ai" 
              className="text-2xl md:text-3xl font-bold text-white hover:text-emerald-400 transition-colors"
            >
              info@placebets.ai
            </a>
          </div>
        </div>

        <p className="mt-10 text-sm text-slate-600">
          Serious inquiries only. No picks.
        </p>
      </div>
    </div>
  );
}
