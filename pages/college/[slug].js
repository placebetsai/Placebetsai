// pages/college/[slug].js
import Link from "next/link";
import SEO from "../../components/SEO";

export async function getServerSideProps({ params }) {
  const raw = params?.slug || "";
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;

  if (!apiKey) return { props: { school: null, error: "Missing API key" } };

  // Expecting: "florida-state-university-134097"
  const parts = raw.split("-");
  const last = parts[parts.length - 1];
  const unitid = /^\d+$/.test(last) ? last : null;

  try {
    let url = "";

    if (unitid) {
      // ✅ Exact fetch by ID (reliable)
      const fields = [
        "id",
        "school.name",
        "school.city",
        "school.state",
        "school.opeid",
        "school.school_url",
        "latest.cost.tuition.in_state",
        "latest.aid.median_debt.completers.overall",
        "latest.earnings.10_yrs_after_entry.median",
      ].join(",");

      url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&id=${encodeURIComponent(
        unitid
      )}&per_page=1&fields=${encodeURIComponent(fields)}`;
    } else {
      // Fallback: try name guess (not ideal, but prevents blank page if someone visits old URLs)
      const nameGuess = raw.replace(/-/g, " ");
      const fields = [
        "id",
        "school.name",
        "school.city",
        "school.state",
        "school.opeid",
        "school.school_url",
        "latest.cost.tuition.in_state",
        "latest.aid.median_debt.completers.overall",
        "latest.earnings.10_yrs_after_entry.median",
      ].join(",");

      url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodeURIComponent(
        nameGuess
      )}&per_page=1&fields=${encodeURIComponent(fields)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Scorecard API HTTP ${res.status}`);

    const data = await res.json();
    const school = data?.results?.[0] || null;

    if (!school) return { notFound: true };

    return { props: { school, error: null } };
  } catch (err) {
    return {
      props: { school: null, error: err?.message || "Failed to load school" },
    };
  }
}

function fmtMoney(v) {
  if (v === null || v === undefined) return "N/A";
  const n = Number(v);
  if (!Number.isFinite(n)) return "N/A";
  return `$${Math.round(n).toLocaleString()}`;
}

export default function CollegePage({ school, error }) {
  if (!school) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl mb-4">School Not Found</h1>
          {error ? <p className="text-gray-400 mb-4">{error}</p> : null}
          <Link href="/rank-your-school" className="text-cyan-400 hover:underline">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const name = school["school.name"];
  const city = school["school.city"];
  const state = school["school.state"];
  const opeid = school["school.opeid"] || "N/A";

  const avgCostNum = school["latest.cost.tuition.in_state"];
  const avgDebtNum = school["latest.aid.median_debt.completers.overall"];
  const earningsNum = school["latest.earnings.10_yrs_after_entry.median"];

  const avgCost = fmtMoney(avgCostNum);
  const avgDebt = fmtMoney(avgDebtNum);
  const earnings = fmtMoney(earningsNum);

  // payoffYears = debt / (10% of annual earnings)
  const payoffYears =
    Number.isFinite(Number(avgDebtNum)) && Number.isFinite(Number(earningsNum)) && Number(earningsNum) > 0
      ? Math.round(Number(avgDebtNum) / (Number(earningsNum) * 0.1))
      : null;

  const isDebtTrap = payoffYears !== null && payoffYears > 20;

  const debtStr = avgDebt !== "N/A" ? `Avg debt: ${avgDebt}.` : "";
  const earningsStr = earnings !== "N/A" ? ` Median earnings 10 yrs out: ${earnings}.` : "";
  const metaDesc = `Is ${name} worth it? ${debtStr}${earningsStr} Real government data — no marketing spin. Compare to trade school alternatives.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": name,
    "address": { "@type": "PostalAddress", "addressLocality": city, "addressRegion": state },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <SEO
        title={`Is ${name} Worth It? Real Cost & Debt Data 2025`}
        description={metaDesc}
        schema={schema}
      />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Is {name} Worth It?
        </h1>

        <p className="text-gray-400 mb-8">
          {city}, {state} | OPEID: {opeid}
        </p>

        {isDebtTrap && (
          <div className="bg-red-900 border-2 border-red-500 text-red-100 p-6 rounded-xl mb-10">
            <h2 className="text-2xl font-bold mb-2">⚠️ 20-Year Debt Trap Alert</h2>
            <p>
              Paying off average debt could take{" "}
              <b>{payoffYears} years</b> if you can only put 10% of income toward it.
              Explore alternatives.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Avg Cost</h3>
            <p className="text-3xl font-bold text-cyan-400">{avgCost}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Avg Debt</h3>
            <p className="text-3xl font-bold text-red-400">{avgDebt}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Earnings (10 yrs)</h3>
            <p className="text-3xl font-bold text-green-400">{earnings}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-10 rounded-xl mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Escape the Debt Trap</h2>
          <p className="text-xl text-gray-300 mb-8">
            Find free scholarships or explore no-degree career paths.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://studentaid.gov/understand-aid/types/scholarships"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-5 px-10 rounded-lg"
            >
              Find Scholarships (Free)
            </a>
            <a
              href="/alternatives"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-10 rounded-lg"
            >
              Skip College Entirely →
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
