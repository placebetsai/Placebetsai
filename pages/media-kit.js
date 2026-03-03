import Head from "next/head";
import { useEffect } from "react";

export default function MediaKit() {
  useEffect(() => {
    document.title = "IHateCollege.com — Media Kit 2026";
  }, []);

  function handleDownload() {
    window.print();
  }

  return (
    <>
      <Head>
        <title>IHateCollege.com — Media Kit 2026</title>
        <meta name="robots" content="noindex" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; color: #111; }

          .page { max-width: 900px; margin: 0 auto; padding: 40px 40px 60px; }

          .download-bar {
            background: #0f172a;
            padding: 14px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .download-bar span { color: #94a3b8; font-size: 14px; }
          .download-btn {
            background: #0ea5e9;
            color: #fff;
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            font-weight: 900;
            font-size: 14px;
            cursor: pointer;
            letter-spacing: 0.02em;
          }
          .download-btn:hover { background: #38bdf8; }

          /* Header */
          .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 28px; border-bottom: 3px solid #0ea5e9; margin-bottom: 36px; }
          .header-left h1 { font-size: 36px; font-weight: 900; color: #0f172a; line-height: 1.1; }
          .header-left p { font-size: 15px; color: #64748b; margin-top: 6px; }
          .header-right { text-align: right; }
          .header-right .year { font-size: 48px; font-weight: 900; color: #e2e8f0; line-height: 1; }
          .header-right .label { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }

          /* Sections */
          h2 { font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: #0ea5e9; margin-bottom: 14px; }

          /* Stats */
          .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
          .stat-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 16px; text-align: center; }
          .stat-box .val { font-size: 28px; font-weight: 900; color: #0f172a; }
          .stat-box .lbl { font-size: 11px; color: #64748b; margin-top: 4px; }

          /* Two col */
          .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 36px; }

          /* Demo table */
          .demo-table { width: 100%; border-collapse: collapse; }
          .demo-table tr { border-bottom: 1px solid #f1f5f9; }
          .demo-table td { padding: 8px 0; font-size: 13px; }
          .demo-table td:first-child { color: #64748b; }
          .demo-table td:last-child { font-weight: 700; text-align: right; }

          /* Category list */
          .cat-list { list-style: none; }
          .cat-list li { font-size: 13px; color: #334155; padding: 5px 0; border-bottom: 1px solid #f1f5f9; display: flex; gap: 8px; }
          .cat-list li::before { content: "→"; color: #0ea5e9; font-weight: 900; flex-shrink: 0; }

          /* Content block */
          .content-block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
          .content-block h3 { font-size: 13px; font-weight: 900; color: #0f172a; margin-bottom: 12px; }

          /* Ad options */
          .ad-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 36px; }
          .ad-box { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
          .ad-box h3 { font-size: 13px; font-weight: 900; color: #0f172a; margin-bottom: 4px; }
          .ad-box p { font-size: 12px; color: #64748b; line-height: 1.5; }
          .ad-box .price { font-size: 11px; font-weight: 700; color: #0ea5e9; margin-top: 6px; }

          /* Social */
          .social-row { display: flex; gap: 12px; margin-bottom: 36px; }
          .social-box { flex: 1; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; }
          .social-box .platform { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
          .social-box .handle { font-size: 15px; font-weight: 900; color: #0f172a; }

          /* Footer */
          .kit-footer { border-top: 1px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; }
          .kit-footer p { font-size: 12px; color: #94a3b8; }
          .kit-footer a { color: #0ea5e9; text-decoration: none; font-weight: 700; }

          /* Mission */
          .mission { background: #0f172a; border-radius: 12px; padding: 24px; margin-bottom: 36px; }
          .mission p { font-size: 13px; color: #cbd5e1; line-height: 1.7; }
          .mission strong { color: #fff; }

          @media print {
            .download-bar { display: none !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page { padding: 20px 30px; }
            .mission { background: #0f172a !important; }
          }
        `}</style>
      </Head>

      {/* Download bar — hidden on print */}
      <div className="download-bar">
        <span>IHateCollege.com — Media Kit 2026</span>
        <button className="download-btn" onClick={handleDownload}>
          ↓ Save as PDF
        </button>
      </div>

      <div className="page">

        {/* Header */}
        <div className="header">
          <div className="header-left">
            <h1>IHateCollege.com</h1>
            <p>Media Kit — Audience & Advertising Overview</p>
            <p style={{ marginTop: 8, fontSize: 13, color: "#0ea5e9", fontWeight: 700 }}>ihatecollege.com</p>
          </div>
          <div className="header-right">
            <div className="year">2026</div>
            <div className="label">Media Kit</div>
          </div>
        </div>

        {/* Stats */}
        <h2>At a Glance</h2>
        <div className="stats-grid">
          <div className="stat-box"><div className="val">50K+</div><div className="lbl">Monthly Visitors</div></div>
          <div className="stat-box"><div className="val">120K+</div><div className="lbl">Monthly Pageviews</div></div>
          <div className="stat-box"><div className="val">72%</div><div className="lbl">U.S. Audience</div></div>
          <div className="stat-box"><div className="val">18–34</div><div className="lbl">Core Age Range</div></div>
        </div>

        {/* Demographics + Categories */}
        <div className="two-col">
          <div className="content-block">
            <h3>Audience Demographics</h3>
            <table className="demo-table">
              <tbody>
                <tr><td>Age 18–24</td><td>48%</td></tr>
                <tr><td>Age 25–34</td><td>24%</td></tr>
                <tr><td>Age 35+</td><td>28%</td></tr>
                <tr><td>United States</td><td>72%</td></tr>
                <tr><td>Mobile Users</td><td>68%</td></tr>
                <tr><td>Organic Search Traffic</td><td>61%</td></tr>
              </tbody>
            </table>
          </div>
          <div className="content-block">
            <h3>Content Categories</h3>
            <ul className="cat-list">
              <li>College ROI & Debt Analysis</li>
              <li>Trade & Vocational Careers</li>
              <li>Tech Without a Degree</li>
              <li>Government & Civil Service Jobs</li>
              <li>Student Loan Refinancing</li>
              <li>Salary Data & Career Comparisons</li>
            </ul>
          </div>
        </div>

        {/* Mission */}
        <div className="mission">
          <p>
            <strong>Our Mission:</strong> IHateCollege.com helps high school graduates, college students,
            and career changers make data-driven decisions about education. Using federal College Scorecard data,
            we show the real return on investment of 6,000+ U.S. colleges — and publish alternatives that
            pay well without a 4-year degree. <strong>50,000+ monthly visitors</strong> come to us actively
            researching student loans, trade schools, tech certifications, and job opportunities.
          </p>
        </div>

        {/* Audience Intent */}
        <h2>Audience Intent</h2>
        <div className="two-col" style={{ marginBottom: 36 }}>
          <div className="content-block">
            <h3>What Our Readers Are Doing</h3>
            <ul className="cat-list">
              <li>Comparing student loan refinancing options</li>
              <li>Researching trade schools and bootcamps</li>
              <li>Browsing non-degree job listings</li>
              <li>Calculating college debt vs. earnings</li>
            </ul>
          </div>
          <div className="content-block">
            <h3>High-Converting Verticals</h3>
            <ul className="cat-list">
              <li>Student Loan Refinancing (Credible, SoFi)</li>
              <li>Online Education (Coursera, Udemy)</li>
              <li>Trade & Vocational Schools</li>
              <li>Financial Products (banking, investing)</li>
            </ul>
          </div>
        </div>

        {/* Advertising Options */}
        <h2>Advertising Options</h2>
        <div className="ad-grid">
          <div className="ad-box">
            <h3>Sponsored Article</h3>
            <p>Native content written by our team, published permanently. Includes social promotion and SEO backlink.</p>
            <div className="price">Contact for pricing</div>
          </div>
          <div className="ad-box">
            <h3>Display Advertising</h3>
            <p>Banner placements on college rankings, job board, debt calculator, and high-traffic pages.</p>
            <div className="price">Contact for pricing</div>
          </div>
          <div className="ad-box">
            <h3>Affiliate Partnership</h3>
            <p>Performance-based promotion via content, sidebar, and email. CPA/CPL model. Long-term placements available.</p>
            <div className="price">Revenue Share / CPA</div>
          </div>
          <div className="ad-box">
            <h3>Job Board Listing</h3>
            <p>Post directly to our job board, visible to thousands of candidates seeking non-degree careers.</p>
            <div className="price">Free — 30 Day Listing</div>
          </div>
        </div>

        {/* Social */}
        <h2>Social Media</h2>
        <div className="social-row">
          <div className="social-box">
            <div className="platform">X · Twitter</div>
            <div className="handle">@ihatecollege4u</div>
          </div>
          <div className="social-box">
            <div className="platform">TikTok</div>
            <div className="handle">@_ihatecollege</div>
          </div>
          <div className="social-box">
            <div className="platform">YouTube</div>
            <div className="handle">@IHateCollege79</div>
          </div>
          <div className="social-box">
            <div className="platform">Website</div>
            <div className="handle">ihatecollege.com</div>
          </div>
        </div>

        {/* Footer */}
        <div className="kit-footer">
          <p>Data sourced from U.S. Dept. of Education College Scorecard API. Stats as of 2026.</p>
          <p>Contact: <a href="mailto:contact@ihatecollege.com">contact@ihatecollege.com</a></p>
        </div>

      </div>
    </>
  );
}
