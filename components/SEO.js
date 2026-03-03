// components/SEO.js
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://ihatecollege.com";
const DEFAULT_IMAGE = `${SITE_URL}/social-card.png`;

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
  title = "IHateCollege.com — Skip Debt, Stack Cash 2025",
  description = "College is optional. Debt isn't. Real alternatives to a 4-year degree: trades, tech certs, apprenticeships, and careers that pay without loans.",
  image = DEFAULT_IMAGE,
  schema = null,
  type = "website",
  author = null,
  datePublished = null,
  keywords = null,
}) {
  const router = useRouter();
  const canonical = `${SITE_URL}${router.asPath.split("?")[0]}`;
  const defaultKeywords = "college alternatives, is college worth it, trade school vs college, no degree jobs, student debt, ihatecollege";

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

      {/* Icons */}
      <link rel="icon" href="/icon.png" />
      <link rel="apple-touch-icon" href="/icon.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
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
      <meta name="twitter:image" content={image} />

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
