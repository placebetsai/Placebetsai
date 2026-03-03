import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Terms() {
  return (
    <Layout>
      <SEO
        title="Terms of Use | IHateCollege.com"
        description="Terms of Use for IHateCollege.com — the rules for using this site."
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black text-white mb-2">Terms of Use</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Acceptance</h2>
            <p>
              By accessing or using IHateCollege.com (&quot;the Site&quot;), you agree to be bound by these Terms of Use. If you do not agree, do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. Informational Purpose Only</h2>
            <p>
              The content on this Site — including college rankings, salary data, career information, and job listings — is provided for general informational purposes only. Nothing on this Site constitutes financial, legal, or career advice. Always do your own research before making major life decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. Accuracy of Data</h2>
            <p>
              College cost, debt, and earnings data is sourced from the U.S. Department of Education College Scorecard API. While we strive for accuracy, we make no guarantee that the data is current, complete, or error-free. Salary and job market data is provided for general reference only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Job Board</h2>
            <p className="mb-3">By posting a job listing on our Job Board, you agree that:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You have the authority to post the listing on behalf of the hiring entity</li>
              <li>The listing is for a real, legitimate job opportunity</li>
              <li>You will not post fraudulent, misleading, or discriminatory listings</li>
              <li>Listings that violate these terms may be removed without notice</li>
              <li>We are not responsible for the conduct of employers or job seekers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. User Submissions</h2>
            <p>
              By submitting ratings, reviews, or any other content to the Site, you grant IHateCollege.com a non-exclusive, royalty-free license to use, display, and distribute that content. You represent that your submission does not violate any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Prohibited Conduct</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the Site for any illegal purpose</li>
              <li>Scrape or systematically download Site content without permission</li>
              <li>Post spam, malware, or fraudulent content</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Site&apos;s operation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">7. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites, including employers, affiliate programs, and educational providers. We are not responsible for the content, privacy practices, or accuracy of third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">8. Affiliate Disclosure</h2>
            <p>
              Some links on this Site may be affiliate links. This means we may earn a commission if you click through and make a purchase or submit an inquiry, at no additional cost to you. We only recommend products and services we believe are relevant to our audience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">9. Disclaimer of Warranties</h2>
            <p>
              The Site is provided &quot;as is&quot; without warranties of any kind. We disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, IHateCollege.com shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">12. Contact</h2>
            <p>
              Questions about these Terms?{" "}
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
