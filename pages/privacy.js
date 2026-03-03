import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Privacy() {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | IHateCollege.com"
        description="Privacy Policy for IHateCollege.com — how we collect, use, and protect your data."
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Overview</h2>
            <p>
              IHateCollege.com (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and share information when you visit our website at ihatecollege.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3"><strong className="text-white">Information you provide:</strong> If you submit a school rating, post a job listing, or contact us, we collect the information you enter (such as your review text, job details, or email address).</p>
            <p className="mb-3"><strong className="text-white">Automatically collected data:</strong> Like most websites, we automatically collect certain information when you visit, including your IP address, browser type, pages visited, and time spent on pages.</p>
            <p><strong className="text-white">Cookies:</strong> We use cookies to improve your experience and to serve advertisements. You can control cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To operate and improve the website</li>
              <li>To display relevant advertisements via Google AdSense</li>
              <li>To respond to your inquiries</li>
              <li>To analyze traffic and usage patterns</li>
              <li>To display job listings you submit on our Job Board</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Google AdSense & Advertising</h2>
            <p className="mb-3">
              We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our site and other sites on the internet. You can opt out of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                Google&apos;s Ad Settings
              </a>.
            </p>
            <p>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site. For more information, see{" "}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                Google&apos;s advertising policies
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-3">We may use the following third-party services, each with their own privacy policies:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Google AdSense</strong> — advertising</li>
              <li><strong className="text-white">Google Analytics</strong> — traffic analysis</li>
              <li><strong className="text-white">Supabase</strong> — job board data storage</li>
              <li><strong className="text-white">U.S. Dept. of Education (College Scorecard API)</strong> — college data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Data Retention</h2>
            <p>
              Job board listings expire automatically after 30 days. School ratings and contact form submissions are retained for up to 12 months. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">7. Children&apos;s Privacy</h2>
            <p>
              Our site is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">8. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete personal data we hold about you. To exercise these rights, contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">10. Contact</h2>
            <p>
              For privacy-related questions, email us at:{" "}
              <a href="mailto:contact@ihatecollege.com" className="text-sky-400 hover:underline">
                contact@ihatecollege.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </Layout>
  );
}
