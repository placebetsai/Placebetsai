// pages/alternatives.js
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";

export default function AlternativesPage() {
  return (
    <Layout>
      <SEO
        title="Real Alternatives to a 4-Year Degree"
        description="Skip the dorms and debt. Explore real career alternatives that pay well without a traditional degree."
      />

      {/* HERO */}
      <section className="page-section text-center">
        <p className="hero-eyebrow">YOU HAVE OPTIONS</p>

        <h1 className="hero-title">
          Real alternatives to the{" "}
          <span className="text-yellow-300">4-year degree</span>
        </h1>

        <p className="hero-subtitle max-w-2xl mx-auto">
          You don’t have to borrow $80k+ to get a real career. These are paths
          people actually use to make strong income without a traditional
          degree.
        </p>
      </section>

      {/* GRID */}
      <section className="page-section">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Pick a lane that fits your life
        </h2>

        <div className="path-grid">
          {/* TECH */}
          <div className="glow-card">
            <h3 className="text-xl font-bold mb-2">Tech & Cyber</h3>

            <p className="text-slate-300 mb-4">
              Remote work, high pay, and zero degree needed. Just certs.
            </p>

            <ul className="list-disc ml-5 text-sm space-y-1 text-slate-300 mb-4">
              <li>Google Certificates (IT, Cyber, Data)</li>
              <li>CompTIA A+, Network+, Security+</li>
              <li>Cloud Certs (AWS, Azure)</li>
            </ul>

            <a
              href="https://grow.google/certificates/"
              target="_blank"
              className="text-cyan-300 hover:underline font-semibold"
            >
              Google Career Certificates →
            </a>
          </div>

          {/* TRADES */}
          <div className="glow-card">
            <h3 className="text-xl font-bold mb-2">Skilled Trades</h3>

            <p className="text-slate-300 mb-4">
              High job security + big overtime. Earn while you learn.
            </p>

            <ul className="list-disc ml-5 text-sm space-y-1 text-slate-300 mb-4">
              <li>HVAC & refrigeration</li>
              <li>Electrician / Lineman</li>
              <li>Welding / Fabrication</li>
              <li>CDL / Trucking</li>
            </ul>

            <a
              href="https://www.apprenticeship.gov/apprenticeship-job-finder"
              target="_blank"
              className="text-cyan-300 hover:underline font-semibold"
            >
              Find paid apprenticeships →
            </a>
          </div>

          {/* SALES */}
          <div className="glow-card">
            <h3 className="text-xl font-bold mb-2">
              No-Degree High Income Paths
            </h3>

            <p className="text-slate-300 mb-4">
              If you’re good with people, this is the highest upside.
            </p>

            <ul className="list-disc ml-5 text-sm space-y-1 text-slate-300 mb-4">
              <li>Real Estate</li>
              <li>Insurance / Public Adjusting</li>
              <li>Notary / Loan Signing</li>
              <li>High-ticket Sales</li>
            </ul>

            <a
              href="https://www.nar.realtor/education"
              target="_blank"
              className="text-cyan-300 hover:underline font-semibold"
            >
              Real Estate Licensing →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section text-center">
        <h2 className="text-2xl font-bold mb-4">Next move:</h2>

        <p className="text-slate-400 max-w-xl mx-auto mb-6">
          Don’t spend 3 months “researching.” Pick one thing you could start
          THIS month.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/trade-schools"
            className="px-6 py-3 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-slate-800"
          >
            Explore trade schools
          </a>
          <a
            href="/cheat-sheets"
            className="px-6 py-3 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-slate-800"
          >
            View cheat sheets
          </a>
          <a
            href="/debt-calculator"
            className="px-6 py-3 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-slate-800"
          >
            Run debt calculator
          </a>
        </div>
      </section>

      <section className="page-section max-w-2xl mx-auto">
        <AdUnit slot="6600722153" />
      </section>

      <section className="page-section max-w-2xl mx-auto">
        <EmailCapture />
      </section>
    </Layout>
  );
}
