// pages/college/[slug].js
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;

  if (!apiKey) {
    return { props: { school: null } };
  }

  // FIXED: Fetch by OPEID (unique ID)
  const res = await fetch(
    `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&school.opeid=${slug}&per_page=1`
  );
  const data = await res.json();
  const school = data.results?.[0] || null;

  return { props: { school } };
}

export default function CollegePage({ school }) {
  if (!school) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl mb-4">School Not Found</h1>
          <Link href="/rank-your-school" className="text-cyan-400 hover:underline">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const avgCost = school['cost.tuition.in_state'] || 'N/A';
  const avgDebt = school['aid.median_debt.completers.overall'] || 'N/A';
  const earnings = school['earnings.6_yrs_after_entry.median'] || 'N/A';

  const payoffYears = avgDebt !== 'N/A' && earnings !== 'N/A'
    ? Math.round(avgDebt / (earnings * 0.1))
    : null;

  const isDebtTrap = payoffYears > 20;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{school['school.name']} – Real Numbers 2025</h1>
        <p className="text-gray-400 mb-8">
          {school['school.city']}, {school['school.state']} | OPEID: {school['school.opeid'] || 'N/A'}
        </p>

        {isDebtTrap && (
          <div className="bg-red-900 border-2 border-red-500 text-red-100 p-6 rounded-xl mb-10">
            <h2 className="text-2xl font-bold mb-2">⚠️ 20-Year Debt Trap Alert</h2>
            <p>Paying off average debt could take over 20 years. Explore alternatives.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Avg Cost</h3>
            <p className="text-3xl font-bold text-cyan-400">${avgCost}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Avg Debt</h3>
            <p className="text-3xl font-bold text-red-400">${avgDebt}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Earnings (6 yrs)</h3>
            <p className="text-3xl font-bold text-green-400">${earnings}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-10 rounded-xl mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Escape the Debt Trap</h2>
          <p className="text-xl text-gray-300 mb-8">Free scholarship matches or refinance loans.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://www.edvisors.com/?ref=YOUR_ID" target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-5 px-10 rounded-lg">
              Find Scholarships
            </a>
            <a href="https://www.sofi.com/ref/XXXXX" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-10 rounded-lg">
              Refinance Loans
            </a>
          </div>
        </div>

        <Link href="/rank-your-school" className="text-cyan-400 hover:underline">
          ← Search Another School
        </Link>
      </div>
    </div>
  );
}
