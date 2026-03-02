import Layout from "../components/Layout";
import AdUnit from "../components/AdUnit";
import EmailCapture from "../components/EmailCapture";

export default function TradeSchoolsPage() {
  return (
    <Layout title="Trade Schools – Programs That Actually Pay Off">
      
      {/* HERO */}
      <section className="hero text-center max-w-3xl mx-auto">
        <p className="eyebrow">NO SUITE. NO DORM. JUST SKILLS.</p>
        <h1 className="hero-title">Trade schools that actually pay off</h1>
        <p className="hero-subtitle">
          Programs are 3–18 months. Many are paid apprenticeships. These paths
          can hit $70k–$150k+ without a four-year degree.
        </p>
      </section>

      {/* GLOW CARD GRID */}
      <section className="section">
        <div className="grid md:grid-cols-3 gap-8">

          {/* HVAC */}
          <div className="glow-card p-6">
            <h3 className="text-xl font-bold mb-2">HVAC / Refrigeration</h3>
            <p className="text-slate-300">
              Climate systems, refrigeration, and commercial HVAC. Always needed,
              everywhere. Massive overtime potential.
            </p>
            <ul className="mt-4 text-slate-400">
              <li>• 6–12 month programs</li>
              <li>• Residential + commercial work</li>
              <li>• Specialize in refrigeration = higher pay</li>
            </ul>
            <a
              className="text-cyan-300 font-bold block mt-4"
              href="https://www.apprenticeship.gov/apprenticeship-job-finder"
              target="_blank"
              rel="noreferrer"
            >
              Find HVAC apprenticeships →
            </a>
          </div>

          {/* WELDING */}
          <div className="glow-card p-6">
            <h3 className="text-xl font-bold mb-2">Welding & Fabrication</h3>
            <p className="text-slate-300">
              Structural welding, pipe welding, fabrication. Travel welders can
              hit insane income.
            </p>
            <ul className="mt-4 text-slate-400">
              <li>• 3–9 month welding schools</li>
              <li>• Pipeline, shipyards, heavy industry</li>
              <li>• Certification-based (no degree required)</li>
            </ul>
            <a
              className="text-cyan-300 font-bold block mt-4"
              href="https://www.weldingschool.com/"
              target="_blank"
              rel="noreferrer"
            >
              Welding school guide →
            </a>
          </div>

          {/* ELECTRICIAN */}
          <div className="glow-card p-6">
            <h3 className="text-xl font-bold mb-2">Electrician (Apprenticeship)</h3>
            <p className="text-slate-300">
              Become a licensed journeyman through a paid apprenticeship. One of
              the strongest long-term incomes.
            </p>
            <ul className="mt-4 text-slate-400">
              <li>• 4–5 year apprenticeship</li>
              <li>• Union + non-union pathways</li>
              <li>• Huge national demand (2025–2035)</li>
            </ul>
            <a
              className="text-cyan-300 font-bold block mt-4"
              href="https://www.electricianschooledu.org/"
              target="_blank"
              rel="noreferrer"
            >
              Electrician schools →
            </a>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="section text-center">
        <h2 className="section-title">Not sure which program fits your life?</h2>
        <p className="section-subtitle max-w-xl mx-auto">
          Tell us your goals and timeline — we’ll recommend the top paths for YOU.
        </p>
        <a href="/contact" className="btn btn-primary mt-4">
          Ask which trade is best
        </a>
      </section>

      <section className="section max-w-2xl mx-auto">
        <AdUnit slot="6600722153" />
      </section>

      <section className="section max-w-2xl mx-auto">
        <EmailCapture />
      </section>

    </Layout>
  );
}
