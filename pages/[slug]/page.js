import Link from 'next/link';

async function getSchoolData(slug) {
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
  if (!apiKey) throw new Error('Missing COLLEGE_SCORECARD_API_KEY');

  // Fetch all schools (paginated, but we'll search by name slug for simplicity)
  const res = await fetch(
    `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&school.name=${encodeURIComponent(slug.replace(/-/g, ' '))}&per_page=1`
  );
  const data = await res.json();

  if (data.results?.length === 0) return null;
  return data.results[0];
}

export async function generateStaticParams() {
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
  const res = await fetch(
    `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&per_page=100&fields=school.name,school.city,school.state,school.opeid`
  );
  const data = await res.json();

  // Generate slugs for all schools (this runs at build time)
  return data.results.map(school => ({
    slug: school['school.name']
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }));
}

export default async function CollegePage({ params }) {
  const { slug } = params;
  const school = await getSchoolData(slug);

  if (!school) {
    return <div className="text-center py-20 text-white">School not found.</div>;
  }

  const avgCost = school['cost.tuition.in_state'] || 'N/A';
  const avgDebt = school['aid.median_debt.completers.overall'] || 'N/A';
  const earnings = school['earnings.6_yrs_after_entry.median'] || 'N/A';

  const payoffYears = avgDebt !== 'N/A' && earnings !== 'N/A' 
    ? Math.round(avgDebt / (earnings * 0.1)) // Rough 10% of earnings to debt
    : null;

  const isDebtTrap = payoffYears > 20;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{school['school.name']} – Real Numbers 2025</h1>
        <p className="text-gray-400 mb-8">
          {school['school.city']}, {school['school.state']} | OPEID: {school['school.opeid']}
        </p>

        {isDebtTrap && (
          <div className="bg-red-900 border border-red-500 text-red-100 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold">20-Year Debt Trap Warning</h2>
            <p>At current earnings, it could take over 20 years to pay off average debt. Consider alternatives.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Avg Cost</h3>
            <p className="text-3xl text-cyan-400">${avgCost}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Avg Debt</h3>
            <p className="text-3xl text-red-400">${avgDebt}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Earnings (6 yrs)</h3>
            <p className="text-3xl text-green-400">${earnings}</p>
          </div>
        </div>

        {/* Monetization CTAs */}
        <div className="bg-gray-800 p-8 rounded-lg mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Escape the Debt Trap</h2>
          <p className="text-gray-300 mb-6">Get free scholarship matches or refinance your loans today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.edvisors.com/?ref=YOUR_EDVISORS_ID" // Replace after signup
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg"
            >
              Find Scholarships Now
            </a>
            <a
              href="https://www.sofi.com/ref/XXXXX" // Replace after signup
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg"
            >
              Refinance Loans
            </a>
          </div>
        </div>

        {/* Back to search */}
        <Link href="/rank-your-school" className="text-cyan-400 hover:underline">
          ← Search Another School
        </Link>
      </div>
    </div>
  );
}

// Optional: Metadata for SEO
export const metadata = {
  title: 'College Debt & Earnings 2025',
  description: 'Real cost, debt, and alumni earnings from official government data.',
};
