import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Page Not Found | IHateCollege.com" description="This page doesn't exist." />
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <p className="text-8xl font-black text-slate-700 mb-4">404</p>
        <h1 className="text-3xl font-black text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-10">
          This page doesn&apos;t exist — kind of like a guaranteed $100k salary with an English degree.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-100 transition-colors">
            Back to Home
          </Link>
          <Link href="/jobs" className="px-6 py-3 border border-slate-600 text-white font-black rounded-xl hover:border-white transition-colors">
            Browse Jobs
          </Link>
          <Link href="/college-rankings" className="px-6 py-3 border border-slate-600 text-white font-black rounded-xl hover:border-white transition-colors">
            College Rankings
          </Link>
        </div>
      </div>
    </Layout>
  );
}
