export const metadata = {
  title: 'Contact | PlaceBets.ai',
  description: 'Partnerships and data inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* Main Card Container */}
      <div className="relative w-full max-w-lg group">
        
        {/* Glowing Gradient Background Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        
        {/* The Card Content */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Contact <span className="text-emerald-400">PlaceBets</span>
            </h1>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Description Text */}
          <div className="space-y-6 text-slate-300 text-center leading-relaxed">
            <p>
              We are building the ultimate toolkit for disciplined players. 
              Our focus is on EV+ calculators, bankroll management, and live tournament intel.
            </p>
            <p className="text-sm text-slate-400 border-t border-slate-800 pt-6">
              For partnerships, data integration deals, or platform inquiries, 
              please reach out directly.
            </p>
          </div>

          {/* Email Button Area */}
          <div className="mt-10">
            <a 
              href="mailto:info@placebets.ai"
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-0.5"
            >
              info@placebets.ai
            </a>
            <p className="mt-4 text-xs text-center text-slate-500 uppercase tracking-widest">
              Serious Inquiries Only
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
