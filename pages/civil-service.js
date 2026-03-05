import Layout from "../components/Layout";
import SEO from "../components/SEO";
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

export default function CivilService() {
  const usaJobsHeaders = { 'User-Agent': 'ihatecollege.com', 'Authorization-Key': process.env.USAJOBS_API_KEY };
  const unsplashKey = process.env.UNSPLASH_KEY;

  // Live refresh for federal jobs (refreshes on focus/reload)
  const { data: uspsJobs } = useSWR('https://data.usajobs.gov/api/search?Keyword=USPS&ResultsPerPage=3', { headers: usaJobsHeaders, fetcher, revalidateOnFocus: true });
  const { data: tsaJobs } = useSWR('https://data.usajobs.gov/api/search?Keyword=TSA&ResultsPerPage=3', { headers: usaJobsHeaders, fetcher, revalidateOnFocus: true });
  const { data: fireJobs } = useSWR('https://data.usajobs.gov/api/search?Keyword=Firefighter&ResultsPerPage=3', { headers: usaJobsHeaders, fetcher, revalidateOnFocus: true });

  // Live refresh for state jobs (refreshes on focus/reload)
  const { data: statePoliceJobs } = useSWR('https://data.usajobs.gov/api/search?Keyword=State+Police&ResultsPerPage=3', { headers: usaJobsHeaders, fetcher, revalidateOnFocus: true });
  const { data: dmvJobs } = useSWR('https://data.usajobs.gov/api/search?Keyword=DMV&ResultsPerPage=3', { headers: usaJobsHeaders, fetcher, revalidateOnFocus: true });
  const { data: parkRangerJobs } = useSWR('https://data.usajobs.gov/api/search?Keyword=Park+Ranger&ResultsPerPage=3', { headers: usaJobsHeaders, fetcher, revalidateOnFocus: true });
  const { data: floridaDmvJobs } = useSWR('https://data.usajobs.gov/api/search?Keyword=Florida+DMV&ResultsPerPage=3', { headers: usaJobsHeaders, fetcher, revalidateOnFocus: true });

  // Live refresh for generic images (new random each load from Unsplash)
  const { data: uspsImage } = useSWR(`https://api.unsplash.com/search/photos?query=USPS+mail+carrier+in+action&per_page=1&orientation=portrait&client_id=${unsplashKey}`, fetcher, { revalidateOnFocus: true });
  const uspsImgUrl = uspsImage?.results[0]?.urls.regular || 'https://placehold.co/400x300?text=USPS'; // Fallback

  const { data: tsaImage } = useSWR(`https://api.unsplash.com/search/photos?query=TSA+agent+at+airport&per_page=1&orientation=portrait&client_id=${unsplashKey}`, fetcher, { revalidateOnFocus: true });
  const tsaImgUrl = tsaImage?.results[0]?.urls.regular || 'https://placehold.co/400x300?text=TSA';

  const { data: fireImage } = useSWR(`https://api.unsplash.com/search/photos?query=firefighter+in+action&per_page=1&orientation=portrait&client_id=${unsplashKey}`, fetcher, { revalidateOnFocus: true });
  const fireImgUrl = fireImage?.results[0]?.urls.regular || 'https://placehold.co/400x300?text=Firefighter';

  const { data: statePoliceImage } = useSWR(`https://api.unsplash.com/search/photos?query=state+police+officer+in+action&per_page=1&orientation=portrait&client_id=${unsplashKey}`, fetcher, { revalidateOnFocus: true });
  const statePoliceImgUrl = statePoliceImage?.results[0]?.urls.regular || 'https://placehold.co/400x300?text=State+Police';

  const { data: dmvImage } = useSWR(`https://api.unsplash.com/search/photos?query=DMV+clerk+at+desk&per_page=1&orientation=portrait&client_id=${unsplashKey}`, fetcher, { revalidateOnFocus: true });
  const dmvImgUrl = dmvImage?.results[0]?.urls.regular || 'https://placehold.co/400x300?text=DMV';

  const { data: parkRangerImage } = useSWR(`https://api.unsplash.com/search/photos?query=state+park+ranger+in+nature&per_page=1&orientation=portrait&client_id=${unsplashKey}`, fetcher, { revalidateOnFocus: true });
  const parkRangerImgUrl = parkRangerImage?.results[0]?.urls.regular || 'https://placehold.co/400x300?text=Park+Ranger';

  const { data: floridaDmvImage } = useSWR(`https://api.unsplash.com/search/photos?query=Florida+DMV+clerk+in+action&per_page=1&orientation=portrait&client_id=${unsplashKey}`, fetcher, { revalidateOnFocus: true });
  const floridaDmvImgUrl = floridaDmvImage?.results[0]?.urls.regular || 'https://placehold.co/400x300?text=Florida+DMV';

  return (
    <Layout>
      <SEO
        title="Government & Civil Service Jobs No Degree Required 2025 | IHateCollege.com"
        description="Federal, state, and city careers that pay $50k–$100k+, offer pensions and job security, and don't require a 4-year degree. USPS, TSA, firefighter, park ranger, and more."
      />

      {/* HERO */}
      <section className="text-center mt-8 px-4">
        <p className="uppercase text-sm letter-spacing-wider text-gray-400 mb-2">PENSION. BENEFITS. STABILITY.</p>
        <h1 className="text-4xl font-bold mb-4">
          Government & Civil Service Jobs{" "}
          <span className="text-green-400">You Can Get Without a Degree</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          These paths offer stability, upward mobility, and benefits colleges
          never mention — with ZERO student debt.
        </p>
      </section>

      {/* FEDERAL GRID */}
      <section className="px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Federal Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* USPS */}
          <div className="rounded-xl p-6 bg-slate-900/80 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-[patriotic-glow_6s_infinite_ease-in-out]">
            <img src={uspsImgUrl} alt="USPS Mail Carrier" className="rounded-md mb-4 w-full h-32 object-cover" />
            <h3 className="text-xl font-bold mb-3 text-white">USPS Mail Carrier / Clerk</h3>
            <p className="text-gray-300 text-sm mb-4">
              Federal benefits, overtime potential, and internal promotions.
            </p>
            <ul className="text-gray-300 space-y-2 text-sm mb-6">
              <li>✓ Pay: $55k–$80k</li>
              <li>✓ No degree required</li>
              <li>✓ Pension + job security</li>
            </ul>
            <a href="https://about.usps.com/careers/" target="_blank" className="text-green-400 font-bold hover:underline text-sm block mb-2">
              Apply at USPS →
            </a>
            <a href="https://www.usajobs.gov/Search/Results?k=usps" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on USAJobs →
            </a>
            <p className="text-gray-400 text-xs mt-4">Refreshed: {uspsJobs?.length || 0} open positions, e.g., {uspsJobs?.[0]?.MatchedObjectDescriptor.PositionTitle || 'Loading...'} ({uspsJobs?.[0]?.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange || '$'}). Apply: {uspsJobs?.[0]?.MatchedObjectDescriptor.ApplyURI[0] || ''}</p>
          </div>

          {/* TSA */}
          <div className="rounded-xl p-6 bg-slate-900/80 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-[patriotic-glow_6s_infinite_ease-in-out]">
            <img src={tsaImgUrl} alt="TSA Officer" className="rounded-md mb-4 w-full h-32 object-cover" />
            <h3 className="text-xl font-bold mb-3 text-white">TSA Officer</h3>
            <p className="text-gray-300 text-sm mb-4">
              Airport security roles with federal benefits and promotions.
            </p>
            <ul className="text-gray-300 space-y-2 text-sm mb-6">
              <li>✓ Pay: $45k–$85k+</li>
              <li>✓ No degree required</li>
              <li>✓ Strong career ladder</li>
            </ul>
            <a href="https://jobs.tsa.gov/" target="_blank" className="text-green-400 font-bold hover:underline text-sm block mb-2">
              TSA Careers →
            </a>
            <a href="https://www.usajobs.gov/Search/Results?k=tsa" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on USAJobs →
            </a>
            <p className="text-gray-400 text-xs mt-4">Refreshed: {tsaJobs?.length || 0} open positions, e.g., {tsaJobs?.[0]?.MatchedObjectDescriptor.PositionTitle || 'Loading...'} ({tsaJobs?.[0]?.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange || '$'}). Apply: {tsaJobs?.[0]?.MatchedObjectDescriptor.ApplyURI[0] || ''}</p>
          </div>

          {/* Firefighter */}
          <div className="rounded-xl p-6 bg-slate-900/80 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-[patriotic-glow_6s_infinite_ease-in-out]">
            <img src={fireImgUrl} alt="Firefighter" className="rounded-md mb-4 w-full h-32 object-cover" />
            <h3 className="text-xl font-bold mb-3 text-white">Firefighter</h3>
            <p className="text-gray-300 text-sm mb-4">
              High pay, strong community, and unmatched schedule flexibility.
            </p>
            <ul className="text-gray-300 space-y-2 text-sm mb-6">
              <li>✓ Pay: $60k–$140k</li>
              <li>✓ Pension (20–25 years)</li>
              <li>✓ Paid academy training</li>
            </ul>
            <a href="https://www.usfa.fema.gov/" target="_blank" className="text-green-400 font-bold hover:underline text-sm block mb-2">
              Fire Service Careers →
            </a>
            <a href="https://www.usajobs.gov/Search/Results?k=firefighter" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on USAJobs →
            </a>
            <p className="text-gray-400 text-xs mt-4">Refreshed: {fireJobs?.length || 0} open positions, e.g., {fireJobs?.[0]?.MatchedObjectDescriptor.PositionTitle || 'Loading...'} ({fireJobs?.[0]?.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange || '$'}). Apply: {fireJobs?.[0]?.MatchedObjectDescriptor.ApplyURI[0] || ''}</p>
          </div>
        </div>
      </section>

      {/* STATE GRID */}
      <section className="px-4 mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">State-Level Jobs (No Degree Needed)</h2>
        <p className="text-gray-300 text-center mb-8">Every state has entry-level civil service roles with benefits. Check your state's job board (e.g., jobs.myflorida.com for FL).</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* State Police */}
          <div className="rounded-xl p-6 bg-slate-900/80 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-[patriotic-glow_6s_infinite_ease-in-out]">
            <img src={statePoliceImgUrl} alt="State Police Officer" className="rounded-md mb-4 w-full h-32 object-cover" />
            <h3 className="text-xl font-bold mb-3 text-white">State Police Officer</h3>
            <p className="text-gray-300 text-sm mb-4">
              Law enforcement with state benefits, training academy, no degree.
            </p>
            <ul className="text-gray-300 space-y-2 text-sm mb-6">
              <li>✓ Pay: $60k–$100k</li>
              <li>✓ No degree required</li>
              <li>✓ Pension + overtime</li>
            </ul>
            <a href="https://www.usajobs.gov/Search/Results?k=state+police" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on State Sites →
            </a>
            <p className="text-gray-400 text-xs mt-4">Refreshed: {statePoliceJobs?.length || 0} open positions, e.g., {statePoliceJobs?.[0]?.MatchedObjectDescriptor.PositionTitle || 'Loading...'} ({statePoliceJobs?.[0]?.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange || '$'}). Apply: {statePoliceJobs?.[0]?.MatchedObjectDescriptor.ApplyURI[0] || ''}</p>
          </div>

          {/* DMV Clerk */}
          <div className="rounded-xl p-6 bg-slate-900/80 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-[patriotic-glow_6s_infinite_ease-in-out]">
            <img src={dmvImgUrl} alt="DMV Clerk" className="rounded-md mb-4 w-full h-32 object-cover" />
            <h3 className="text-xl font-bold mb-3 text-white">DMV Clerk</h3>
            <p className="text-gray-300 text-sm mb-4">
              Entry-level admin with state benefits, customer service, no degree.
            </p>
            <ul className="text-gray-300 space-y-2 text-sm mb-6">
              <li>✓ Pay: $35k–$55k</li>
              <li>✓ No degree required</li>
              <li>✓ Steady hours + promotion path</li>
            </ul>
            <a href="https://www.usajobs.gov/Search/Results?k=dmv" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on State Sites →
            </a>
            <p className="text-gray-400 text-xs mt-4">Refreshed: {dmvJobs?.length || 0} open positions, e.g., {dmvJobs?.[0]?.MatchedObjectDescriptor.PositionTitle || 'Loading...'} ({dmvJobs?.[0]?.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange || '$'}). Apply: {dmvJobs?.[0]?.MatchedObjectDescriptor.ApplyURI[0] || ''}</p>
          </div>

          {/* State Park Ranger */}
          <div className="rounded-xl p-6 bg-slate-900/80 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-[patriotic-glow_6s_infinite_ease-in-out]">
            <img src={parkRangerImgUrl} alt="State Park Ranger" className="rounded-md mb-4 w-full h-32 object-cover" />
            <h3 className="text-xl font-bold mb-3 text-white">State Park Ranger</h3>
            <p className="text-gray-300 text-sm mb-4">
              Outdoor work with state benefits, conservation, no degree.
            </p>
            <ul className="text-gray-300 space-y-2 text-sm mb-6">
              <li>✓ Pay: $45k–$70k</li>
              <li>✓ No degree required</li>
              <li>✓ Training + pension</li>
            </ul>
            <a href="https://www.usajobs.gov/Search/Results?k=park+ranger" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on State Sites →
            </a>
            <p className="text-gray-400 text-xs mt-4">Refreshed: {parkRangerJobs?.length || 0} open positions, e.g., {parkRangerJobs?.[0]?.MatchedObjectDescriptor.PositionTitle || 'Loading...'} ({parkRangerJobs?.[0]?.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange || '$'}). Apply: {parkRangerJobs?.[0]?.MatchedObjectDescriptor.ApplyURI[0] || ''}</p>
          </div>

          {/* Florida DMV Clerk */}
          <div className="rounded-xl p-6 bg-slate-900/80 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:border-blue-400/70 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ease-in-out animate-[patriotic-glow_6s_infinite_ease-in-out]">
            <img src={floridaDmvImgUrl} alt="Florida DMV Clerk" className="rounded-md mb-4 w-full h-32 object-cover" />
            <h3 className="text-xl font-bold mb-3 text-white">Florida DMV Clerk</h3>
            <p className="text-gray-300 text-sm mb-4">
              Entry-level admin with FL state benefits, customer service, no degree.
            </p>
            <ul className="text-gray-300 space-y-2 text-sm mb-6">
              <li>✓ Pay: $35k–$55k</li>
              <li>✓ No degree required</li>
              <li>✓ Steady hours + promotion path</li>
            </ul>
            <a href="https://jobs.myflorida.com/search?k=dmv" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on MyFlorida →
            </a>
            <a href="https://www.usajobs.gov/Search/Results?k=Florida+DMV" target="_blank" className="text-blue-400 font-bold hover:underline text-sm block mb-2">
              See Active Listings on USAJobs →
            </a>
            <p className="text-gray-400 text-xs mt-4">Refreshed: {floridaDmvJobs?.length || 0} open positions, e.g., {floridaDmvJobs?.[0]?.MatchedObjectDescriptor.PositionTitle || 'Loading...'} ({floridaDmvJobs?.[0]?.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange || '$'}). Apply: {floridaDmvJobs?.[0]?.MatchedObjectDescriptor.ApplyURI[0] || ''}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mt-12 px-4">
        <h2 className="text-2xl font-bold mb-3 text-white">Want federal or state job guidance?</h2>
        <a
          href="/contact"
          className="px-6 py-3 rounded-full bg-green-400 text-black font-bold hover:bg-green-300 transition inline-block"
        >
          Ask us which job fits you →
        </a>
      </section>
    </Layout>
  );
        }
