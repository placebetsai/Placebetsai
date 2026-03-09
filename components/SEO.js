// components/SEO.js
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://ihatecollege.com";

function buildOgImage(title, description) {
  const params = new URLSearchParams({
    title: title.slice(0, 80),
    sub: description.slice(0, 120),
  });
  return `${SITE_URL}/api/og?${params.toString()}`;
}

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IHateCollege.com",
  "url": SITE_URL,
  "logo": `${SITE_URL}/icon.png`,
  "sameAs": [
    "https://twitter.com/ihatecollege4u",
    "https://www.tiktok.com/@_ihatecollege",
    "https://www.youtube.com/@IHateCollege79"
  ]
};

const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "IHateCollege.com",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/college-rankings?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function SEO({
  title = "IHateCollege.com — Skip Debt, Stack Cash",
  description = "College is optional. Debt isn't. Real alternatives to a 4-year degree: trades, tech certs, apprenticeships, and careers that pay without loans.",
  image = null,
  schema = null,
  type = "website",
  author = null,
  datePublished = null,
  keywords = null,
}) {
  const router = useRouter();
  const canonical = `${SITE_URL}${router.asPath.split("?")[0]}`;
  const ogImage = image || buildOgImage(title, description);
  const defaultKeywords = "i hate college, college, university, liberal campus, conservative campus, college is a scam, college alternatives, is college worth it, trade school vs college, no degree jobs, student debt, ihatecollege, college dropout, should i go to college, college debt, anti college, college not worth it, skip college, college regret, trade school, apprenticeship, certifications instead of college, college vs trade school, student loan crisis, no degree careers, jobs without college degree";

  return (
    <Head>
      {/* Impact.com verification */}
      <meta name="impact-site-verification" value="7a99b8bc-6d3b-4c9c-9f76-ce1301771cc1" />

      {/* Core */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />

      {/* Icons — SVG inline favicon is 0 bytes vs 832KB PNG */}
      <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='12' fill='%23ff2020'/%3E%3Ctext y='.85em' font-size='68' x='12'%3E%F0%9F%8E%93%3C/text%3E%3C/svg%3E" />
      <link rel="apple-touch-icon" href="/icon.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="IHateCollege.com" />
      <meta property="og:locale" content="en_US" />
      {author && <meta property="article:author" content={author} />}
      {datePublished && <meta property="article:published_time" content={datePublished} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ihatecollege4u" />
      <meta name="twitter:creator" content="@ihatecollege4u" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data — always include org + site */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }} />

      {/* Page-specific schema passed as prop */}
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </Head>
  );
}
