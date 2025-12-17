import Link from "next/link";

export default function TradeHero({ trade }) {
  if (!trade) return null;

  return (
    <section className="section my-12">
      <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
        
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={trade.image} 
            alt={trade.title} 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          
          {/* Text Side */}
          <div className="flex-1 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-2 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
              Trade of the Month
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              {trade.title}
            </h2>
            
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              {trade.description}
            </p>

            <div className="pt-4">
              <Link 
                href={trade.link} 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
              >
                Read Full Breakdown →
              </Link>
            </div>
          </div>

          {/* Optional: Floating Stats Card on the right */}
          <div className="hidden md:block w-72">
            <div className="path-card !bg-slate-950/80 backdrop-blur-md border-slate-600 p-6 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="text-sm text-slate-400 uppercase font-bold tracking-wider mb-1">Avg Salary</div>
              <div className="text-3xl font-black text-green-400 mb-4">$85k - $120k</div>
              <div className="text-sm text-slate-400 uppercase font-bold tracking-wider mb-1">Time to Learn</div>
              <div className="text-xl font-bold text-white">6 Months</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
