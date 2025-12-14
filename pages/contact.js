import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact Us | IHateCollege.com"
        description="Got questions? Contact the team directly."
      />

      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        
        {/* HERO TEXT */}
        <div className="text-center mb-10">
          <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">
            Direct Line
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Contact <span className="text-yellow-400">Us</span>
          </h1>
        </div>

        {/* GLOWING EMAIL CARD */}
        <div className="relative w-full max-w-lg group">
          
          {/* Yellow Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          
          {/* Card Content */}
          <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-8 md:p-12 text-center shadow-2xl">
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              We actually read every message. Whether you have feedback, partnership ideas, or just need to vent about tuition fees—reach out.
            </p>

            {/* The Email Button */}
            <a 
              href="mailto:info@ihatecollege.com"
              className="inline-flex items-center justify-center w-full px-6 py-4 text-lg font-bold text-black transition-all duration-200 bg-yellow-400 rounded-lg hover:bg-yellow-300 hover:scale-[1.02] shadow-[0_0_15px_-3px_rgba(250,204,21,0.3)]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@ihatecollege.com
            </a>

            <p className="mt-6 text-sm text-slate-500">
              No forms. No spam. Just email.
            </p>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">While you're here...</h2>
          <a
            href="/cheat-sheets"
            className="inline-block px-8 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-yellow-400/50 hover:bg-slate-800 transition-all"
          >
            Explore Cheat Sheets
          </a>
        </div>

      </div>
    </Layout>
  );
}
