import Layout from '../../components/Layout';
import SEO from '../../components/SEO';

export async function getServerSideProps({ params }) {
  const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;

  if (!API_KEY) return { props: { college: null, error: 'API key missing' } };

  const searchName = params.slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  try {
    const res = await fetch(
      `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${API_KEY}&school.name=${encodeURIComponent(searchName)}&fields=school.name,latest.cost.attendance.academic_year,latest.earnings.10_yrs_after_entry.median`
    );
    const data = await res.json();
    const college = data.results?.[0] || null;

    return { props: { college } };
  } catch {
    return { props: { college: null } };
  }
}

export default function CollegePage({ college }) {
  if (!college) {
    return (
      <Layout>
        <SEO title="College Not Found" />
        <div className="container mx-auto p-8 text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-6">College Not Found</h1>
          <p className="text-xl">Search again in <a href="/rank-your-school" className="text-blue-400 underline">Rank Your School</a></p>
        </div>
      </Layout>
    );
  }

  const annualCost = college['latest.cost.attendance.academic_year'] || 30000;
  const earnings = college['latest.earnings.10_yrs_after_entry.median'] || 50000;
  const totalDebt = annualCost * 4 * 1.06;
  const yearsToPay = totalDebt / (earnings * 0.10);
  const isScam = yearsToPay > 20;

  return (
    <Layout>
      <SEO 
        title={`Is ${college['school.name']} Worth It? | IHateCollege`}
        description={`Real debt and earnings for ${college['school.name']}. Skip the trap.`}
      />
      <div className="container mx-auto p-8 bg-slate-950 text-slate-100">
        <h1 className="text-4xl font-bold mb-6">{college['school.name']}</h1>

        {isScam && (
          <div className="bg-red-900 p-6 rounded-lg mb-8 text-center">
            <h2 className="text-2xl font-bold text-red-300 mb-2">20-Year Debt Trap</h2>
            <p className="text-lg">Payoff in {yearsToPay.toFixed(1)} years – skip this.</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 p-6 rounded-lg text-center">
            <p className="text-slate-400 mb-2">Est. Debt</p>
            <p className="text-3xl font-bold">${totalDebt.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg text-center">
            <p className="text-slate-400 mb-2">Earnings</p>
            <p className="text-3xl font-bold text-green-400">${earnings.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg text-center">
            <p className="text-slate-400 mb-2">Years to Pay</p>
            <p className="text-3xl font-bold">{yearsToPay.toFixed(1)}</p>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Trade Schools That Pay Better</h2>
          <iframe
            src="https://quinstreet.com/widget/tradeschoolfinder"
            className="w-full h-96 border-0"
            title="Trade School Finder"
          />
        </div>
      </div>
    </Layout>
  );
}
