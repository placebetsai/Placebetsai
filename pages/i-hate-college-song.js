import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Link from "next/link";
import Head from "next/head";

export default function IHateCollegeSongPage() {
  return (
    <Layout>
      <SEO />
      <Head>
        <title>“I Hate College” (Song) — Why the Phrase Went Viral | IHateCollege.com</title>
        <meta
          name="description"
          content="People search 'I Hate College' for the song, but the phrase is bigger than music. Why it resonates, what it really means, and what to do if college isn't working."
        />
      </Head>

      <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
        {/* Top breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link href="/" className="text-slate-400 hover:text-white transition">
            ← Back home
          </Link>

          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
            Trending
          </span>
        </div>

        {/* HERO CARD */}
        <section className="p-8 rounded-3xl bg-slate-900/80 border border-slate-700 shadow-[0_0_30px_rgba(56,189,248,0.08)]">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
            “I Hate College” (Song)
          </p>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Why the Phrase Went Viral
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mt-5 max-w-3xl">
            A lot of people land here looking for the “I Hate College” song —
            totally fair. But the reason this phrase keeps trending is deeper than
            music: it reflects frustration with debt, pressure, and the feeling
            that college may not be worth it.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Link
              href="/alternatives"
              className="px-7 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-sky-50 transition-colors text-center"
            >
              Explore alternatives
            </Link>
            <Link
              href="/debt-calculator"
              className="px-7 py-3 rounded-full border border-slate-600 text-white font-bold hover:border-white transition-colors text-center"
            >
              Run the debt numbers
            </Link>
          </div>

          {/* Note */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="font-bold text-white">Note:</span> We don’t publish
              song lyrics here. This page discusses the cultural meaning of the
              phrase and real-world options.
            </p>
          </div>
        </section>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* WHY BOX */}
          <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-700">
            <h2 className="text-xl font-black text-white mb-3">
              Why people search “I Hate College”
            </h2>
            <ul className="text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li>They feel trapped or burned out</li>
              <li>They’re questioning student debt</li>
              <li>They’re considering dropping out</li>
              <li>They want alternatives that actually pay</li>
            </ul>
          </section>

          {/* REALITY CHECK BOX */}
          <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-700">
            <h2 className="text-xl font-black text-white mb-3">
              Reality check (fast)
            </h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              “I hate college” usually means you hate one of these:
            </p>
            <ul className="text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li>Wrong major / wrong plan</li>
              <li>Cost vs income doesn’t pencil out</li>
              <li>Environment (stress, pressure, burnout)</li>
              <li>No clear job path at the end</li>
            </ul>
          </section>

          {/* WHAT TO DO BOX */}
          <section className="p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/30 shadow-[0_0_18px_rgba(16,185,129,0.12)]">
            <h2 className="text-xl font-black text-white mb-3">
              If you hate college, do this next
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Don’t guess. Pick a path, run the numbers, and commit to a plan.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/alternatives"
                className="px-5 py-3 rounded-xl bg-slate-950/60 border border-slate-700 hover:border-emerald-400 transition"
              >
                <div className="text-white font-bold">
                  College alternatives that pay well →
                </div>
                <div className="text-slate-400 text-sm">
                  Trades, tech, apprenticeships, and civil service.
                </div>
              </Link>

              <Link
                href="/cost"
                className="px-5 py-3 rounded-xl bg-slate-950/60 border border-slate-700 hover:border-emerald-400 transition"
              >
                <div className="text-white font-bold">The real cost of college →</div>
                <div className="text-slate-400 text-sm">
                  Tuition is only the start. Opportunity cost is the killer.
                </div>
              </Link>

              <Link
                href="/debt-calculator"
                className="px-5 py-3 rounded-xl bg-slate-950/60 border border-slate-700 hover:border-emerald-400 transition"
              >
                <div className="text-white font-bold">Student debt calculator →</div>
                <div className="text-slate-400 text-sm">
                  See payments, timeline, and total interest.
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <section className="mt-10 p-7 rounded-3xl bg-slate-900/60 border border-slate-700 text-center">
          <h3 className="text-2xl font-black text-white mb-2">
            Want me to build the next 3 pages so Google actually ranks you?
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto">
            The bridge page is step 1. Ranking happens when you publish the 3 intent pages that
            match what people search next.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/alternatives"
              className="px-7 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-sky-50 transition-colors"
            >
              Keep reading
            </Link>
            <Link
              href="/"
              className="px-7 py-3 rounded-full border border-slate-600 text-white font-bold hover:border-white transition-colors"
            >
              Back to homepage
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
