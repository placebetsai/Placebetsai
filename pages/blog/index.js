import fs from "fs";
import path from "path";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import AdUnit from "../../components/AdUnit";
import Link from "next/link";

// Root-level pages that appear in the blog feed (not under /blog/)
const ROOT_ARTICLES = [
  {
    slug: "/is-college-worth-it-2025",
    title: "Is College Worth It in 2025? The Real ROI Data",
    description: "We ran the actual return-on-investment numbers for 20 majors against trade school and cert paths. Some degrees are financial disasters.",
    date: "2026-02-16",
    author: "Sarah Chen",
    tag: "College ROI",
    rootPage: true,
  },
  {
    slug: "/trade-school-vs-college-salary-2025",
    title: "Trade School vs College Salary 2025: Who Wins?",
    description: "Electricians vs engineers. Plumbers vs accountants. The salary gap is closing — and in some trades, it's already flipped.",
    date: "2026-01-14",
    author: "Ryan Kowalski",
    tag: "Salary",
    rootPage: true,
  },
  {
    slug: "/how-to-make-money-without-a-college-degree",
    title: "How to Make Real Money Without a College Degree (8 Proven Paths)",
    description: "Eight income paths that work without a degree in 2025. Each one has real numbers, entry points, and realistic timelines.",
    date: "2026-01-21",
    author: "Marcus Webb",
    tag: "No Degree",
    rootPage: true,
  },
];

const TAG_COLORS = {
  "Student Debt": "bg-red-900/50 text-red-300 border-red-700",
  "Trades": "bg-amber-900/50 text-amber-300 border-amber-700",
  "Apprenticeships": "bg-sky-900/50 text-sky-300 border-sky-700",
  "Certifications": "bg-emerald-900/50 text-emerald-300 border-emerald-700",
  "Salary Comparison": "bg-violet-900/50 text-violet-300 border-violet-700",
  "College Alternatives": "bg-teal-900/50 text-teal-300 border-teal-700",
  "College ROI": "bg-orange-900/50 text-orange-300 border-orange-700",
  "Salary": "bg-blue-900/50 text-blue-300 border-blue-700",
  "No Degree": "bg-pink-900/50 text-pink-300 border-pink-700",
  "Career Paths": "bg-slate-700/50 text-slate-300 border-slate-500",
};

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), "pages", "blog");
  let blogArticles = [];

  try {
    const files = fs.readdirSync(blogDir).filter(
      (f) => f.endsWith(".js") && f !== "index.js"
    );

    for (const file of files) {
      const slug = file.replace(".js", "");
      const content = fs.readFileSync(path.join(blogDir, file), "utf8");

      // Extract metadata via regex from generated JSX
      const titleMatch = content.match(/title="((?:[^"\\]|\\.)*)"/);
      const descMatch = content.match(/description="((?:[^"\\]|\\.)*)"/);
      const dateMatch = content.match(/\/\/ date: (\d{4}-\d{2}-\d{2})/) || content.match(/Blog[^&]*&middot;\s*(\d{4}-\d{2}-\d{2})/);
      const authorMatch = content.match(/<div className="font-bold text-white text-sm">([^<]+)<\/div>/);

      blogArticles.push({
        slug,
        title: titleMatch ? titleMatch[1].replace(/\\"/g, '"') : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: descMatch ? descMatch[1].replace(/\\"/g, '"') : "Read the full article on IHateCollege.com.",
        date: dateMatch ? dateMatch[1] : "2026-01-15",
        author: authorMatch ? authorMatch[1].trim() : "Staff Writer",
        tag: "Career Paths",
      });
    }

    // Sort newest first
    blogArticles.sort((a, b) => b.date.localeCompare(a.date));
  } catch (e) {
    console.error("Error reading blog directory:", e.message);
  }

  return {
    props: { blogArticles },
    revalidate: 60,
  };
}

export default function BlogIndex({ blogArticles = [] }) {
  const allArticles = [...blogArticles, ...ROOT_ARTICLES];

  return (
    <Layout>
      <SEO
        title="Blog – Anti-College Facts, Salary Data & Career Alternatives | IHateCollege.com"
        description="Data-driven articles on student debt, trade school salaries, certifications, and no-degree career paths. Updated daily."
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">UPDATED DAILY</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            The Anti-College Blog
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real data on student debt, trade salaries, certs, and paths that actually work.
            No fluff. No college-industry bias.
          </p>
        </div>

        <AdUnit slot="6600722153" />

        <div className="mt-10 space-y-6">
          {allArticles.map((article) => {
            const href = article.rootPage ? article.slug : `/blog/${article.slug}`;
            const tagColor = TAG_COLORS[article.tag] || "bg-slate-800 text-slate-300 border-slate-600";
            return (
              <Link key={article.slug} href={href} className="block group">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${tagColor}`}>
                      {article.tag}
                    </span>
                    <span className="text-xs text-slate-500">{article.date}</span>
                    <span className="text-xs text-slate-500">by {article.author}</span>
                  </div>
                  <h2 className="text-xl font-black text-white mb-2 group-hover:text-sky-400 transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {article.description}
                  </p>
                  <div className="mt-3 text-sky-400 text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">
                    Read article →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12">
          <AdUnit slot="6600722153" />
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-slate-900 border border-sky-500/30 text-center">
          <h3 className="text-xl font-black text-white mb-2">New articles published daily</h3>
          <p className="text-slate-400 text-sm mb-4">
            We publish 3 data-driven articles every morning. Bookmark this page or follow on X.
          </p>
          <a
            href="https://twitter.com/ihatecollege4u"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-400 transition-colors"
          >
            Follow @ihatecollege4u
          </a>
        </div>
      </div>
    </Layout>
  );
}
